import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { isUUID } from 'class-validator';

import {
  DemoSlotBookingEntity,
  BookingStatus,
} from './entities/demo_booking.entities';

import { DemoSlotScheduleEntity } from '../demo_slot_schedule/entities/slot-schedule.entities';
import { GuestUserEntity } from '../guest_users/entities/guest-users.entities';

import { CreateSlotBookingDto } from './dto/create-booking.dto';
// import { UpdateSlotBookingDto } from './dto/update-booking.dto';
import { SlotScheduleStatus } from '../demo_slot_schedule/entities/slot-schedule.entities';
import { BookingStatusGuest } from '../guest_users/entities/guest-users.entities';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { GuestUsersService } from '../guest_users/guest-users.service';

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

    private guestUsersService: GuestUsersService,
  ) {}

  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, (...args: any[]) => Promise<unknown>> = {
      // create: this._createBooking.bind(this),
      //   findAll: this._findAllBookings.bind(this),
      //   findOne: this._findOneBooking.bind(this),
      update: this._updateBooking.bind(this),
      //   remove: this._removeBooking.bind(this),
    };

    const method = methodMap[fn];

    if (!method) {
      throw new Error(`Invalid function: ${fn}`);
    }

    return method(...args);
  }

  // async _updateBooking(dto: any, req?: any) {
  //   try {
  //     const {
  //       guestId,
  //       demoBy,
  //       slotDate,
  //       slotId,
  //       bookingStatus,
  //       meetingLink,
  //       metadata,
  //     } = dto;

  //     // 1️⃣ Validate required fields
  //     if (!guestId || !demoBy || !slotDate || !slotId) {
  //       throw new BadRequestException(
  //         'guestId, demoBy, slotDate, and slotId are required',
  //       );
  //     }

  //     // 2️⃣ Find schedule by slotId + slotDate + demoBy
  //     const schedule = await this.scheduleRepo
  //       .createQueryBuilder('s')
  //       .leftJoin('s.slot', 'slot')
  //       .where('s.demoBy = :demoBy', { demoBy })
  //       .andWhere('s.slotDate = :slotDate', { slotDate })
  //       .andWhere('slot.slotId = :slotId', { slotId })
  //       .andWhere('s.status = :status', { status: 1 }) // ACTIVE status
  //       .getOne();

  //     if (!schedule) {
  //       throw new NotFoundException(`Schedule not found for slotId: ${slotId}`);
  //     }

  //     // 3️⃣ Find booking using guestId + scheduleId
  //     let booking = await this.bookingRepo.findOne({
  //       where: {
  //         guestId: guestId,
  //         // scheduleId: schedule.scheduleId,
  //       },
  //     });

  //     // 4️⃣ If booking does not exist, create it (upsert behavior)
  //     if (!booking) {
  //       booking = await this.bookingRepo.save({
  //         guestId,
  //         scheduleId: schedule.scheduleId,
  //         bookingStatus: bookingStatus ?? BookingStatus.BOOKED,
  //         meetingLink: meetingLink ?? null,
  //         metadata: metadata ?? null,
  //         createdBy: req?.user?.userId ?? 'SYSTEM',
  //         createdAt: new Date(),
  //       });
  //     } else {
  //       // 5️⃣ Update booking fields if it exists
  //       await this.bookingRepo.update(
  //         { bookingId: booking.bookingId },
  //         {
  //           bookingStatus: bookingStatus ?? booking.bookingStatus,
  //           meetingLink: meetingLink ?? booking.meetingLink,
  //           metadata: metadata ?? booking.metadata,
  //           updatedBy: req?.user?.userId ?? 'SYSTEM',
  //           updatedAt: new Date(),
  //         },
  //       );
  //     }
  //     const response = {
  //       message: 'Booking processed successfully',
  //       data: {
  //         guestId,
  //         scheduleId: schedule.scheduleId,
  //         bookingStatus: bookingStatus ?? booking.bookingStatus,
  //       },
  //     };
  //     console.log(JSON.stringify(response, null, 2));

  //     return {
  //       message: 'Booking processed successfully',
  //       data: {
  //         guestId,
  //         scheduleId: schedule.scheduleId,
  //         bookingStatus: bookingStatus ?? booking.bookingStatus,
  //       },
  //     };
  //   } catch (error) {
  //     console.error('❌ ERROR:', error);

  //     if (error instanceof HttpException) throw error;

  //     throw new InternalServerErrorException(
  //       error.message || 'Failed to update booking',
  //     );
  //   }
  // }

  async _updateBooking(dto: any, req?: any) {
    try {
      const {
        guestId, // mandatory
        demoBy, //optional (status=2)
        slotDate, //optionl (status=2)
        slotId, //  optional(status=2)
        bookingStatus, //mandatory
        meetingLink, //optional
        metadata, //optional
      } = dto;

      // 1️⃣ Validate required fields
      // if (!guestId || !demoBy || !slotDate || !slotId) {
      //   throw new BadRequestException(
      //     'guestId, demoBy, slotDate, and slotId are required',
      //   );
      // }

      // 2️⃣ Validate bookingStatus (supports all enum values)
      const validStatuses = Object.values(BookingStatus);
      if (
        bookingStatus !== undefined &&
        !validStatuses.includes(bookingStatus)
      ) {
        throw new BadRequestException('Invalid booking status');
      }
      console.log('bookingStatus', bookingStatus);
      if (bookingStatus !== 3) {
        // 3️⃣ Find schedule
        const schedule = await this.scheduleRepo
          .createQueryBuilder('s')
          .leftJoin('s.slot', 'slot')
          .where('s.demoBy = :demoBy', { demoBy })
          .andWhere('s.slotDate = :slotDate', { slotDate })
          .andWhere('slot.slotId = :slotId', { slotId })
          .andWhere('s.status = :status', { status: 1 })
          .getOne();

        if (!schedule) {
          throw new NotFoundException(
            `Schedule not found for slotId: ${slotId}`,
          );
        }

        // 4️⃣ Find latest booking using guestId only
        let booking = await this.bookingRepo.findOne({
          where: { guestId },
          order: { createdAt: 'DESC' }, // ✅ IMPORTANT
        });

        // 5️⃣ Create if not exists
        // if (!booking) {
        //   booking = await this.bookingRepo.save({
        //     guestId,
        //     scheduleId: schedule.scheduleId,
        //     bookingStatus: bookingStatus ?? BookingStatus.BOOKED,
        //     meetingLink: meetingLink ?? null,
        //     metadata: metadata ?? null,
        //     createdBy: req?.user?.userId ?? 'SYSTEM',
        //     createdAt: new Date(),
        //   });
        // } else {
        //   // 6️⃣ Update existing booking
        //   await this.bookingRepo.update(
        //     { bookingId: booking.bookingId },
        //     {
        //       scheduleId: schedule.scheduleId,
        //       bookingStatus: bookingStatus ?? booking.bookingStatus,
        //       meetingLink: meetingLink ?? booking.meetingLink,
        //       metadata: metadata ?? booking.metadata,
        //       updatedBy: req?.user?.userId ?? 'SYSTEM',
        //       updatedAt: new Date(),
        //     },
        //   );
        // }
      } else {
        //updateGuestUserDto.updatedBy = req?.user?.userId ?? 'SYSTEM';

        this.guestUsersService.executeByActionType('update', guestId, {
          status: bookingStatus,
          updatedBy: req?.user?.userId, // optional
        });
      }

      // const response = {
      //   message: 'Booking processed successfully',
      //   data: {
      //     guestId,
      //     scheduleId: schedule.scheduleId,
      //     bookingStatus: bookingStatus ?? booking.bookingStatus,
      //   },
      // };

      // console.log(JSON.stringify(response, null, 2));
      // return response;
    } catch (error) {
      console.error('❌ ERROR:', error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException(
        error.message || 'Failed to update booking',
      );
    }
  }
}
