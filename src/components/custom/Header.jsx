import React, { useState,useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { googleLogout } from "@react-oauth/google";
import axios from "axios";
import { IoHomeOutline } from "react-icons/io5";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    console.log(user);
  }, []);
  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetUserProfile(codeResp);
    },

    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      {/* home icon */}
      <a href="/">
      <IoHomeOutline style={{ width: '40px', height: '40px', color: 'white'}} />
      </a>

      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href="/create-trip" >
            <button variant="outline" className="bg-neutral-900 border border-white rounded-none text-white px-3 py-2">
              + Create Trip
            </button>
            </a>
            <a href="/my-trips">
            <button variant="outline" className="bg-neutral-900 border border-white rounded-none text-white px-3 py-2">
              My Trips
            </button>
            </a>

            <Popover>
              <PopoverTrigger className="rounded-full bg-transparent">
                <img
                  src={user?.picture}
                  className="h-[40px] w-[40px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                    
                  }}
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <button className="bg-neutral-900 border border-white block rounded-none" onClick={()=>setOpenDialog(true)}>
            Sign In
          </button>
        )}
      </div>
      {/* dialog for google login */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
          <DialogDescription>
              <h2 className="font-bold text-black mt-7">Sign In With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center text-white"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Header;
