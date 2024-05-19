"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login, register } from "@/utils/actions";
import { useFormState } from "react-dom";

const RegisterForm = () => {
  const [state, formAction] = useFormState<any, FormData>(register, undefined);

  return (
    <form className="flex flex-col gap-4 pb-16" action={formAction}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="username">Email</Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Username"
        />
      </div>
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
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="repeat-password">Repeat password</Label>
        <Input
          name="repeat-password"
          type="password"
          id="repeat-password"
          placeholder="Repeat password"
        />
      </div>
      <div className="flex text-sm gap-4 my-2">
        <Checkbox id="#eula">Agree to terms and conditions</Checkbox>
        <label htmlFor="eula">I agree to terms of conditions</label>
      </div>
      {state?.error && <p className="text-red-500">{state.error}</p>}
      <Button>Register</Button>
    </form>
  );
};

export default RegisterForm;
