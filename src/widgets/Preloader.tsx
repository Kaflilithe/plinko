import logo from "../assets/logo.png";
import flowers from "../assets/bg-flowers.png";
import { Progress } from "@/components/ui/progress";
import { FC, useEffect, useState } from "react";
import anime from "animejs";

interface Props {
  interval?: number;
  onFinish: () => void;
}

export const Preloader: FC<Props> = ({ interval = 2000, onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    anime({
      duration: interval,
      easing: "easeOutCubic",
      update: (anim) => {
        setProgress(() => anim.progress);
      },
      complete: () => {
        onFinish();
      },
    });
  }, [interval]);

  return (
    <div className="fixed flex top-0 w-full min-h-screen z-[99999] bg-gradient p-4">
      <div className="relative flex-1 flex items-center justify-center flex-col gap-4">
        <div className="flex flex-col gap-8">
          <img src={logo} alt="" />

          <Progress max={100} value={progress} />
        </div>

        <div className="absolute -bottom-10 opacity-50">
          <img src={flowers} alt="" />
        </div>

        <div className="absolute -top-10 opacity-50">
          <img className="rotate-180" src={flowers} alt="" />
        </div>
      </div>
    </div>
  );
};
