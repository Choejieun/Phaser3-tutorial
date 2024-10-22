import CardBase from "../js/CardBase.js";

export default class CardDraggable extends CardBase {
    constructor(data) {
        // 부모 클래스의 생성자를 호출하기 전에 ondragend를 추출
        let { ondragend } = data;

        // CardBase의 생성자 호출
        super(data);

        // 초기 위치 저장
        this.originalX = this.x;
        this.originalY = this.y;

        // 드래그 가능 여부 설정
        this.draggable = true;

        // 드래그 상태 초기화
        this.dragging = false;

        // 드래그 종료 시 호출할 함수 설정
        this.ondragend = ondragend;

        // 카드 크기 설정 (부모 클래스의 cardSprite로 수정)
        this.setSize(this.cardSprite.width, this.cardSprite.height);

        // 객체를 상호작용 가능하게 설정
        this.setInteractive();

        // 해당 객체를 드래그 가능하게 설정
        this.scene.input.setDraggable(this);

        // 드래그 중일 때의 이벤트 처리
        this.scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            if (!this.draggable) return;

            // 드래그 중임을 표시하고, 위치를 업데이트
            this.dragging = true;
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // 드래그 종료 시의 이벤트 처리
        this.scene.input.on('dragend', (pointer, gameObject) => {
            this.dragging = false;

            // 드래그 종료 시 지정된 함수를 호출
            gameObject.ondragend(pointer, gameObject);
        });
    }
}
