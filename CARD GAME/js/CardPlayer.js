import CardDraggable from "./CardDraggable.js";

export default class CardPlayer extends CardDraggable {
    constructor(data) {
        let { scene, health } = data;
        super(data);

        // BitmapText 생성 시 오타 수정
        this.textHealth = new Phaser.GameObjects.BitmapText(this.scene, 0, -104, 'pressstart', health);
        this.textMaxHealth = new Phaser.GameObjects.BitmapText(this.scene, -20, -90, 'pressstart', health, 12);
        this.textArmor = new Phaser.GameObjects.BitmapText(this.scene, 0, 0, 'pressstart');
        this.spriteArmor = new Phaser.GameObjects.Sprite(this.scene, 50, -80, 'armor');

        // 텍스트 색상 초기화
        this.textHealth.tint = 0;
        this.textMaxHealth.tint = 0;

        // 생성된 객체들을 컨테이너에 추가
        this.add([this.textHealth, this.textMaxHealth, this.textArmor, this.spriteArmor]);

        // 초기 체력, 최대 체력, 방어구 값 설정
        this.health = health;
        this.maxHealth = health;
        this.armor = 0;
    }

    // 체력 세터
    set health(newHealth) {
        this._health = newHealth;
        this.textHealth.text = this._health;
        this.textHealth.x = -44 - this.textHealth.width / 2; // 텍스트 위치 설정
    }

    // 체력 게터
    get health() {
        return this._health;
    }

    // 최대 체력 세터
    set maxHealth(newMaxHealth) {
        this._maxHealth = newMaxHealth;
    }

    // 최대 체력 게터
    get maxHealth() {
        return this._maxHealth;
    }

    // 방어구 세터
    set armor(newArmor) {
        this._armor = newArmor;
        this.textArmor.text = this._armor;

        // 오타 수정 (this.textArmor.width)
        this.textArmor.x = 46 - this.textArmor.width / 2;

        // 방어구 값에 따라 알파값 설정
        this.textArmor.alpha = this.armor === 0 ? 0 : 1;
        this.spriteArmor.alpha = this._armor === 0 ? 0 : 1;
    }

    // 방어구 게터
    get armor() {
        return this._armor;
    }
}
