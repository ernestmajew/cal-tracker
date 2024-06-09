import LogoutForm from "@/components/logoutForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import GoalSettingsForm from "./components/GoalSettingsForm";
import { getSession, getUser } from "@/utils/actions";

export default async function UserPage() {
  const session = await getSession();
  const user = await getUser();
  const initialValues = {
    caloriesTarget: user?.caloriesTarget || 0,
    proteins: user?.protein || 0,
    carbs: user?.carbs || 0,
    fats: user?.fat || 0,
  };

  return (
    <>
      <div className="flex justify-between items-center h-32">
        <h1 className="font-bold text-3xl">User settings</h1>
      </div>
      <div className="flex mx-auto mx-auto">
        <Card className="w-96">
          <CardHeader className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">{user?.username || "User"}</h1>
          </CardHeader>
          <CardContent className="flex flex-col gap-8">
            <GoalSettingsForm
              id={session.id as any as number}
              initialValues={initialValues}
            />
            <div className="flex flex-col gap-4">
              <h1 className="font-semibold">Actions</h1>
              <LogoutForm />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
