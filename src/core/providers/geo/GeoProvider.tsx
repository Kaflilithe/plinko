import { FC, PropsWithChildren } from "react";
import { ContextProps, GeoContext } from "./GeoContext";

interface Props {
  geo: ContextProps;
}

export const GeoProvider: FC<PropsWithChildren<Props>> = ({
  geo,
  children,
}) => {
  return <GeoContext value={geo}>{children}</GeoContext>;
};
