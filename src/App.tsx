import { Map } from "components/Map";
import { MapProvider } from "store/map-context/MapContextProvider";

export const App = () => {
  return (
    <MapProvider>
      <Map />;
    </MapProvider>
  );
};
