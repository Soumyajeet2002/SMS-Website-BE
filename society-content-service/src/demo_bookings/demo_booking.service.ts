import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  DemoSlotBookingEntity,
  BookingStatus,
} from './entities/demo_booking.entities';

import { DemoSlotScheduleEntity } from '../demo_slot_schedule/entities/slot-schedule.entities';
import { GuestUserEntity } from '../guest_users/entities/guest-users.entities';
import { SlotScheduleStatus } from '../demo_slot_schedule/entities/slot-schedule.entities';

import { UpdateBookingDto } from './dto/update-booking.dto';

import { DEMO_SLOT_SCHEDULE } from '../common/messages/specific.msg';

@Injectable()
export class DemoSlotBookingService {
  private readonly logger = new Logger(DemoSlotBookingService.name);

  constructor(
    @InjectRepository(DemoSlotBookingEntity)
    private readonly bookingRepo: Repository<DemoSlotBookingEntity>,

    @InjectRepository(DemoSlotScheduleEntity)
    private readonly scheduleRepo: Repository<DemoSlotScheduleEntity>,

    @InjectRepository(GuestUserEntity)
    private readonly guestRepo: Repository<GuestUserEntity>,

    @InjectRepository(DemoSlotScheduleEntity)
    private readonly sqlRepo: Repository<DemoSlotScheduleEntity>,
  ) {}

  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, (...args: any[]) => Promise<unknown>> = {
      create: this._GetSlotDetails.bind(this),
      update: this._updateBooking.bind(this),
    };
    const method = methodMap[fn];

    if (!method) {
      throw new Error(`Invalid function: ${fn}`);
    }

    return method(...args);
  }

  async _GetSlotDetails(req?: any, demoBy?: string) {
    try {
      const userId = req?.user?.id;

      const qb = this.sqlRepo
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.slot', 'slot')
        .leftJoin(
          (qb) =>
            qb
              .select('u.id', 'id')
              .addSelect('u.name', 'name')
              .from('identity.users', 'u'),
          'usr',
          'usr.id = schedule.demoBy',
        )
        .addSelect('usr.name', 'demoByName');

      qb.addSelect((subQuery) => {
        return subQuery
          .select('1')
          .from('society_cms.demo_bookings', 'b')
          .where('b.schedule_id = schedule.schedule_id')
          .limit(1);
      }, 'is_booked');

      qb.where('schedule.status != :deleted', {
        deleted: SlotScheduleStatus.DELETED,
      });

      /** ✅ Optional: user-based filter */
      if (userId) {
        qb.andWhere('schedule.createdBy = :userId', {
          userId,
        });
      }

      /** ✅ Optional: filter by demoBy */
      if (demoBy) {
        qb.andWhere('schedule.demoBy = :demoBy', { demoBy });
      }

      /** ✅ Default sorting */
      qb.orderBy('schedule.createdAt', 'DESC');

      /** ✅ Fixed pagination */
      const page = 1;
      const limit = 10;

      qb.skip((page - 1) * limit).take(limit);

      const total = await qb.getCount();
      const { entities, raw } = await qb.getRawAndEntities();
      const data = entities.map((row: any, index: number) => {
        return {
          schedule_id: row.scheduleId,
          demoBy: row.demoBy,
          demoByname: raw[index]?.demoByName,
          slot_date: row.slotDate,
          slot_id: row.slot?.slotId,
          slot_name: row.slot?.slotName,
          demoBy_id: row.demoBy,
          start_time: row.slot?.startTime,
          end_time: row.slot?.endTime,
          // SlotStatus: row.slot?.status,
          schedule_status: row.status, // -> this is slot status (0,1,2)

          // ✅ Correct logic
          is_booked: raw[index]?.is_booked ? 1 : 0,
        };
      });

      return {
        message: DEMO_SLOT_SCHEDULE.SUCCESS.SCHEDULES_FETCHED,
        data: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
          data,
        },
      };
    } catch (error) {
      this.logger.error('Fetch Slot Schedules Failed', error);

      throw new InternalServerErrorException(
        DEMO_SLOT_SCHEDULE.ERRORS.FETCH_FAILED,
      );
    }
  }

  async _updateBooking(dto: UpdateBookingDto, req?: any) {
    try {
      const { guestId, scheduleId, bookingStatus, meetingLink, metadata } = dto;

      // 1️⃣ Validate required fields (ONLY guestId required)

      if (!guestId) {
        throw new BadRequestException('guestId is required');
      }

      // 2️⃣ Validate booking status

      if (
        bookingStatus !== undefined &&
        !Object.values(BookingStatus).includes(bookingStatus)
      ) {
        throw new BadRequestException('Invalid booking status');
      }

      let booking = await this.bookingRepo.findOne({
        where: { guestId },
        order: { createdAt: 'DESC' }, // safety if duplicates already exist
      });

      // 4️⃣ If not found → CREATE (only if scheduleId exists)
      if (!booking) {
        console.log('⚠️ Booking not found');

        // if (!scheduleId) {
        //   console.error('❌ scheduleId required for creating booking');
        //   throw new BadRequestException(
        //     'scheduleId is required to create booking',
        //   );
        // }
        // ✅ Only require scheduleId if status is NOT rejection

        if (!scheduleId && bookingStatus !== BookingStatus.REJECTED) {
          throw new BadRequestException(
            'scheduleId is required unless rejecting booking',
          );
        }

        console.log('🆕 Creating new booking...');

        const newBooking = this.bookingRepo.create({
          guestId,
          // scheduleId,
          scheduleId: scheduleId ?? undefined,
          bookingStatus,
          meetingLink,
          metadata,
          createdBy: req?.user?.userId ?? 'SYSTEM',
        });

        await this.bookingRepo.save(newBooking);

        console.log('✅ Booking created successfully');

        return {
          message: 'Booking created successfully',
          data: newBooking,
        };
      }

      Object.assign(booking, {
        // ✅ IMPORTANT FIX: allow setting scheduleId if it was null before
        ...(scheduleId && !booking.scheduleId && { scheduleId }),

        bookingStatus: bookingStatus ?? booking.bookingStatus,
        meetingLink: meetingLink ?? booking.meetingLink,
        metadata: metadata ?? booking.metadata,
        updatedBy: req?.user?.userId ?? 'SYSTEM',
      });

      await this.bookingRepo.save(booking);
      console.log('✅ Booking updated successfully');

      // 7️⃣ Check if schedule is booked (only if scheduleId exists)
      let is_booked = 0;

      if (scheduleId) {
        const isBookedExists = await this.bookingRepo.exist({
          where: { scheduleId },
        });
        is_booked = isBookedExists ? 1 : 0;
      }
      return {
        message: 'Booking updated successfully',
        data: {
          bookingId: booking.bookingId,
          guestId: booking.guestId,
          scheduleId: booking.scheduleId,
          bookingStatus: booking.bookingStatus,
          is_booked,
        },
      };
    } catch (error) {
      console.error('🔥 ERROR in _updateBooking:', error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        error.message || 'Failed to update booking',
      );
    }
  }
}
