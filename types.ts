
export type Locale = 'bn' | 'en' | 'ar';
export type LocalizedString = Record<Locale, string>;

export interface Job {
  role: LocalizedString;
  company?: LocalizedString;
  destination: LocalizedString;
  quantity: number;
  salary: LocalizedString;
  imageUrl: string;
}

export interface StaffMember {
  name: LocalizedString;
  position: LocalizedString;
  positionEn: string; // Kept for compatibility if needed
  responsibility: LocalizedString;
  imgPlaceholder: string;
  imageUrl?: string;
}