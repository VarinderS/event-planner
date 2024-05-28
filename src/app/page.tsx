"use client";
import { useState, useEffect, useRef } from "react";
import { DatePicker } from "@/components/DatePicker";
import { EventForm } from "@/components/EventForm";
import { EventList } from "@/components/EventList";
import { getMoonEvents } from "@/services/moonApi";
import { Event, EventFormData } from "@/types";
import { generateRecurringDates } from "@/helpers/";

export default function Home() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchMoonEvents = async () => {
      const moonEvents = await getMoonEvents();
      setEvents([...moonEvents]);
    };

    fetchMoonEvents();
  }, []);

  const openDialog = () => {
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleAddEvent = (newEvent: EventFormData) => {
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    closeDialog();
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
      <button onClick={openDialog}>Open Dialog</button>
      <dialog
        ref={dialogRef}
        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <EventForm onAddEvent={handleAddEvent} onClose={closeDialog} />
      </dialog>
      <EventList events={recurringEvents} onDelete={handleDeleteEvent} />
    </main>
  );
}
