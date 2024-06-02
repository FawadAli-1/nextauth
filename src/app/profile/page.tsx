"use client"

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {

  const [data, setData] = useState<any>("")
  const router = useRouter()

  const getUserData = async()=> {
    try {
      const res = await axios.post("/api/users/profile")
      console.log(res.data.data);
      setData(res.data.data)
      
    } catch (error: any) {
      console.log(error.message);
      
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  const logout = async()=> {
    try {
      await axios.get("/api/users/logout")
      router.push("/")
    } catch (error) {
      console.log(error);
      
    }
    
  }
  

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-14">
        <h1 className="text-3xl font-bold text-slate-800">Your Profile</h1>
        <Table>
          <TableCaption>This will only show to you</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>User ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">{data.username}</TableCell>
              <TableCell>{data.email}</TableCell>
              <TableCell>{data.isVerified ? "True":"False"}</TableCell>
              <TableCell>{data._id}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button onClick={logout} variant={"destructive"}>Logout<LogOut className="ml-2 size-5"/></Button>
      </div>
    </section>
  );
};

export default ProfilePage;
