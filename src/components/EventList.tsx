import React from "react";
import { CalendarIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { isEqual, format } from "date-fns";
import { Event } from "@/types";

interface EventListProps {
  events: Event[];
  onDelete: (id: number) => void;
}

const DATE_FORMAT = "do MMMM yyyy h:mm aaa";

const EventList: React.FC<EventListProps> = ({ events, onDelete }) => {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-y-4">
      {events.map((event, index) => {
        const isStartAndEndDateTheSame = isEqual(
          event.startDate,
          event.endDate
        );
        const formattedStartDate = format(event.startDate, DATE_FORMAT);
        const formattedEndDate = format(event.endDate, DATE_FORMAT);
        return (
          <li
            key={event.id + index}
            className={classNames(
              "relative flex items-center space-x-3 rounded-lg",
              "border border-gray-300 bg-white px-6 py-5",
              "shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2",
              "hover:border-gray-400"
            )}
          >
            <div className="flex-shrink-0 w-14">
              {event.icon ? (
                <div className="text-4xl">{event.icon}</div>
              ) : (
                <div className="w-12 h-12 border-gray-400 border rounded-full flex items-center justify-center">
                  <CalendarIcon className="size-6 text-black" />
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-lg">{event.title}</h4>
              <p className="truncate text-sm text-gray-500 mb-2">
                {isStartAndEndDateTheSame
                  ? formattedStartDate
                  : `${formattedStartDate} - ${formattedEndDate}`}
              </p>
              <p className="mb-2">{event.description}</p>
              <div>
                <button
                  className={classNames(
                    "rounded bg-indigo-50 px-2 py-1 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                  )}
                  onClick={() => onDelete(event.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export { EventList };
