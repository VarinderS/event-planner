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
    <div className="bg-gray-200">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-3xl py-20">
          <div className="md:flex md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                Events
              </h2>
            </div>
            <div className="mt-4 flex gap-4 md:ml-4 md:mt-0">
              <DatePicker onChange={setSelectedDate} />
              <button
                onClick={openDialog}
                className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
              >
                Add Event
              </button>
            </div>
          </div>
          <dialog
            ref={dialogRef}
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
          >
            <EventForm onAddEvent={handleAddEvent} onClose={closeDialog} />
          </dialog>
          <EventList events={recurringEvents} onDelete={handleDeleteEvent} />
        </div>
      </main>
    </div>
  );
}
