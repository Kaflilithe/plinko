import Phaser from 'phaser';


const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const PEG_ROWS = 11;
const PEG_SPACING_X = 28;
const PEG_SPACING_Y = 35;
const PEG_RADIUS = 5;
const GATE_WIDTH = 80;
const BALL_RADIUS = 8;

class PlinkoScene extends Phaser.Scene {
	constructor() {
		super('plinko');
	}

	create() {
		this.matter.world.setBounds();

		// Create pegs in a triangular pattern starting with 1 peg
		for (let row = 0; row < PEG_ROWS; row++) {
			const pegsInRow = row + 3; // начинаем с 1 пега
			for (let col = 0; col < pegsInRow; col++) {
				const x = (GAME_WIDTH / 2) - (pegsInRow - 1) * PEG_SPACING_X / 2 + col * PEG_SPACING_X;
				const y = 100 + row * PEG_SPACING_Y;

				const peg = this.add.circle(x, y, PEG_RADIUS, 0xFFFFFF);
				const pegBody = this.matter.bodies.circle(x, y, PEG_RADIUS, {
					isStatic: true,
					restitution: 0.5
				});
				this.matter.add.gameObject(peg, pegBody);
			}
		}


		// Create gates at the bottom
		const gateCount = Math.floor(GAME_WIDTH / GATE_WIDTH);
		for (let i = 0; i <= gateCount; i++) {
			const x = i * GATE_WIDTH;
			const rect = this.add.rectangle(x, GAME_HEIGHT - 25, 1, 50, 0x999999);
			const body = this.matter.bodies.rectangle(x, GAME_HEIGHT - 25, 1, 50, { isStatic: true });
			this.matter.add.gameObject(rect, body);
		}

		// Ground
		const ground = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 5, GAME_WIDTH, 10, 0x888888);
		const groundBody = this.matter.bodies.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 5, GAME_WIDTH, 10, { isStatic: true });
		this.matter.add.gameObject(ground, groundBody);

		// Drop balls on click
		this.input.on('pointerdown', () => {
			this.spawnBall(GAME_WIDTH / 2, 20);
		});
	}

	spawnBall(x, y) {
		const ball = this.add.circle(x, y, BALL_RADIUS, 0x3498eb);
		const ballBody = this.matter.bodies.circle(x, y, BALL_RADIUS, {
			restitution: 0.2,
			friction: 0.2,
			frictionStatic: 0,
			frictionAir: 0.001,
			slop: 0.001
		});
		this.matter.add.gameObject(ball, ballBody);
	}
}

export const createGame = (parent) => {
	const config = {
		type: Phaser.AUTO,
		width: GAME_WIDTH,
		height: GAME_HEIGHT,
		backgroundColor: '#1a1a1a',
		physics: {
			default: 'matter',
			matter: {
				gravity: { y: 0.9 },
				debug: true
			}
		},
		scale: {
			parent,
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
			width: GAME_WIDTH,
			height: GAME_HEIGHT
		},

		scene: PlinkoScene
	}
	return new Phaser.Game(config);
};

