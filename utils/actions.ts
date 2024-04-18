"use server";

import {sessionOptions, SessionData, defaultSession, UserJwtPayload} from "@/utils/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import {jwtVerify} from "jose";

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
  session.token = jwt.sign({ username: formUsername }, process.env.JWT_SECRET!);
  await session.save();
  redirect("/dashboard");
};

export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("login");
};

export const verifyAuth = async () => {
  try {
    const session = await getSession();
    const token = session.token as string;
    const verified = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
    console.log("VERIFY")
    console.log(verified);
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error('Your token has expired.');
  }
}

