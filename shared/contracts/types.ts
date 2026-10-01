export type UUID = string;

export type EventFormat =
  | 'SOCIAL'
  | 'SINGLES'
  | 'TABLE'
  | 'SUNDAYS'
  | 'AFTER_DARK';

export type EventStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'LIVE'
  | 'ENDED'
  | 'CANCELLED';

export type TicketStatus =
  | 'AVAILABLE'
  | 'HELD'
  | 'BOOKED'
  | 'CHECKED_IN'
  | 'CANCELLED'
  | 'REFUNDED'
  | 'NO_SHOW';

export type EventRole =
  | 'EVENT_LEAD'
  | 'MARSHAL'
  | 'VOLUNTEER'
  | 'HOST';

export type EntitlementType =
  | 'MONTHLY_EVENT'
  | 'DRINK_TOKEN'
  | 'PRIORITY_BOOKING'
  | 'MEMBER_PRICING'
  | 'INVITE_ONLY_ACCESS'
  | 'EVENT_CREDIT';

export interface MehfilCard {
  userId: UUID;
  firstName: string;
  age?: number;
  cityId?: UUID;
  cityName?: string;
  gender?: string;
  shortLine?: string;
  interests: string[];
  photos: Array<{
    id?: UUID;
    url: string;
    sortOrder: number;
  }>;
}

export interface EventSummary {
  id: UUID;
  title: string;
  format: EventFormat;
  city: { id: UUID; name: string };
  venue?: { id: UUID; name: string; address?: string };
  startsAt: string;
  endsAt: string;
  capacity: number;
  status: EventStatus;
  heroImageUrl?: string;
  ticketFromMinor?: number;
  currency: 'INR';
  badges?: string[];
}

export interface Ticket {
  id: UUID;
  eventId: UUID;
  ticketTypeId: UUID;
  status: TicketStatus;
  includesDrinkToken: boolean;
}

export interface LiveState {
  eventId: UUID;
  liveSessionId?: UUID;
  status: 'CLOSED' | 'OPEN' | 'PAUSED' | 'ENDED';
  access?: 'NONE' | 'ACTIVE' | 'SUSPENDED' | 'REMOVED' | 'EXPIRED';
  joinedAt?: string;
}

export interface LiveQr {
  token: string;
  expiresAt: string;
}

export interface ConnectionPreview {
  requestId: UUID;
  eventId: UUID;
  card: MehfilCard;
}

export interface Connection {
  id: UUID;
  eventId: UUID;
  otherUser: MehfilCard;
  createdAt: string;
}

export interface MembershipSummary {
  status: 'NONE' | 'ACTIVE' | 'CANCEL_AT_PERIOD_END' | 'CANCELLED' | 'EXPIRED';
  currentPeriodEnd?: string;
  monthlyPriceMinor: 89900;
  currency: 'INR';
}

export interface OpsEventSnapshot {
  event: EventSummary;
  ticketsSold: number;
  checkedIn: number;
  liveActive: number;
  openSafety: number;
  assignedStaff: number;
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    requestId?: string;
    details?: unknown;
  };
}
