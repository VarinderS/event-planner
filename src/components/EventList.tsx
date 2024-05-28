import classNames from "classnames";
import React from "react";
import { Event } from "@/types";

interface EventListProps {
  events: Event[];
  onDelete: (id: number) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-y-4">
      {events.map((event, index) => {
        const isStartAndEndDateTheSame = event.startDate === event.endDate;
        return (
          <li
            key={event.id + index}
            className={classNames(
              "relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
            )}
          >
            <div className="flex-shrink-0">
              {event.icon ? (
                <div className="text-4xl">{event.icon}</div>
              ) : (
                <p>No icon</p>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              <p>
                {event.startDate} - {event.endDate}
              </p>
              <button onClick={() => onDelete(event.id)}>Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export { EventList };
