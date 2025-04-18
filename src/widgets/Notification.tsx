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
      className="w-full flex gap-[8px] items-center flex-1 bg-card p-4 rounded notification select-none"
    >
      <img src={geo.logo} className='max-w-[55px] rounded-md' alt="" />

      <div className='flex-1'>
        <h2 className="flex items-center justify-between">
          <span className='text-[20px]'>{geo.bank}</span>
          <small>now</small>
        </h2>

        <p className='text-[14px]'>
          <span className='mb-[3px] block'>Replenished on: <span>{geo.winnings} {geo.currency}</span></span>
          <span>Balance: <span>{geo.winnings}.58 {geo.currency}</span></span>
        </p>
      </div>
    </div>
  );
};
