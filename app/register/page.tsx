import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-screen h-screen flex md:grid md:grid-cols-2">
      <div className="flex flex-center align-center justify-center my-auto mx-auto flex-col">
        <CardHeader className="pb-12 gap-4 text-center  w-[450px]">
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            You are a couple of clicks away from making Your life healthier
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pb-16">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="repeat-password">Repeat password</Label>
            <Input
              type="password"
              id="repeat-password"
              placeholder="Repeat password"
            />
          </div>
          <div className="flex text-sm gap-4 my-2">
            <Checkbox id="#eula">Agree to terms and conditions</Checkbox>
            <label htmlFor="eula">I agree to terms of conditions</label>
          </div>
          <Button>Register</Button>
        </CardContent>
        <div className="flex flex-col justify-center align-center w-fit mx-auto">
          <Separator className="mx-auto mb-16"></Separator>
          <span className="mx-auto">
            Already have an account?{" "}
            <Link href="login" className="text-primary">
              Login
            </Link>
          </span>
        </div>
      </div>
      <div className="bg-green-100">
        <img src="avocado.jpg" className="object-cover h-full"></img>
      </div>
    </div>
  );
}
