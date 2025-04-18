import anime from "animejs";
import { HTMLAttributes, useEffect, useRef } from "react";

function usePrevious<T>(value: T): T | null {
  const ref = useRef<T>(null);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  price: number;
  currency: string;
}

export function Wallet({ price, currency }: Props) {
  const prevPrice = usePrevious(price);

  useEffect(() => {
    if (prevPrice !== price) {
      anime({
        targets: ".sum",
        innerHTML: [prevPrice ?? 0, price >= 0 ? price : 0],
        round: 1,
        easing: "easeInOutExpo",
      });
    }
  }, [price, prevPrice]);

  return (
    <div className="wallet">
      <span id="wallet-value" className="sum" />
      {currency}
    </div>
  );
}
