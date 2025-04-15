import Phaser from 'phaser';

export enum PlinkoEvent {
	KICK_BALL = 'KICK_BALL',
	GOAL = 'GOAL'
}

// Used to emit events between React components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Phaser.Events.EventEmitter();