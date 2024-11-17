import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect,useState } from "react";
import {GetPlaceDetails} from '../../service/GlobalApi';
import { PHOTO_REF_URL } from "../../service/GlobalApi";


function PlaceCardItem({place}) {

    const [photoUrl,setPhotoUrl] = useState(); 

  useEffect(() => {
    place&&GetPlacePhoto();
  },[place]);

  const GetPlacePhoto = async() => {
    const data = {
      textQuery:place.placeName
    }
    const result = await GetPlaceDetails(data).then(res=>{
      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}",res.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
    
  }
  return (
    <Link to={"https://www.google.com/maps/search/?api=1&query=" +
        place.placeName} target="_blank" className='text-current'>
    <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
      <img src={photoUrl?photoUrl:"/placeholder.jpg"} className="w-[130px] h-[130px] rounded-xl"/>
      <div>
        <h2 className='font-bold text-lg'>{place.placeName}</h2>
        <p className='text-sm text-gray-400'>{place.placeDetails}</p>
        <h2 className='mt-2'>💵 {place.ticketPricing}</h2>
      </div>
    </div>
    </Link>
  )
}

export default PlaceCardItem
