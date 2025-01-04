import mongoose from "mongoose";
import Link from "next/link";

import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventTypes";
import { ProfileModel } from "@/models/Profile";
import { Plus } from "lucide-react";

const EventTypesPage = async () => {
  await mongoose.connect(process.env.MONGODB_URL as string);
  const email = await session().get("email");
  const eventTypes = await EventTypeModel.find({ email });
  const profile = await ProfileModel.findOne({ email });
  return (
    <div>
      <div className="mt-4 border border-b-0 rounded-xl overflow-hidden mb-4">
        {eventTypes.map((e, index) => (
          <div key={index} className="block p-2 border-b">
            <Link href={"/dashboard/event-types/edit/" + e.id}>{e.title}</Link>
            <span className="text-gray-400 ml-4 text-sm">
              {process.env.NEXT_PUBLIC_URL}/{profile.username}/{e.uri}
            </span>
          </div>
        ))}
      </div>
      <Link className="btn-gray" href="/dashboard/event-types/new">
        <Plus size={16} />
        New event type
      </Link>
    </div>
  );
};

export default EventTypesPage;
