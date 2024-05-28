"use client";
import { useState } from "react";
import { DatePicker } from "@/components/DatePicker";
import { EventForm, EventFormData } from "@/components/EventForm";
import { EventList } from "@/components/EventList";

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);

  const handleAddEvent = (newEvent: EventFormData) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <main>
      <h1>Event planner</h1>
      <DatePicker onChange={(date) => console.log(date)} />
      <EventForm onAddEvent={handleAddEvent} />
      <EventList events={events} onDelete={handleDeleteEvent} />
    </main>
  );
}
