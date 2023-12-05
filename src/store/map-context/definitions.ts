export type Quest = {
  location: Location;
  timestamp: string;
};

export type Markers = Record<string, Quest>;

export type SendData = {
  location: Location;
  label: string;
  timestamp: string;
};

type Location = {
  lat: number;
  lng: number;
};
