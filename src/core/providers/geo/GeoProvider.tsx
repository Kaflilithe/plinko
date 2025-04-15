import { FC, PropsWithChildren } from "react";
import { GeoState, GeoContext } from "./GeoContext";

interface Props {
  geo: GeoState;
}

export const GeoProvider: FC<PropsWithChildren<Props>> = ({
  geo,
  children,
}) => {
  return <GeoContext value={geo}>{children}</GeoContext>;
};
