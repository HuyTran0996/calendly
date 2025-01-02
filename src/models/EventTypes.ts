import mongoose, { Model, model, models, Schema } from "mongoose";
import { BookingTimes, FromTo, WeekdayName } from "@/libs/types";

const FromToSchema = new Schema({
  from: String,
  to: String,
  active: Boolean,
});

export interface IEventType extends mongoose.Document {
  email: string;
  uri: string;
  title: string;
  description: string;
  length: number;
  bookingTimes: BookingTimes;
  createdAt: Date;
  updatedAt: Date;
}

const BookingSchema = new Schema<Record<WeekdayName, FromTo>>({
  monday: FromToSchema,
  tuesday: FromToSchema,
  wednesday: FromToSchema,
  thursday: FromToSchema,
  friday: FromToSchema,
  saturday: FromToSchema,
  sunday: FromToSchema,
});

const EventTypesSchema = new Schema<IEventType>(
  {
    email: String,
    uri: String,
    title: String,
    description: String,
    length: Number,
    bookingTimes: BookingSchema,
  },
  { timestamps: true }
);

export const EventTypeModel =
  (models?.EventType as Model<IEventType>) ||
  model<IEventType>("EventType", EventTypesSchema);
