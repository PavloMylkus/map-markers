import axios from "axios";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { Markers, SendData } from "store/map-context/definitions";

export interface IMapContext {
  allMarkers: Markers;
  addMarker: (data: SendData) => void;
  removeAllMarkers: () => void;
}

const MapContext = createContext<IMapContext | undefined>(undefined);
const useMapContext = (): IMapContext => {
  const context = useContext(MapContext);

  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }

  return context;
};

type MapProviderProps = {
  children: React.ReactNode;
};

const MapProvider = ({ children }: MapProviderProps) => {
  const [allMarkers, setAllMarkers] = useState<Markers>({});

  const [provideData, setProvideData] = useState<SendData>();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_PUBLIC_FIREBASE_API}/api/markers`)
      .then((res) => setAllMarkers(res.data));
  }, []);

  const addMarker = (data: SendData) => {
    setProvideData(data);
  };

  const removeAllMarkers = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_PUBLIC_FIREBASE_API}/api/markers`
      );
      setAllMarkers({});
    } catch (error) {
      console.error("Error removing markers:", error);
    }
  };

  useEffect(() => {
    if (provideData) {
      axios
        .post(
          `${import.meta.env.VITE_PUBLIC_FIREBASE_API}/api/markers`,
          provideData
        )
        .then(() => {
          axios
            .get(`${import.meta.env.VITE_PUBLIC_FIREBASE_API}/api/markers`)
            .then((res) => setAllMarkers(res.data));
        });
    }
  }, [provideData]);

  const MapContextValue: IMapContext = useMemo(() => {
    return {
      allMarkers,
      addMarker,
      removeAllMarkers,
    };
  }, [allMarkers]);

  return (
    <MapContext.Provider value={MapContextValue}>
      {children}
    </MapContext.Provider>
  );
};

export { MapProvider, useMapContext };
