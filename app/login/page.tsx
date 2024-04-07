"use client";

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
        <CardContent className="flex flex-col gap-6 pb-16">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
          </div>
          <Button className="mt-6">Login</Button>
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
