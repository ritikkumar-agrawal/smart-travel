import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div className="grid grid-cols-2 gap-5">
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div className="mt-2">
            <h2 className="font-medium text-lg">Day {item.day}</h2>
            {item.plan.map((place, index) => (
                <div className="my-3">
                    <h2 className="font-medium text-sm text-orange-300">{place.time}</h2>
                    <PlaceCardItem place={place} />
                </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
