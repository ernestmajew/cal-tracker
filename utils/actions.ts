"use server";

import { sessionOptions, SessionData, defaultSession } from "@/utils/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const login = async (
  prevState: undefined | string,
  formData: FormData
) => {
  const session = await getSession();
  const formUsername = formData.get("email") as string;
  const formPassword = formData.get("password") as string;

  console.log(formUsername);

  if (formUsername !== "admin@caltracker.com") {
    return { error: "Wrong Credentials!" };
  }

  session.id = "1";
  session.username = "admin@caltracker.com";
  session.isLoggedIn = true;
  await session.save();
  redirect("/dashboard");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("login");
};
