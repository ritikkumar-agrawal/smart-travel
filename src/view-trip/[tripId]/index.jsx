import React, { useEffect , useState} from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { toast } from 'sonner';
import InfoSection from '../../components/component/InfoSection';
import Hotels from '../../components/component/Hotels';
import PlacesToVisit from '../../components/component/PlacesToVisit';
import Footer from '../../components/custom/Footer';

function Viewtrip() {
    const { tripId } = useParams();
    const [trips, setTrips] = useState(null);

    useEffect(() => {
        tripId&&GetTripData();
    }, [tripId]);

    const GetTripData = async () => {
        const docRef = doc(db,'AItrips', tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
          // it stores the data of the trip in the state
            setTrips(docSnap.data());
        }
        else{
            toast("No Trip found")
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
        <InfoSection trip={trips}/>

      {/* Recommended Hotels */}
        <Hotels trip={trips}/>
        <hr className='my-5'  />

      {/* Daily Plans */}
      <PlacesToVisit trip={trips}/>



    </div>
  )
}

export default Viewtrip
