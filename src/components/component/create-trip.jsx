import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "./options";
import { toast } from "sonner";
import { chatSession } from "../../service/AIModel";
// shadcn for auth dialogue
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../service/firebaseConfig";
import { Firestore } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  // to maintain the state of the selected place
  const [place, setPlace] = useState(null);
  // to maintain the state of the form (location, noOfDays, budget, traveler)
  const [formData, setFormdata] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // handling the input change and setting the form data for the selected location, noOfDays, budget, traveler
  const handleInputChange = (name, value) => {
    setFormdata({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      GetUserProfile(codeResp);
    },

    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");

    if (!user) {
      setOpenDialog(true);

      return;
    }

    if (
      (formData?.noOfdays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all Details.");
      return;
    }
    setLoading(true);
    // ai prompt with the user selected location, noOfDays, budget, traveler
    const FINAL_PROMPT = AI_PROMPT
    // replace these with user given value
      .replace("{location}",formData?.location?.label)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{budget}", formData?.budget)
      .replace("{traveler}", formData?.traveler);
    const result = await chatSession.sendMessage(FINAL_PROMPT);

    setLoading(false);
    saveAiTrip(result?.response?.text());
  };

  const saveAiTrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AItrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

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
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        OnGenerateTrip();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Let us know your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-9">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is Destination of choice?
          </h2>

          {/* npm install react-google-places-autocomplete */}
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACES_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                // setting the location in the form data state on selection of the place
                handleInputChange("location", v);
              },
              styles: {
                control: (provided) => ({
                  ...provided,
                  backgroundColor: "#171717",
                  color: "white",
                }),
                input: (provided) => ({
                  ...provided,
                  color: "white",
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? "#333333" : "#171717",
                  color: "white",
                }),
                menu: (provided) => ({
                  ...provided,
                  backgroundColor: "#171717",
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: "white",
                }),
              },
            }}
          />

          {/* google places autocomplete ends  */}

        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex.3"}
            type="number"
            className="bg-neutral-900 text-white placeholder-gray-400 border border-gray-600"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid grid-cols-3 gap-5 mt-5 ">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`
                  p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${formData?.budget == item.title && "shadow-lg border-blue-500"}
                    `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do You plan on next Adventure?
          </h2>
          <div className="grid grid-cols-3 gap-5 mt-5 ">
            {SelectTravelesList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`
                  p-4 border rounded-lg hover:shadow-lg cursor-pointer
                    ${formData?.traveler == item.people && "shadow-lg border-blue-500"}
                    `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="my-10 justify-end flex">
        <button
          disabled={loading}
          onClick={OnGenerateTrip}
          className="bg-white border border-white block rounded-none text-black"
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate trip"
          )}
        </button>
      </div>
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

export default CreateTrip;
