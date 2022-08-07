import { Piece } from "./Piece";



export type CardFaceDelegate = (div: HTMLDivElement) => void;

export class Stack extends Piece {
    public children: HTMLDivElement[] = [];

    cardFaceDelegate: CardFaceDelegate = () => { };
    cardBackDelegate: CardFaceDelegate = () => { };

    withCardFace(delegate: CardFaceDelegate): this {
        this.cardFaceDelegate = delegate;
        return this;
    }
    withCardBack(delegate: CardFaceDelegate): this {
        this.cardBackDelegate = delegate;
        return this;
    }

    createDom(): this {
        super.createDom();
        if (!this.dom) return this;

        this.card = document.createElement('div');
        this.card.classList.add('card');
        this.dom.append(this.card);

        this.cardFace = document.createElement('div');
        this.cardFace.classList.add('card-face');
        this.card.append(this.cardFace);
        this.cardFaceDelegate(this.cardFace);

        this.cardBack = document.createElement('div');
        this.cardBack.classList.add('card-back');
        this.card.append(this.cardBack);
        this.cardBackDelegate(this.cardBack);

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