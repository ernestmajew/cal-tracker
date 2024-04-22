"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/utils/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <>
      <form action={formAction} className="flex flex-col gap-4 pb-16">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" placeholder="Email" />
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
          />
        </div>
        {state?.error && <p className="text-red-500">{state.error}</p>}
        <Button type="submit" className="mt-6">
          Login
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
