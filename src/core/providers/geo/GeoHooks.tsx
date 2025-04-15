import { useContext } from "react";
import { GeoContext } from "./GeoContext";

export const useGeo = () => {
  const ctx = useContext(GeoContext);
  return ctx;
};
