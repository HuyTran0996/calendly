import EventTypeForm from "@/components/EventTypeForm";
import { EventTypeModel } from "@/models/EventTypes";
import mongoose from "mongoose";

type PageProps = {
  params: { id: string };
};

const EditEventTypePage = async ({ params }: PageProps) => {
  const id = params.id;
  await mongoose.connect(process.env.MONGODB_URL as string);
  const eventTypeDoc = await EventTypeModel.findById(id);
  if (!eventTypeDoc) {
    return "404";
  }
  return <EventTypeForm doc={JSON.parse(JSON.stringify(eventTypeDoc))} />;
};

export default EditEventTypePage;
