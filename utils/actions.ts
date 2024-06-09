"use server";

import {
  sessionOptions,
  SessionData,
  defaultSession,
  UserJwtPayload,
} from "@/utils/lib";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { calculateTotalNutrition, weights } from "@/utils/totalNutrition";
import { jwtVerify } from "jose";
import { comparePasswords, hashPassword } from "./password";
import prisma from "@/prisma/prismaClient";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }

  return session;
};

export const getUser = async () => {
  const session = await getSession();
  const user = prisma.user.findUnique({
    where: {
      //@ts-ignore
      id: parseInt(session.id),
    },
  });

  return user;
};

export const goalSubmit = async (
  prevState: undefined | string,
  formData: FormData
) => {
  console.log(formData);
  const calories = formData.get("calories");
  const proteins = formData.get("proteins");
  const fats = formData.get("fats");
  const carbs = formData.get("carbs");
  const id = formData.get("id");

  if (!calories) {
    return { error: "Invalid calories!" };
  }

  if (!proteins) {
    return { error: "Invalid proteins!" };
  }

  if (!fats) {
    return { error: "Invalid fats!" };
  }

  if (!carbs) {
    return { error: "Invalid carbs!" };
  }

  if (!id) {
    return { error: "Invalid id!" };
  }

  const session = await getSession();
  if (!session || !session.id) {
    return { error: "Session not found" };
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(id as string) },
      data: {
        caloriesTarget: parseInt(calories as string),
        protein: parseInt(proteins as string),
        carbs: parseInt(carbs as string),
        fat: parseInt(fats as string),
        sugar: 0,
      },
      select: {
        id: true,
        email: true,
        username: true,
        caloriesTarget: true,
        protein: true,
        carbs: true,
        fat: true,
        sugar: true,
      },
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Error updating user" };
  }
};

export const login = async (
  prevState: undefined | string,
  formData: FormData
) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email) {
    return { error: "Input email!" };
  }

  if (!password) {
    return { error: "Input password!" };
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { error: "User with this email does not exist!" };
    }
    const isPasswordMatch = await comparePasswords(password, user.password);
    if (!isPasswordMatch) {
      return { error: "Incorrect password" };
    }
    const session = await getSession();
    session.id = String(user.id);
    session.username = user.email;
    session.isLoggedIn = true;
    session.token = jwt.sign({ username: user.email }, process.env.JWT_SECRET!);
    await session.save();
  } catch (error) {
    return { error: "Internal server error" };
  }
  redirect("/dashboard");
};

export const register = async (
  prevState: undefined | string,
  formData: FormData
) => {
  const username = formData.get("username") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const repeatPassword = formData.get("repeat-password") as string;
  const eula = formData.get("repeat-password") as string;

  if (!username) {
    return { error: "Input username!" };
  }
  if (!email) {
    return { error: "Input email!" };
  }
  if (!repeatPassword) {
    return { error: "Repeat password!" };
  }
  if (!password) {
    return { error: "Input password!" };
  }
  if (!eula) {
    return { error: "You need to accept terms of condition." };
  }
  if (password !== repeatPassword) {
    return { error: "Passwords are not the same." };
  }

  try {
    const hash = await hashPassword(password);

    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return { error: "Provided email is already used." };
    }

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hash,
      },
      select: {
        username: true,
        email: true,
      },
    });

    console.log(newUser);
  } catch (error) {
    return { error: "Internal server error" };
  }
  redirect("/login");
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
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );
    return verified.payload as UserJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired.");
  }
};
