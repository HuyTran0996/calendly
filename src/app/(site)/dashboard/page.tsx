import mongoose from "mongoose";

import ProfileForm from "@/components/ProfileForm";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";

const DashboardPage = async () => {
  const email = await session().get("email");
  await mongoose.connect(process.env.MONGODB_URL as string);
  const profileDoc = await ProfileModel.findOne({ email });

  return (
    <div>
      <ProfileForm existingUsername={profileDoc?.username || ""} />
    </div>
  );
};

export default DashboardPage;
