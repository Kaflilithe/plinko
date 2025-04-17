import { useGeo } from "@/core/providers/geo/GeoHooks";
import { FC, HTMLAttributes, useEffect } from "react";
import { toast } from "sonner";

interface Props {
  onFinish: () => void;
}

export const Notification: FC<Props> = ({ onFinish }) => {
  useEffect(() => {
    toast.custom(
      (id) => (
        <Template
          onClick={() => {
            toast.dismiss(id);
            onFinish();
          }}
        />
      ),
      {
        duration: Infinity,
        position: "top-center",
      },
    );
  }, []);

  return null;
};

const Template: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => {
  const geo = useGeo();

  return (
    <div
      {...rest}
      className="w-full flex-1 bg-card p-4 rounded notification select-none"
    >
      <img src="" alt="" />

      <div>
        <h2 className="flex items-center justify-between">
          <span>Revoult Bank</span>
          <small>now</small>
        </h2>

        <p>
          Replenished on: {geo.price} {geo.currency}
        </p>
      </div>
    </div>
  );
};
