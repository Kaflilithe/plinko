import { HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
	newPrice: number,
	currency: string,

}

export function Wallet({ newPrice, currency }:Props) {

function animaWallet(){
	anime({
		targets: '.sum',
		value: [0, newPrice],
		round: 1,
		easing: 'easeInOutExpo'
	});
}
return(
	<div className="wallet">
		<span className='sum'>{newPrice}</span>
		{currency}
	</div>
)
}

function anime(arg0: { targets: string; value: number[]; round: number; easing: string; }) {
	throw new Error('Function not implemented.');
}
