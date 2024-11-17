import React from 'react'
import { useEffect,useState } from "react";
import {GetPlaceDetails} from '../../service/GlobalApi';
import { PHOTO_REF_URL } from "../../service/GlobalApi";
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {
    const [photoUrl,setPhotoUrl] = useState(); 

    useEffect(() => {
      trip&&GetPlacePhoto();
    },[trip]);
  
    const GetPlacePhoto = async() => {
      const data = {
        textQuery:trip?.userSelection?.location?.label
      }
      const result = await GetPlaceDetails(data).then(res=>{
        console.log(res.data.places[0].photos[3].name);
        const PhotoUrl = PHOTO_REF_URL.replace("{NAME}",res.data.places[0].photos[3].name);
        setPhotoUrl(PhotoUrl);
      })
    }
    
  return (
    <Link to={`/view-trip/${trip.id}`} className='flex flex-col gap-2 '>
    <div className='hover:scale-105 transition-all hover:shadow-md'>
      <img src={photoUrl?photoUrl : "/placeholder.jpg"} className='object- rounded-xl h-[300px] w-[600px]' />
      <div>
  <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
  <h2 className="text-sm text-gray-400">
    {trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget,{" "}
    {trip?.userSelection?.traveler === "1" ? "Solo" : `with ${trip?.userSelection?.traveler}`}
  </h2>
</div>

    </div>
    </Link>
  )
}

export default UserTripCardItem
