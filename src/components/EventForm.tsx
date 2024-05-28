import { useState } from "react";
import { EventFormData } from "@/types";

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
        <div className="flex flex-col">
          <input
            name="title"
            value={event.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            name="description"
            value={event.description}
            onChange={handleChange}
            placeholder="Description"
          />
          <label>
            <span>Start Date:</span>
            <input
              name="startDate"
              type="datetime-local"
              value={event.startDate}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>End Date:</span>
            <input
              name="endDate"
              type="datetime-local"
              value={event.endDate}
              onChange={handleChange}
            />
          </label>
          <select
            name="recurrence"
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
