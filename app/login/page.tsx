import { CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import LoginForm from "./components/loginForm";

export default function LoginPage() {
  return (
    <div className="w-screen h-screen flex md:grid md:grid-cols-2">
      <div className="flex flex-center align-center justify-center my-auto mx-auto flex-col">
        <CardHeader className="pb-12 gap-4 w-[450px] flex flex-row items-center justify-center">
          <span className="text-6xl font-bold ">Welcome back!</span>
          <img
            src="logo.png"
            alt="logo"
            className="h-16 mx-auto object-contain "
          />
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <div className="flex flex-col justify-center align-center w-fit mx-auto">
          <Separator className="mx-auto mb-16"></Separator>
          <span className="mx-auto">
            You don't have an account?{" "}
            <Link href="/register" className="text-primary">
              Register
            </Link>
          </span>
        </div>
      </div>
      <div className="hidden md:flex bg-green-100">
        <img src="avocado.jpg" className="object-cover h-full"></img>
      </div>
    </div>
  );
}
