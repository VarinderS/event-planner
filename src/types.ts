export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  recurrence?: string;
  icon?: string;
}

export interface EventFormData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  recurrence?: string;
}
