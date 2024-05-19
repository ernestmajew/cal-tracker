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
import RegisterForm from "./components/registerForm";

export default function RegisterPage() {
  return (
    <div className="w-screen h-screen flex md:grid md:grid-cols-2">
      <div className="flex flex-center align-center justify-center my-auto mx-auto flex-col">
        <CardHeader className="pb-12 gap-4 w-[450px] flex">
          <div className="flex flex-row items-center justify-center pb-4">
            <span className="text-6xl font-bold ">Hello stranger!</span>
            <img
              src="logo.png"
              alt="logo"
              className="h-16 mx-auto object-contain "
            />
          </div>
          <span className="text-3xl text-stone-800">
            Wanna make Your life healthier?
          </span>
        </CardHeader>
        <CardContent>
          <RegisterForm></RegisterForm>
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
