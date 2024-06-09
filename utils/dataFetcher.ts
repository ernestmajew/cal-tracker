import { getSession, getUser } from "@/utils/actions";

export const fetchUserData = async () => {
  const user = await getUser();
  return user;
};

export const fetchTotalNutrientsData = async (selectedDay: Date) => {
  const response = await fetch(
    `/api/nutrients?date=${encodeURIComponent(selectedDay.toISOString())}`
  );
  const data = await response.json();
  return data;
};

export const fetchSessionData = async () => {
  const session = await getSession();
  return session;
};
