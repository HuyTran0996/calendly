import DashboardNav from "@/components/DashboardNav";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import { Plus } from "lucide-react";

import mongoose from "mongoose";
import Link from "next/link";

const EventTypesPage = async () => {
  await mongoose.connect(process.env.MONGODB_URL as string);
  const email = await session().get("email");

  const eventTypes = await EventTypeModel.find({ email });
  return (
    <div>
      <DashboardNav />
      event type page
      {JSON.stringify(eventTypes)}
      <br />
      <Link className="btn-gray" href="/dashboard/event-types/new">
        <Plus size={16} />
        New event type
      </Link>
    </div>
  );
};

export default EventTypesPage;
