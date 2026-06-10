export type Role = "superadmin" | "franchise" | "photographer";

export type FranchiseStatus = "active" | "inactive";
export type PhotographerStatus = "active" | "pending";
export type BookingStatus =
  | "pending"
  | "assigned"
  | "in_progress"
  | "completed"
  | "cancelled";

export type Specialization =
  | "Wedding"
  | "Birthday"
  | "Baby Shower"
  | "Corporate"
  | "Travel"
  | "Newborn"
  | "Maternity"
  | "Party"
  | "Bratabandha"
  | "Pasni";

export interface Franchise {
  id: string;
  name: string;
  location: string;
  address: string;
  contact: string;
  email: string;
  royaltyPercent: number;
  status: FranchiseStatus;
  createdAt: string;
}

export interface Photographer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  franchiseId: string;
  specializations: Specialization[];
  rating: number;
  completedJobs: number;
  responseRate: number;
  status: PhotographerStatus;
  portfolio: string[];
  avatarColor: string;
  joinedAt: string;
  qualityScore?: number;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  joinedAt: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  package: string;
  packageType: Specialization;
  location: string;
  eventDate: string;
  amount: number;
  franchiseId: string;
  photographerId?: string;
  status: BookingStatus;
  createdAt: string;
  notes?: string;
  acknowledged?: boolean;
}

export interface AuthSession {
  role: Role;
  name: string;
  email: string;
  entityId?: string;
}
