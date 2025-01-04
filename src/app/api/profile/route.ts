import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";

export const PUT = async (req: NextRequest) => {
  await mongoose.connect(process.env.MONGODB_URL as string);
  const body = await req.json();
  const { username } = body;
  const email = await session().get("email");
  if (email && username) {
    const profileDoc = await ProfileModel.findOneAndUpdate(
      { email },
      { username }
    );
    if (!profileDoc) {
      await ProfileModel.create({ email, username });
    }
    return Response.json(true);
  } else {
    return Response.json(false);
  }
};
