import React, { useEffect,useState } from "react";
import { IoIosSend } from "react-icons/io";
import {GetPlaceDetails} from '../../service/GlobalApi';
import { PHOTO_REF_URL } from "../../service/GlobalApi";


function InfoSection({ trip }) {

  const [photoUrl,setPhotoUrl] = useState(); 

  useEffect(() => {
    trip&&GetPlacePhoto();
  },[trip]);

  const GetPlacePhoto = async() => {
    const data = {
      textQuery:trip?.userSelection?.location?.label
    }
    const result = await GetPlaceDetails(data).then(res=>{
      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}",res.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
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
            <h2 className="p-1 px-3 bg-gray-500 rounded-full text-sm md:text-md">
              📅 {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-500 rounded-full text-sm md:text-md">
              💰 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-500 rounded-full text-sm md:text-md">
              👥 No. of Traveller: {trip?.userSelection?.traveler}
            </h2>
          </div>
        </div>
        <button><IoIosSend /></button>
      </div>
    </div>
  );
}

export default InfoSection;
