import { useState } from "react";
import { EventFormData } from "@/types";
import classNames from "classnames";

interface EventFormProps {
  onAddEvent: (event: EventFormData) => void;
  onClose: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent, onClose }) => {
  const [event, setEvent] = useState<EventFormData>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    recurrence: "none",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddEvent(event);
    setEvent({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      recurrence: "none",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="sm:w-full sm:max-w-lg">
      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
        <h2
          className="text-xl font-semibold leading-9 text-gray-900"
          id="modal-title"
        >
          Add an event
        </h2>
        <div className="flex flex-col gap-y-2">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Title
            </label>
            <div className="mt-2">
              <input
                name="title"
                id="title"
                className={classNames(
                  "block w-full rounded-md border-0 py-1.5 px-3",
                  "text-gray-900",
                  "shadow-sm ring-1 ring-inset ring-gray-300",
                  "placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                  "sm:text-sm sm:leading-6"
                )}
                placeholder="Event title"
                value={event.title}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-2">
              <input
                name="description"
                id="description"
                className={classNames(
                  "block w-full rounded-md border-0 py-1.5 px-3",
                  "text-gray-900",
                  "shadow-sm ring-1 ring-inset ring-gray-300",
                  "placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                  "sm:text-sm sm:leading-6"
                )}
                placeholder="Event description"
                value={event.description}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Start Date:
            </label>
            <div className="mt-2">
              <input
                name="startDate"
                id="startDate"
                className={classNames(
                  "block w-full rounded-md border-0 py-1.5 px-3",
                  "text-gray-900",
                  "shadow-sm ring-1 ring-inset ring-gray-300",
                  "placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                  "sm:text-sm sm:leading-6"
                )}
                type="datetime-local"
                value={event.startDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              End Date:
            </label>
            <div className="mt-2">
              <input
                name="endDate"
                id="endDate"
                className={classNames(
                  "block w-full rounded-md border-0 py-1.5 px-3",
                  "text-gray-900",
                  "shadow-sm ring-1 ring-inset ring-gray-300",
                  "placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                  "sm:text-sm sm:leading-6"
                )}
                type="datetime-local"
                value={event.endDate}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="recurrence"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Recurrence:
            </label>
            <div className="mt-2">
              <select
                id="recurrence"
                name="recurrence"
                className={classNames(
                  "block w-full rounded-md border-0 py-1.5 px-3",
                  "text-gray-900",
                  "shadow-sm ring-1 ring-inset ring-gray-300",
                  "placeholder:text-gray-400",
                  "focus:ring-2 focus:ring-inset focus:ring-indigo-600",
                  "sm:text-sm sm:leading-6"
                )}
                value={event.recurrence}
                onChange={handleChange}
              >
                <option value="none">None</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 p-4 sm:flex sm:px-6 sm:gap-3">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
        >
          Add Event
        </button>
        <button
          type="button"
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export { EventForm };
