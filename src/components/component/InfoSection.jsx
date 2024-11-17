import React, { useEffect,useState } from "react";
import { IoIosSend } from "react-icons/io";
import {GetPlaceDetails} from '../../service/GlobalApi';
import { PHOTO_REF_URL } from "../../service/GlobalApi";


function InfoSection({ trip }) {

  
  const [photoUrl,setPhotoUrl] = useState(); 
  
  useEffect(() => {
    trip&&GetPlacePhoto();
  },[trip]);
  
  const handleShare = () => {
    const currentURL = window.location.href; // Fetch the current page URL
    navigator.clipboard.writeText(currentURL) // Copy it to the clipboard
      .then(() => {
        alert("URL copied to clipboard!"); // Notify user
      })
      .catch((err) => {
        console.error("Failed to copy URL: ", err);
      });
  };
  const GetPlacePhoto = async() => {
    const data = {
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(res=>{
      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}",res.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
    // console.log("trip is : ", trip);
  }
  return (
    <div>
      <img
        src={photoUrl?photoUrl:"/placeholder.jpg"}
        className="h-[340px] w-full object-cover rounded-xl"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2 ">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-black-500 border border-white-1px text-sm md:text-md">
              📅 {trip?.userSelection?.noOfDays} {trip?.userSelection?.noOfDays > 1 ? "Days" : "Day"}
            </h2>
            <h2 className="p-1 px-3 bg-black-500 border border-white-1px text-sm md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-black-500 border border-white-1px text-sm md:text-md">
              🧑‍🤝‍🧑 No. of Traveller: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <button onClick={handleShare} className="border border-white" ><IoIosSend /></button>
      </div>
    </div>
  );
}

export default InfoSection;