"use client";
import { useState, useEffect } from "react";
import { DatePicker } from "@/components/DatePicker";
import { EventForm } from "@/components/EventForm";
import { EventList } from "@/components/EventList";
import { getMoonEvents } from "@/services/moonApi";
import { Event, EventFormData } from "@/types";

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchMoonEvents = async () => {
      const moonEvents = await getMoonEvents();
      setEvents((currentEvents) => [...currentEvents, ...moonEvents]);
    };

    fetchMoonEvents();
  }, []);

  const handleAddEvent = (newEvent: EventFormData) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  return (
    <main>
      <h1>Event planner</h1>
      <DatePicker onChange={setSelectedDate} />
      <EventForm onAddEvent={handleAddEvent} />
      <EventList events={events} onDelete={handleDeleteEvent} />
    </main>
  );
}
