import { NextApiRequest } from "next";

import { nylas, nylasConfig } from "@/libs/nylas";
import { session } from "@/libs/session";
import { redirect } from "next/navigation";

export const GET = async (req: NextApiRequest) => {
  console.log("Received callback from Nylas");
  const url = new URL(req.url as string);
  const code = url.searchParams.get("code");

  if (!code) {
    return Response.json("No authorization code returned from Nylas", {
      status: 400,
    });
  }

  const response = await nylas.auth.exchangeCodeForToken({
    clientSecret: nylasConfig.apiKey,
    clientId: nylasConfig.clientId as string,
    redirectUri: nylasConfig.callbackUri,
    code,
  });
  const { grantId, email } = response;

  console.log(response.grantId);

  await session().set("grantId", grantId);
  await session().set("email", email);

  redirect("/");
};
