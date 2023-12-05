import {
  GoogleMap,
  Libraries,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { useMapContext } from "store/map-context/MapContextProvider";

const libraries: Libraries = ["places"];

const mapContainerStyle = {
  width: "80vw",
  height: "94vh",
  borderRadius: "50px",
  margin: "20px",
};
const center = {
  lat: 49.842957,
  lng: 24.031111,
};

export const CustomGoogleMap: React.FC<{}> = () => {
  const [labelIndex, setLabelIndex] = useState<number>(0);

  const { allMarkers, addMarker } = useMapContext();

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    addMarker({
      location: {
        lat: event.latLng?.lat() || center.lat,
        lng: event.latLng?.lng() || center.lng,
      },
      timestamp: new Date().toISOString(),
      label: `${labelIndex}`,
    });
  };

  useEffect(() => {
    if (allMarkers) {
      const markersLength = allMarkers ? Object.keys(allMarkers).length : 0;
      setLabelIndex(markersLength + 1);
    }
  }, [allMarkers]);

  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={10}
        center={center}
        onClick={handleMapClick}
      >
        {allMarkers ? (
          Object.keys(allMarkers)?.map((marker, index) => (
            <Marker
              key={index}
              position={{
                lat: allMarkers[marker].location.lat,
                lng: allMarkers[marker].location.lng,
              }}
              label={marker.match(/\d+$/)?.[0]}
            />
          ))
        ) : (
          <Marker position={center} />
        )}
      </GoogleMap>
    </LoadScript>
  );
};
