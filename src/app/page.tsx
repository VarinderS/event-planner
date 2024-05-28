"use client";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/DatePicker";
import { EventForm } from "@/components/EventForm";
import { EventList } from "@/components/EventList";
import { getMoonEvents } from "@/services/moonApi";
import { Event, EventFormData } from "@/types";
import { generateRecurringDates } from "@/helpers/";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchMoonEvents = async () => {
      const moonEvents = await getMoonEvents();
      setEvents([...moonEvents]);
    };

    fetchMoonEvents();
  }, []);

  const handleAddEvent = (newEvent: EventFormData) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const recurringEvents = events
    .filter((event) => {
      const isStartDateInFuture = new Date(event.startDate) >= selectedDate;
      const isEndDateInFuture = new Date(event.endDate) > selectedDate;
      return isStartDateInFuture || isEndDateInFuture;
    })
    .flatMap((event) => {
      if (event.recurrence && event.recurrence !== "none") {
        return generateRecurringDates(event, selectedDate);
      }
      return event;
    });

  return (
    <main>
      <h1>Event planner</h1>
      <DatePicker onChange={setSelectedDate} />
      <EventForm onAddEvent={handleAddEvent} />
      <EventList events={recurringEvents} onDelete={handleDeleteEvent} />
    </main>
  );
}
