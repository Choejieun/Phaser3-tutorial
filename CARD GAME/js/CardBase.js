// CardBase.js

export default class CardBase extends Phaser.GameObjects.Container {
    constructor(data) {

        // 객체 데이터에서 필요한 속성들을 추출
        let { scene, x, y, name, card, image, depth } = data;
        // 카드 스프라이트 생성
        let cardSprite = new Phaser.GameObjects.Sprite(scene, 0, 0, card);
        // 오버레이 이미지 스프라이트 생성 (중앙에 맞추기 위해 y 위치를 조정)
        let imageSprite = new Phaser.GameObjects.Sprite(scene, 0, 40 / 2, image);
        // 카드 이름 표시 텍스트 생성 (비트맵 텍스트 사용)
        let textName = new Phaser.GameObjects.BitmapText(scene, 0, 0, 'pressstart', name, 16, Phaser.GameObjects.BitmapText.ALIGN_CENTER);
        // 부모 클래스인 Phaser.GameObjects.Container를 호출하여 스프라이트와 텍스트를 컨테이너에 추가
        super(scene, x, y, [cardSprite, imageSprite, textName]);

        // 클래스의 인스턴스 변수로 생성한 스프라이트와 텍스트 객체를 할당
        this.cardSprite = cardSprite;
        this.imageSprite = imageSprite;
        this.textName = textName;
        this.cardname = name;  // 카드 이름 설정
        this.depth = depth;    // 깊이 설정
        this.scene = scene;    // 씬 참조 저장

        // 컨테이너를 씬에 추가
        this.scene.add.existing(this);
    }

    // 카드 이름을 설정하는 세터 함수
    set cardname(newName) {
        // 새로운 카드 이름을 설정
        this._cardname = newName;
        // 텍스트 객체에 새로운 이름을 반영
        this.textName.text = this._cardname;
        // 텍스트의 최대 너비를 카드 스프라이트의 너비로 설정
        this.textName.maxWidth = this.cardSprite.width;
        // 텍스트 색상 초기화 (기본값 흰색)
        this.textName.tint = 0;
        // 텍스트의 가로 위치를 가운데 정렬
        this.textName.x = -this.textName.width / 2;
        // 텍스트의 세로 위치를 카드 하단에 맞춤
        this.textName.y = 120 - this.textName.height;
    }

}
