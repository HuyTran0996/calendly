"use client";

import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import TimeSelect from "./TimeSelect";
import { BookingTimes, WeekdayName } from "@/libs/types";
import { IEventType } from "@/models/EventTypes";
import { Trash } from "lucide-react";
import EventTypeDelete from "./EventTypeDelete";

const weekdaysNames: WeekdayName[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const EventTypeForm = ({ doc }: { doc?: IEventType }) => {
  const [title, setTitle] = useState(doc?.title || "");
  const [description, setDescription] = useState(doc?.description || "");
  const [length, setLength] = useState(doc?.length || 30);
  const [bookingTimes, setBookingTimes] = useState<BookingTimes>(
    doc?.bookingTimes || {}
  );
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const id = doc?._id;
    const request = id ? axios.put : axios.post;
    const data = { title, description, length, bookingTimes };

    const response = await request("/api/event-types", { ...data, id });

    if (response.data) {
      router.push("/dashboard/event-types");
      router.refresh();
    }
  };

  const handleBookingTimeChange = (
    day: WeekdayName,
    v: string | boolean,
    prop: "from" | "to" | "active"
  ) => {
    setBookingTimes((oldBookingTimes) => {
      const newBookingTimes: BookingTimes = { ...oldBookingTimes };
      if (!newBookingTimes[day]) {
        newBookingTimes[day] = { from: "00:00", to: "00:00", active: false };
      }
      // @tyoe-ignore
      newBookingTimes[day][prop] = v;
      return newBookingTimes;
    });
  };
  return (
    <form className="p-2 bg-gray-200 rounded-lg" onSubmit={handleSubmit}>
      {doc && (
        <p className="my-2 text-sm">
          URL:http://localhost:3000/username/{doc.uri}
        </p>
      )}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>
            <span>title</span>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="">
            <span>description</span>
            <textarea
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            <span>event length (minutes)</span>
            <input
              type="number"
              placeholder="30"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
          </label>
        </div>
        <div>
          <span className="label">availability</span>

          <div className="grid gap-2">
            {weekdaysNames.map((day, index) => {
              const active = bookingTimes?.[day]?.active;
              return (
                <div
                  key={index}
                  className="grid grid-cols-2 gap-2 items-center"
                >
                  <label className="flex gap-1 !mb-0 !p-0">
                    <input
                      type="checkbox"
                      value={1}
                      checked={bookingTimes?.[day]?.active}
                      onChange={(e) =>
                        handleBookingTimeChange(day, e.target.checked, "active")
                      }
                    />
                    {day}
                  </label>

                  <div
                    className={clsx(
                      "inline-flex gap-2 items-center ml-2",
                      active ? "" : "opacity-40"
                    )}
                  >
                    <TimeSelect
                      value={bookingTimes?.[day]?.from || "00:00"}
                      onChange={(v) => handleBookingTimeChange(day, v, "from")}
                      step={30}
                    />
                    <span>-</span>
                    <TimeSelect
                      value={bookingTimes?.[day]?.to || "00:00"}
                      onChange={(v) => handleBookingTimeChange(day, v, "to")}
                      step={30}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="flex gap-4 justify-center">
        {doc && <EventTypeDelete id={doc._id as string} />}
        <button type="submit" className="btn-blue !px-8">
          Save
        </button>
      </div>
    </form>
  );
};

export default EventTypeForm;
