import { CardData, CardFaceFactory } from "./cardFaces/CardFaceFactory";
import { Piece } from "./Piece";



export class Card extends Piece {
    public card?: HTMLDivElement;
    public cardFace?: HTMLDivElement;
    public cardBack?: HTMLDivElement;

    public flipped = false;

    public cardData?: CardData;

    withFaces(cardData: CardData): this {
        this.cardData = cardData;
        return this;
    }

    createDom(): this {
        super.createDom();
        if (!this.dom) return this;
        if (!this.cardData) return this;

        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.dom.append(this.card);

        this.cardFace = document.createElement('div');
        this.cardFace.classList.add('card-face');
        this.card.append(this.cardFace);
        CardFaceFactory.apply('front', this.cardData.front, this.cardFace);

        this.cardBack = document.createElement('div');
        this.cardBack.classList.add('card-back');
        this.card.append(this.cardBack);
        CardFaceFactory.apply('back', this.cardData.back, this.cardBack);

        return this;
    }

    action(): this {
        this.toggleFlipped();

        return this;
    }
    toggleFlipped(val = !this.flipped): this {
        this.flipped = val;

        this.card?.classList.toggle('flipped', this.flipped);
        return this;
    }


    toggleSelected(val = !this.selected): this {
        super.toggleSelected(val);
        // if (!this.selected) return this.toggleFlipped(false);
        return this;
    }
}