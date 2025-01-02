import mongoose from "mongoose";
import { NextRequest } from "next/server";

import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";

const uriFromTitle = (title: string): string => {
  return title.toLowerCase().replace(/[^a-z0-9]/g, "-");
};

export const POST = async (req: NextRequest) => {
  await mongoose.connect(process.env.MONGODB_URL as string);

  const data = await req.json();
  const email = await session().get("email");
  data.uri = uriFromTitle(data.title);
  if (email) {
    const eventTypeDoc = await EventTypeModel.create({ email, ...data });

    return Response.json(eventTypeDoc);
  }
  return Response.json(false);
};

export const PUT = async (req: NextRequest) => {
  await mongoose.connect(process.env.MONGODB_URL as string);

  const data = await req.json();
  const email = await session().get("email");
  data.uri = uriFromTitle(data.title);
  const id = data.id;
  if (email && id) {
    const eventTypeDoc = await EventTypeModel.updateMany(
      { email, _id: id },
      data
    );

    return Response.json(eventTypeDoc);
  }
  return Response.json(false);
};

export const DELETE = async (req: NextRequest) => {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  await mongoose.connect(process.env.MONGODB_URL as string);

  await EventTypeModel.findByIdAndDelete(id);

  return Response.json(true);
};
