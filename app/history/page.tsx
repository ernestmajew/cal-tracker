import { getSession } from "@/utils/actions";
import { redirect } from "next/navigation";

export default async function HistoryPage() {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/");
  }

  return <p>History works!</p>;
}
