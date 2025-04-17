import Phaser from 'phaser';
import { EventBus, PlinkoEvent } from './EventBus';


const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const PEG_ROWS = 12;
const PEG_SPACING_X = 27;
const PEG_SPACING_Y = 35;
const PEG_RADIUS = 5;
const BALL_RADIUS = 8;
const GATE_COUNT = 10;
const GATE_WIDTH = GAME_WIDTH / GATE_COUNT;

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
				const y = 140 + row * PEG_SPACING_Y;

				const peg = this.add.circle(x, y, PEG_RADIUS, 0xFFFFFF);
				const pegBody = this.matter.bodies.circle(x, y, PEG_RADIUS, {
					isStatic: true,
					restitution: 0.5
				});
				this.matter.add.gameObject(peg, pegBody);
			}
		}


		// Create gates at the bottom
		for (let i = 0; i <= GATE_COUNT; i++) {
			const x = i * GATE_WIDTH;
			const rect = this.add.rectangle(x, GAME_HEIGHT - 25, 1, 50, 0x999999);
			const body = this.matter.bodies.rectangle(x, GAME_HEIGHT - 25, 1, 50, { isStatic: true });
			this.matter.add.gameObject(rect, body);
		}

		// Ground
		const ground = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 5, GAME_WIDTH, 10, 0x0d173e);
		const groundBody = this.matter.bodies.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 5, GAME_WIDTH, 10, {
			isStatic: true,
			label: 'ground'
		});
		this.matter.add.gameObject(ground, groundBody);

		EventBus.on(PlinkoEvent.KICK_BALL, () => {
			this.spawnBall();
		})

		this.checkCollision();
	}

	spawnBall(x = GAME_WIDTH / 2, y = 20) {
		const ball = this.add.circle(x, y, BALL_RADIUS, 0xffe011);
		const ballBody = this.matter.bodies.circle(x, y, BALL_RADIUS, {
			restitution: 0.2,
			friction: 0.2,
			frictionStatic: 0,
			frictionAir: 0.001,
			slop: 0.001,
			label: 'ball',
		});
		this.matter.add.gameObject(ball, ballBody);
	}

	checkCollision() {
		this.matter.world.on('collisionstart', (event) => {
			checkCollision(event, 'ground', 'ball', (_ground, ball) => {
				const gateIndex = this.getGateIndex(ball.position.x);
				EventBus.emit(PlinkoEvent.GOAL, gateIndex);
				ball.gameObject.destroy();
			})
		});
	}

	getGateIndex(x) {
		const gateIndex = Math.floor(x / GATE_WIDTH);
		return Phaser.Math.Clamp(gateIndex, 0, Math.floor(GAME_WIDTH / GATE_WIDTH) - 1);
	}
}

export const createGame = (parent) => {
	const config = {
		type: Phaser.AUTO,
		width: GAME_WIDTH,
		height: GAME_HEIGHT,
		transparent: true,
		physics: {
			default: 'matter',
			matter: {
				gravity: { y: 0.9 },
				debug: false
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


function checkCollision(event, label1, label2, callback) {
	event.pairs.forEach(({ bodyA, bodyB }) => {
		let body1, body2;
		if (bodyA.label === label1 && bodyB.label === label2) {
			body1 = bodyA;
			body2 = bodyB;
		} else if (bodyA.label === label2 && bodyB.label === label1) {
			body1 = bodyB;
			body2 = bodyA;
		}

		if (body1 && body2) {
			callback(body1, body2);
		}
	});
}