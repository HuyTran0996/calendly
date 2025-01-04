import mongoose from "mongoose";
import EventTypeForm from "@/components/EventTypeForm";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import { session } from "@/libs/session";

type PageProps = {
  params: { id: string };
};

const EditEventTypePage = async ({ params }: PageProps) => {
  const email = await session().get("email");
  await mongoose.connect(process.env.MONGODB_URL as string);
  const eventTypeDoc = await EventTypeModel.findById(params.id);
  const profile = await ProfileModel.findOne({ email });

  if (!eventTypeDoc) {
    return "404";
  }
  return (
    <EventTypeForm
      username={profile.username || ""}
      doc={JSON.parse(JSON.stringify(eventTypeDoc))}
    />
  );
};

export default EditEventTypePage;
