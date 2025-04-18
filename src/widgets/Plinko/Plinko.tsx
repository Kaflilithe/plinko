import clsx from "clsx";
import {
  FC,
  HTMLAttributes,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { EventBus, PlinkoEvent } from "./EventBus";
// @ts-ignore
import { createGame } from "./PlinkoGame";
import { useGeo } from "@/core/providers/geo/GeoHooks";
import { Game } from "phaser";
import { Wallet } from "@/components/ui/wallet";
import { Notification } from "../Notification";
import playButton from "../../assets/play-btn.png";
import playButtonH from "../../assets/play-btn-h.png";
import logo from "../../assets/logo.png";
import hand from "../../assets/hand.png";
import anime from "animejs";
import bigWin from "../../assets/big_win.svg";
const gates = [100, 50, 30, 20, 10, 10, 20, 30, 50, 100];

interface Props extends HTMLAttributes<HTMLDivElement> {
  // Юзер получил приз
  onFinish: () => void;
}

export const PlinkoGame: FC<Props> = ({ onFinish, ...rest }) => {
  const elRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Game>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const geo = useGeo();

  const [goals, setGoals] = useState(new Set<number>());
  const [canvasW, setCanvasW] = useState(0);
  const [gatesPos, setGatesPos] = useState(0);

  const [actionCount, setActionCount] = useState(5);
  const [prizeCount, setPrizeCount] = useState(5);

  const [buttonBg, setButtonBg] = useState(playButton);
  const [price, setPrice] = useState(geo.price);
  const [disabled, setDisabled] = useState(false);
  const [winnings, setWinnings] = useState(true);
  

  const finished = useMemo(() => prizeCount === 0, [prizeCount]);

  useEffect(() => {
    if (elRef.current) {
      const game = createGame(elRef.current);
      const canvas = elRef.current.querySelector("canvas");
      gameRef.current = game;

      if (canvas instanceof HTMLCanvasElement) {
        canvasRef.current = canvas;
        setCanvasW(canvas.scrollWidth);

        const rect = canvas.getBoundingClientRect();
        const bottomY = rect.bottom;
        setGatesPos(bottomY);
      }
      return () => game.destroy(true);
    }
  }, [elRef]);

  useEffect(() => {
    const onResize = () => {
      queueMicrotask(() => {
        setTimeout(() => {
          gameRef.current?.scale.refresh();

          setCanvasW(canvasRef.current?.scrollWidth || 0);
          const rect = canvasRef.current?.getBoundingClientRect();
          const bottomY = rect?.bottom;
          setGatesPos(bottomY || 0);
        }, 10);
      });
    };
    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [gameRef]);

  useEffect(() => {
    setTimeout(() => {
      anime({
        targets: ".finish-pointer",
        translateY: [-3, 3],
        translateX: [-3, 3],
        loop: true,
        easing: "linear",
        duration: 600,
        direction: "alternate",
      });
    }, 10);
  }, [finished && winnings]);

  useEffect(() => {
    EventBus.on(PlinkoEvent.GOAL, (gateIndex: number) => {
      setGoals((set) => {
        return new Set(set.add(gateIndex));
      });
      setPrizeCount((count) => count - 1);
    });
  }, []);

  useEffect(() => {
    if (prizeCount <= 4) {
      setPrice(geo.winnings / (prizeCount + 1))
    }


  }, [prizeCount])
  useEffect(() => {
    if (finished){
      setTimeout(() => setWinnings(false), 2000)
    }
 
  }, [finished]);

  const removeGoal = (gate: number) => {
    setGoals((set) => {
      set.delete(gate);
      return new Set(set);
    });
  };

  const kickBall = () => {
    EventBus.emit(PlinkoEvent.KICK_BALL);
    setActionCount((count) => count - 1);
    setButtonBg(playButtonH);
    setTimeout(() => {
      setButtonBg(playButton);
    }, 60);

    setDisabled(true);
    setTimeout(() => {
      setDisabled(false);
    }, 300);

    // Уменьшаем выигрышь на 20%
    setPrice((price) => {
      return Math.floor(price - geo.price * 0.2);
    });
  };

  return (
    <>
      <div className={clsx("h-[60vh] relative game", { "blur-sm": finished })}>
        <div className="w-full h-full" ref={elRef} {...rest} />

        <div
          style={{
            width: `${canvasW}px`,
            top: `${gatesPos}px`,
            left: "50%",
            height: "max-content",
            transform: "translateX(-50%) translateY(-100%)",
          }}
          className="absolute w-full grid grid-cols-10 gap-0.5 bottom-2 z-50 px-1 py-2"
        >
          {gates.map((gate, index) => (
            <div
              key={index}
              className={clsx(
                "h-[20px] flex justify-center bg-amber-200 text-black font-bold  rounded-xs items-center box",
                {
                  "bounce-hit": goals.has(index),
                  "bg-red-600": gate === 100,
                  "bg-orange-500": gate === 50,
                  "bg-amber-300": gate === 30,
                  "bg-yellow-300": gate === 20,
                  "bg-lime-300": gate === 10,
                },
              )}
              onAnimationEnd={() => removeGoal(index)}
            >
              {gate}x
            </div>
          ))}
        </div>
      </div>

      <div
        className={clsx("flex-1 flex flex-col gap-2 pb-8", {
          "blur-sm": finished,
        })}
      >
        <div className="flex-1 flex items-center justify-around flex-col">
          <div className="max-w-[200px] logo">
            <img src={logo} alt="" />
          </div>

          <button
            className="relative scale-120 w-[140px] h-[140px] button-play transition-all active:scale-110 text-amber-500 active:text-amber-600 hover:scale-110 bg-transparent"
            disabled={disabled || actionCount === 0}
            onClick={kickBall}
          >
            <img
              src={buttonBg}
              className="w-full absolute left-3 top-2"
              alt=""
            />

            <span className="relative flex flex-col items-center z-10">
              <div className="inline-flex items-center text-2xl font-bold pt-4">
                PLAY
              </div>
              <div className="inline-flex leading-4 items-center text-2xl font-bold">
                {actionCount}
              </div>
            </span>
          </button>

          <Wallet price={price} currency={geo.currency}></Wallet>
        </div>
      </div>
      {finished && (<div className='absolute flex flex-col items-center  top-[50%] left-[50%] translate-[-50%] max-w-[700px] w-[100%] trigger'><img className='max-w-[700px] w-[100%]' src={bigWin} alt="" /></div>)}
      {finished && !winnings && (
        <div className="absolute top-[140px] left-[50%] translateX-[-50%]">
          <img className="finish-pointer" src={hand} alt="" />
    
        </div>
      )}

      {finished && !winnings && <Notification onFinish={onFinish} />}
    </>
  );
};
