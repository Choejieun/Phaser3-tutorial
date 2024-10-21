import CardBase from "../js/CardBase.js";
export default class MainScene extends Phaser.Scene{
    constructor(){
        super('MainScene');
    }
    
    preload(){
        this.load.image('card','assets/card.png');
        this.load.image('angel','assets/angel.png');
        this.load.bitmapFont('pressstart','assets/pressstart.png','assets/pressstart.fnt');
    }
    create(){
        this.player = new CardBase({
            scene: this,
            name:'angel',
            x:0,
            y:0,
            card:'card',
            image:'angel',
            depth: 1,//다른 모든것 위로
        })
    }
}