import { useMapContext } from "store/map-context/MapContextProvider";

export const MarkerInfo: React.FC<{}> = () => {
  const { allMarkers, removeAllMarkers } = useMapContext();
  return (
    <div>
      <h2>All Markers from Firebase</h2>
      <button onClick={removeAllMarkers}>Clear map</button>
      {allMarkers &&
        Object.keys(allMarkers)?.map((marker, index) => (
          <div key={marker}>
            <p>{marker}:</p>
            <ul>
              <li>lat: {allMarkers[marker].location.lat}</li>
              <li>lng: {allMarkers[marker].location.lng}</li>
              <li>timestamp: {allMarkers[marker].timestamp}</li>
            </ul>
          </div>
        ))}
    </div>
  );
};
