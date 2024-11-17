import React, { useEffect, useState } from 'react'
import { useNavigation } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../service/firebaseConfig';
import UserTripCardItem from './UserTripCardItem';

function Mytrips() {

    const navigation = useNavigation();
    const [userTrips, setUserTrips] = useState([]);
    useEffect(() => {
        GetUserTrips();
    },[])
    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        
        if (!user) {
            navigation('/');
            return;
        }
     
        const q = query(collection(db,'AItrips'),where('userEmail','==',user?.email));
        const querySnapshot = await getDocs(q);
        setUserTrips([]);
        querySnapshot.forEach((doc) => {
            setUserTrips(prevVal=>[...prevVal,doc.data()]);
        });
    }
  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>My Trips ✈️</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 my-5'>
        {userTrips.map((trip,index)=>(
            <UserTripCardItem trip={trip}/>
            ))}
      </div>
    </div>
  )
}

export default Mytrips
