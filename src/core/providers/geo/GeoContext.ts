import { createContext } from "react";
import { GeoList } from "./GeoList";

export interface GeoState {
  country: string;
  emoji: string;
  language: string;
  price: number;
  currency: string;
  logo: string;
}

export const GeoContext = createContext<GeoState>(GeoList[0]);
