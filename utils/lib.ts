import {getIronSession, SessionOptions} from "iron-session";
import {jwtVerify} from "jose";
import {cookies} from "next/headers";
import {getSession} from "@/utils/actions";

export interface SessionData {
  id?: string;
  username?: string;
  isLoggedIn: boolean;
  token?: string;
}

export interface UserJwtPayload {
  jti: string;
  iat: number;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET!,
  cookieName: "cal-tracker-session",
  cookieOptions: {
    httpOnly: true,
    secure: false,
  },
};

export const defaultSession: SessionData = {
  isLoggedIn: false,
};


