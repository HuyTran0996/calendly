import React, { ReactNode } from "react";
import mongoose from "mongoose";
import DashboardNav from "@/components/DashboardNav";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";

const DashboardLayout = async ({ children }: { children: ReactNode }) => {
  const email = await session().get("email");
  if (!email) {
    return "not logged in";
  }

  await mongoose.connect(process.env.MONGODB_URL as string);
  const profile = await ProfileModel.findOne({ email });
  return (
    <div>
      <DashboardNav username={profile?.username || ""} />
      {children}
    </div>
  );
};

export default DashboardLayout;
