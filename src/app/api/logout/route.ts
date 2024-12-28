import { session } from "@/libs/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const GET = async () => {
  await session().set("grantId", null);
  await session().set("email", null);
  await session().destroy();
  revalidatePath("/");
  redirect("/?logged-out=1");
};
