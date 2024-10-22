import CardPlayer from "./CardPlayer.js";
export default class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    }
    
    preload(){
        this.load.image('card','assets/card.png');
        this.load.image('angel','assets/angel.png');
        this.load.bitmapFont('pressstart','assets/pressstart.png','assets/pressstart.fnt');
        this.load.image('armor','assets/armor.png');
    }
    create(){
        this.player = new CardPlayer({
            scene: this,
            name:'angel',
            x:this.game.config.width / 2,
            y:this.game.config.height - 200,
            card:'card',
            image:'angel',
            health : 16,
            depth: 1,//다른 모든것 위로
            ondragend : (pointer, gameObject)=>{}
        })
    }
}