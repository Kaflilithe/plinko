import clsx from 'clsx';
import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { EventBus, PlinkoEvent } from './EventBus';
import { createGame } from './PlinkoGame';

const gates = [
	0, 1, 2, 3, 4, 5, 6, 7, 8, 9
]


interface Props extends HTMLAttributes<HTMLDivElement> {

}

export const Plinko: FC<Props> = ({ ...rest }) => {
	const elRef = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [goals, setGoals] = useState(new Set<number>());
	const [canvasW, setCanvasW] = useState(0);

	useEffect(() => {
		if (elRef.current) {
			const game = createGame(elRef.current);
			const canvas = elRef.current.querySelector('canvas');

			if (canvas instanceof HTMLCanvasElement) {
				canvasRef.current = canvas;
				setCanvasW(canvas.scrollWidth)
				console.log(canvas.scrollWidth);
			}
			return () => game.destroy(true);
		}
	}, [elRef]);

	useEffect(() => {
		EventBus.on(PlinkoEvent.GOAL, (gateIndex: number) => {
			setGoals(set => {
				return new Set(set.add(gateIndex));
			})
		})
	}, [])

	const removeGoal = (gate: number) => {
		setGoals(set => {
			set.delete(gate)
			return new Set(set);
		})
	}


	const kickBall = () => {
		EventBus.emit(PlinkoEvent.KICK_BALL);
	}

	return (
		<>
			<div className='h-[60vh] relative'>
				<div className='w-full h-full' ref={elRef} {...rest} />

				<div
					style={{ width: `${canvasW}px`, left: '50%', transform: 'translateX(-50%)' }}
					className='absolute w-full grid grid-cols-10 gap-0.5 bottom-2 z-50'
				>
					{gates.map(gate => (
						<div
							key={gate}
							className={clsx('h-[20px] flex justify-center bg-amber-200 text-black', {
								'bounce-hit': goals.has(gate)
							})}
							onAnimationEnd={() => removeGoal(gate)}
						>
							{gate}
						</div>
					))}
				</div>
			</div>

			<div className='flex-1 flex flex-col'>
				<div className='flex-1 flex items-center justify-center'>
					<button className='w-[140px] h-[140px] rounded-full' onClick={kickBall}>btn</button>
				</div>
			</div>
		</>
	)
}