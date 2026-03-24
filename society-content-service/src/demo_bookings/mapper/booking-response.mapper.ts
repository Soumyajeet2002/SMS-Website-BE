// demo-slot-booking.mapper.ts

import {
  DemoSlotBookingEntity,
  BookingStatus,
} from '../entities/demo_booking.entities';

export class DemoSlotBookingMapper {
  /**
   * Entity → Response DTO
   */
  static toResponse(entity: DemoSlotBookingEntity) {
    return {
      bookingId: entity.bookingId,
      scheduleId: entity.scheduleId, // flat property
      guestId: entity.guestId, // flat property
      meetingLink: entity.meetingLink,
      status: entity.bookingStatus, // raw enum value
      bookingStatus: BookingStatus[entity.bookingStatus] ?? 'PENDING', // human-readable or numeric
      metadata: entity.metadata,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }

  /**
   * Entity[] → Response DTO[]
   */
  static toResponseList(entities: DemoSlotBookingEntity[]) {
    return entities.map((entity) => this.toResponse(entity));
  }

  /**
   * Custom Create Response (optional - matches your pattern)
   * Includes bookingStatus in response
   */
  static toCreateResponse(entities: DemoSlotBookingEntity[]) {
    return {
      bookings: entities.map((entity) => ({
        bookingId: entity.bookingId,
        scheduleId: entity.scheduleId,
        guestId: entity.guestId,
        meetingLink: entity.meetingLink,
        status: entity.bookingStatus,
        bookingStatus: BookingStatus[entity.bookingStatus] ?? 'PENDING', // updated here
        metadata: entity.metadata,
      })),
    };
  }
}
