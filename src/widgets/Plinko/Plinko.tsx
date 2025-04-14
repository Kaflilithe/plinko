import { FC, HTMLAttributes, useEffect, useRef } from 'react';
import { createGame } from './PlinkoGame';


interface Props extends HTMLAttributes<HTMLDivElement> {

}

export const Plinko: FC<Props> = ({ ...rest }) => {
	const elRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (elRef.current) {
			createGame(elRef.current);
		}
	}, [elRef])

	return <div ref={elRef} {...rest} />
}