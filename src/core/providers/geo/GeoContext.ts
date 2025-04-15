import { createContext } from "react";

export interface ContextProps {
  geoCode: string;
  price: number;
}

export const GeoContext = createContext<ContextProps>({
  geoCode: "kz",
  price: 4_500_000,
});
