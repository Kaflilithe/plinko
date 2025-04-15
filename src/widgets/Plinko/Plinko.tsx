import clsx from "clsx";
import { FC, HTMLAttributes, useEffect, useRef, useState } from "react";
import { EventBus, PlinkoEvent } from "./EventBus";
// @ts-ignore
import { createGame } from "./PlinkoGame";
import { useGeo } from "@/core/providers/geo/GeoHooks";

const gates = [100, 30, 20, 10, 2, 2, 10, 20, 30, 100];

type Props = HTMLAttributes<HTMLDivElement>;

export const Plinko: FC<Props> = ({ ...rest }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [goals, setGoals] = useState(new Set<number>());
  const [canvasW, setCanvasW] = useState(0);

  const [actionCount, setActionCount] = useState(5);
  const geo = useGeo();

  useEffect(() => {
    if (elRef.current) {
      const game = createGame(elRef.current);
      const canvas = elRef.current.querySelector("canvas");

      if (canvas instanceof HTMLCanvasElement) {
        canvasRef.current = canvas;
        setCanvasW(canvas.scrollWidth);
        console.log(canvas.scrollWidth);
      }
      return () => game.destroy(true);
    }
  }, [elRef]);

  useEffect(() => {
    EventBus.on(PlinkoEvent.GOAL, (gateIndex: number) => {
      setGoals((set) => {
        return new Set(set.add(gateIndex));
      });
    });
  }, []);

  const removeGoal = (gate: number) => {
    setGoals((set) => {
      set.delete(gate);
      return new Set(set);
    });
  };

  const kickBall = () => {
    EventBus.emit(PlinkoEvent.KICK_BALL);
    setActionCount((count) => count - 1);
  };

  return (
    <>
      <div className="h-[60vh] relative">
        <div className="w-full h-full" ref={elRef} {...rest} />

        <div
          style={{
            width: `${canvasW}px`,
            left: "50%",
            transform: "translateX(-50%)",
          }}
          className="absolute w-full grid grid-cols-10 gap-0.5 bottom-2 z-50"
        >
          {gates.map((gate, index) => (
            <div
              key={index}
              className={clsx(
                "h-[20px] flex justify-center bg-amber-200 text-black font-bold  rounded-xs items-center box",
                {
                  "bounce-hit": goals.has(index),
                  "bg-red-600": gate === 100,
                  "bg-orange-500": gate === 30,
                  "bg-amber-300": gate === 20,
                  "bg-yellow-300": gate === 10,
                  "bg-lime-300": gate === 2,
                },
              )}
              onAnimationEnd={() => removeGoal(index)}
            >
              {gate}x
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-around flex-col">
          <div className="wallet">10$</div>
          <button
            className="w-[140px] h-[140px] rounded-full button-play uppercase"
            disabled={actionCount === 0}
            onClick={kickBall}
          >
            <span className="flex flex-col items-center">
              <div className="inline-flex items-center">{geo.play}</div>
              <div className="inline-flex items-center text-2xl font-bold">
                {actionCount}
              </div>
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
