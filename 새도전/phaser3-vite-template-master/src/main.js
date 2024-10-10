import Phaser from 'phaser'

import {GameScene} from './GameScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 800,
	height: 600,
	physics: { /*게임의 물리효과를 작용하는 프로퍼티*/
		default: 'arcade',
		/*phaser는 phaser에서 만든 자체 물리엔진인 arcade와 
		상용화 되어있는 matter라는 2개의 물리엔진을 지원한다.*/
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [GameScene],
}

export default new Phaser.Game(config)
