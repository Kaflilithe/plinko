import { useGeo } from "@/core/providers/geo/GeoHooks";
import { FC, HTMLAttributes } from "react";

export const Notification: FC<HTMLAttributes<HTMLElement>> = ({ ...rest }) => {
  const geo = useGeo();

  return (
    <div {...rest} className="w-full flex-1 bg-card p-4 rounded">
      <img src="" alt="" />

      <div>
        <h2 className="flex items-center justify-between">
          <span>Revoult Bank</span>
          <small>now</small>
        </h2>

        <p>
          Начисление {geo.price} {geo.currency}
        </p>
      </div>
    </div>
  );
};
