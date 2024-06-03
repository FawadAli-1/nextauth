"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupFormSchema } from "@/schema/user.schema";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function SignupPage() {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter()
  const { toast } = useToast();
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(false)

  const onSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    console.log(values);
    try {

      setLoading(true)
      const response = await axios.post("/api/users/signup", values);
      console.log(response.status)
      toast({
        title: "Signing up user",
        description: "Please wait for a few seconds"
      })
      form.reset();
      router.push("/verifyemail")
    } catch (error) {
      setLoading(false)
      setErrorMessage(true)
      toast({
        title: "Sign up failed...",
        variant: "destructive"
      })
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center h-screen bg-slate-200">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>
            Fill all the details to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a username..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter a password..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading}>{loading? (
                <>
                <Loader2 className="animate-spin mr-1"/>
                <p>Submitting</p>
                </>
              ):"Sign up"}</Button>
              {errorMessage ? <p className="text-red-600">Error signing up, please retry...</p> : ""}
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
