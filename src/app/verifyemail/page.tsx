"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { BadgeCheck, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);

  const verifyUser = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      router.push("/login")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  return (
    <section className="flex items-center justify-center h-screen bg-slate-100">
      <div className="flex justify-center items-center flex-col gap-4">
        <h1 className="font-bold text-3xl">Email Verification</h1>
        <p className="text-lg font-medium text-slate-800">
          Open the link in your email to verify your account
        </p>
        <Button onClick={verifyUser} disabled={verified}>
          Click Here to Verify
          <BadgeCheck className="ml-1 fill-green-500 stroke-black" />
        </Button>
        {verified ? (
          <>
            <p>
              Your token is: <span className="font-medium text-lg">{token}</span>
            </p>
            <div className="flex items-center text-lg font-bold">
              <p>You Are Verified </p>
              <BadgeCheck className="ml-2 fill-green-500 stroke-black size-8" />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default VerifyEmailPage;
