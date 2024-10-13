// @ts-nocheck
import Phaser from "phaser";

export class GameScene extends Phaser.Scene {
    constructor() {
        super("game-scene");
    }

    preload() {/* scene 생성 전 호출, assets 불러오기*/
        this.load.image("sky", "assets/sky.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("star", "assets/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.spritesheet("dude", "assets/dude.png", {
        frameWidth: 32,
        frameHeight: 48,
        });
    }

    create() {/* scene 생성 시 1회 호출, game object 배치*/
        /*this.add.image(가로좌표,세로좌표,"sky"); */
        this.add.image(400,300,"sky");

        /*staticGroup : 중력 영향 안 받는 지형*/
        const platforms = this.physics.add.staticGroup();
        platforms.create(400,568,"ground").setScale(2).refreshBody();
        platforms.create(600,400,"ground");
        platforms.create(50,250,"ground");
        platforms.create(750,220,"ground");

        const player = this.physics.add.sprite(100, 450, 'dude').setName("player");
        player.setBounce(0.2);/*충돌시 바운스 효과*/
        player.setCollideWorldBounds(true);/*화면 경계에서 충돌*/
        this.anims.create({
            key : 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        /*지형과 상호작용해 지형과 충돌*/
        this.physics.add.collider(player, platforms);

        /*별을 만들어보자-------------------------------------*/
        const stars = this.physics.add.group({
            /*x축 좌표는 12픽셀부터 시작하여 70픽셀 간격으로 생성되게*/
            key: "star",repeat:11,setXY:{x:12, y:0, stepX:70},
        })
        this.data.set("stars",stars);

        stars.children.iterate(function(child){/*iterate 메소드를 통해 순차적으로 Y축 바운스를 설정해준다. */
            child.setBounceY(Phaser.Math.FloatBetween(0.4,0.6));
        })
        this.physics.add.collider(stars, platforms);

        /*overlap을 이용하여 player객체와 stars객체가 overlap되면 collectStar가 작동하게 하였다.*/
        this.physics.add.overlap(player, stars, this.collectStar, undefined, this);

        /*점수로 사용할 text를 만들자!--------------------------*/
        this.data.set("score",0);
        this.add.text(16, 16, 'Score: 0', { fontSize: '32px', backgroundColor: '#000' }).setName("scoreText");

        /*폭탄을 만들자! --------------------------------------*/
        const bombs = this.physics.add.group();
            this.data.set("bombs", bombs);
            this.physics.add.collider(bombs,platforms); /*bombs 그룹과 platforms 객체 사이에 충돌 처리를 추가합니다. */
            this.physics.add.collider(player,bombs,this.hitBomb,undefined,this);
            /*player 객체와 bombs 그룹 사이에도 충돌 처리를 추가합니다. 
            플레이어가 폭탄과 충돌했을 때, this.hitBomb 함수가 호출됩니다. 
            이 함수는 플레이어가 폭탄과 충돌했을 때 어떻게 반응할지를 정의합니다. 
            undefined는 충돌할 때 추가적인 조건이 없음을 의미하고, 
            this는 현재 객체의 컨텍스트를 유지하는 데 사용됩니다.*/
    }

    /*별이 사라지게 하는 메소드*/
    collectStar(player, star) {
        star.disableBody(true, true);

        /*별이 사라지면 점수 오름!*/
        this.data.set("score", this.data.get("score")+10);
        this.children
            .getByName("scoreText")
            .setText("Score: " + this.data.get("score"));

        /*화면에 별이 없다면 별이 자동 생성됨*/
        const stars = this.data.get("stars");
        if (stars.countActive(true)===0){
            stars.children.iterate(function (child){
                child.enableBody(true, child.x, 0, true, true);
            });
        
            const x =
            player.x < 400
                ? Phaser.Math.Between(400, 800)
                : Phaser.Math.Between(0, 400);
            const bombs = this.data.get("bombs");
            const bomb = bombs.create(x, 16, "bomb");
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        }
        }

    /*폭탄에 맞으면 아파하는 메소드*/
    hitBomb(player, bomb){
        this.physics.pause(); /*멈추게하기*/
        player.setTint(0xff0000); /*플레이어 빨간색으로*/
        player.anims.play("turn"); /*앞을 바라보는 애니메이션*/
    }

    update() {/*  scene 실행 중 frame 마다 호출 함수, 기본 60fps*/
        const cursors = this.input.keyboard.createCursorKeys();/*키보드의 값*/
        const player = this.children.getByName("player");/*앞서 설정한 setName과 연동*/  

        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play("left",true);
        }else
        if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play("right",true);
        }else{
            player.setVelocityX(0);
            player.anims.play("turn");
        }

        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-550);
        }
    }
}