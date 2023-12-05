import { CustomGoogleMap } from "components/Map/CustomGoogleMap";
import { MarkerInfo } from "components/Map/MarkersInfo";

export const Map: React.FC<{}> = () => {
  return (
    <div className="main-block-class">
      <CustomGoogleMap />
      <MarkerInfo />
    </div>
  );
};
