import { Event } from "@/types";

const generateRecurringDates = (event: Event, currentDate: Date): Event[] => {
  const occurrences: Event[] = [];
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const current = new Date(startDate.getTime());

  while (current <= endDate && occurrences.length < 5) {
    // Limit to 5 occurrences for demo
    if (current >= currentDate) {
      occurrences.push({
        ...event,
        startDate: current.toISOString(),
        endDate: current.toISOString(),
      });
    }

    switch (event.recurrence) {
      case "daily":
        current.setDate(current.getDate() + 1);
        break;
      case "weekly":
        current.setDate(current.getDate() + 7);
        break;
      case "monthly":
        current.setMonth(current.getMonth() + 1);
        break;
      case "annually":
        current.setFullYear(current.getFullYear() + 1);
        break;
      default:
        break;
    }
  }

  return occurrences;
};

export { generateRecurringDates };
