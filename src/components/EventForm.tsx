import { useState } from "react";
import { EventFormData } from "@/types";

interface EventFormProps {
  onAddEvent: (event: EventFormData) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent }) => {
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
    <div>
      <h4>Event Form</h4>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "200px",
        }}
      >
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
        <button type="submit">Add Event</button>
      </form>
    </div>
  );
};

export { EventForm };
