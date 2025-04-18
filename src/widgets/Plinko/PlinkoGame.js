import Phaser from "phaser";
import { EventBus, PlinkoEvent } from "./EventBus";
// Audio
import bgAudio from "../../assets/bg.ogg";
import ballKick from "../../assets/ballKick.ogg";
import cell from "../../assets/cell.ogg";
import buttonClick from "../../assets/buttonClick.ogg";
// Sprites
import pin from "../../assets/pin.png";
import pinLight from "../../assets/pin-light.png";
import ball from "../../assets/ball.png";
import off from "../../assets/snd-off.png";
import on from "../../assets/snd-on.png";

const GAME_WIDTH = 400;
const GAME_HEIGHT = 500;
const PEG_ROWS = 12;
const PEG_SPACING_X = 27;
const PEG_SPACING_Y = 35;
const PEG_RADIUS = 5;
const BALL_RADIUS = 8;
const GATE_COUNT = 10;
const GATE_WIDTH = GAME_WIDTH / GATE_COUNT;

// Категории
const BALL_CATEGORY = 0x0001; // Категория для мячиков
const PEG_CATEGORY = 0x0002; // Категория для колышков
const GATE_CATEGORY = 0x0003; // Категория для ворот

const Balls = {
  BALL_1: 0,
  BALL_2: 1,
  BALL_3: 2,
  BALL_4: 3,
  BALL_5: 4,
};

// Сопоставление мячика по индексу
// с воротами, куда он упадет в конце
const BallToGate = {
  [Balls.BALL_1]: 3,
  [Balls.BALL_2]: 1,
  [Balls.BALL_3]: 8,
  [Balls.BALL_4]: 2,
  [Balls.BALL_5]: 9,
};

class PlinkoScene extends Phaser.Scene {
  constructor() {
    super("plinko");
  }

  ballIndex = 0;

  preload() {
    // Audio
    this.load.audio("bgAudio", bgAudio);
    this.load.audio("ballKick", ballKick);
    this.load.audio("cell", cell);
    this.load.audio("buttonClick", buttonClick);
    // Sprite
    this.load.image("pin", pin);
    this.load.image("pinLight", pinLight);
    this.load.image("ball", ball);
    this.load.image("off", off);
    this.load.image("on", on)
  }

  create() {
    this.matter.world.setBounds();
    this.sound.play("bgAudio");

    // Create pegs in a triangular pattern starting with 1 peg
    for (let row = 0; row < PEG_ROWS; row++) {
      const pegsInRow = row + 3; // начинаем с 1 пега
      for (let col = 0; col < pegsInRow; col++) {
        const x =
          GAME_WIDTH / 2 -
          ((pegsInRow - 1) * PEG_SPACING_X) / 2 +
          col * PEG_SPACING_X;
        const y = 50 + row * PEG_SPACING_Y;

        const peg = this.add.sprite(x, y, "pin");
        const pegBody = this.matter.bodies.circle(x, y, PEG_RADIUS, {
          isStatic: true,
          restitution: 0.5,
          label: "peg",
          collisionFilter: {
            category: PEG_CATEGORY, // Колышки в категории 0x0002
            mask: BALL_CATEGORY, // Сталкиваются только с мячиками (0x0001)
          },
        });
        this.matter.add.gameObject(peg, pegBody);
      }
    }

    // Create gates at the bottom
    for (let i = 0; i <= GATE_COUNT; i++) {
      const x = i * GATE_WIDTH;
      const rect = this.add.rectangle(x, GAME_HEIGHT - 25, 1, 25);
      const body = this.matter.bodies.rectangle(x, GAME_HEIGHT - 25, 1, 25, {
        isStatic: true,
      });
      this.matter.add.gameObject(rect, body);
    }

    // Ground
    const ground = this.add.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT - 5,
      GAME_WIDTH,
      10,
    );
    const groundBody = this.matter.bodies.rectangle(
      GAME_WIDTH / 2,
      GAME_HEIGHT - 5,
      GAME_WIDTH,
      10,
      {
        isStatic: true,
        label: "ground",
        collisionFilter: {
          category: GATE_CATEGORY,
          mask: BALL_CATEGORY, // Сталкиваются только с мячиками (0x0001)
        },
      },
    );
    this.matter.add.gameObject(ground, groundBody);

    EventBus.on(PlinkoEvent.KICK_BALL, () => {
      this.spawnBall();
    });

    this.checkCollision();
    this.isMuted = false;
    this.soundButton = this.add.image(GAME_WIDTH - 20, 20, "on")
      .setOrigin(1, 0)
      .setScale(0.5)
      .setInteractive({ useHandCursor: true })
      .on("pointerdown", () => {
        this.isMuted = !this.isMuted;
        this.sound.mute = this.isMuted;
        this.soundButton.setTexture(this.isMuted ? "off" : "on");
      });
  }

  spawnBall(x = GAME_WIDTH / 2, y = 20) {
    const ball = this.add.circle(x, y, BALL_RADIUS, 0xffe011);
    ball.setStrokeStyle(1, 0xc2aa0e);
    const ballBody = this.matter.bodies.circle(x, y, BALL_RADIUS, {
      restitution: 0.2,
      friction: 0.2,
      frictionStatic: 0,
      frictionAir: 0.001,
      slop: 0,
      label: "ball",
      plugin: {
        ballIndex: this.ballIndex++,
      },
      collisionFilter: {
        category: BALL_CATEGORY, // Мячики в категории 0x0001
        mask: PEG_CATEGORY, // Сталкиваются только с колышками (0x0002)
      },
    });
    this.matter.add.gameObject(ball, ballBody);
    this.sound.play("buttonClick", { volume: 3 });
  }

  checkCollision() {
    this.matter.world.on("collisionstart", (event) => {
      checkCollision(event, "ground", "ball", (_ground, ball) => {
        const gateIndex = this.getGateIndex(ball.position.x);
        EventBus.emit(PlinkoEvent.GOAL, gateIndex);
        ball.gameObject.destroy();
        this.sound.play("cell", { volume: 3 });
      });

      checkCollision(event, "peg", "ball", (peg, ball) => {
        this.sound.play("ballKick");
        const { x, y } = peg.position;
        const light = this.add.image(x, y, "pinLight");
        this.time.addEvent({
          delay: 50,
          callback: () => light.destroy(),
        });

        const ballIndex = ball.plugin.ballIndex;
        const gateIndex = BallToGate[ballIndex];
        this.pushBallToGate(ball, gateIndex);
      });
    });
  }

  pushBallToGate(ball, gateIndex) {
    const gateX = this.getGateX(gateIndex);
    const ballX = ball.position.x;

    if (gateX < ballX) {
      this.matter.setVelocity(ball, -1, -0.8);
    } else {
      this.matter.setVelocity(ball, 1, -0.8);
    }
  }

  getGateIndex(x) {
    const gateIndex = Math.floor(x / GATE_WIDTH);
    return Phaser.Math.Clamp(
      gateIndex,
      0,
      Math.floor(GAME_WIDTH / GATE_WIDTH) - 1,
    );
  }

  getGateX(gateIndex) {
    return GATE_WIDTH * gateIndex + GATE_WIDTH / 2;
  }
}

export const createGame = (parent) => {
  const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    transparent: true,
    physics: {
      default: "matter",
      matter: {
        gravity: { y: 0.9 },
        debug: false,
      },
    },
    scale: {
      parent,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: GAME_WIDTH,
      height: GAME_HEIGHT,
    },

    scene: PlinkoScene,
  };
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
