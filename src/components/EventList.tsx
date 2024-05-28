import React from "react";

interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
}

interface EventListProps {
  events: Event[];
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  return (
    <ul style={{ listStyleType: "none", padding: 0 }}>
      {events.map((event, index) => (
        <li key={event.id + index} style={{ margin: "10px 0" }}>
          <h4>{event.title}</h4>
          <p>{event.description}</p>
          <p>
            {event.startDate} - {event.endDate}
          </p>
          <button onClick={() => onDelete(event.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export { EventList };
