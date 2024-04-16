import { SessionOptions } from "iron-session";

export interface SessionData {
  id?: string;
  username?: string;
  isLoggedIn: boolean;
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
