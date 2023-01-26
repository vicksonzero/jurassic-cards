import { Card } from "./Card";
import { Piece } from "./Piece";



export type CardFaceDelegate = (div: HTMLDivElement) => void;

export class Stack extends Piece {
    public children: HTMLDivElement[] = [];

    createDom(): this {
        super.createDom();
        if (!this.dom) return this;

        // this.card = document.createElement('div');
        // this.card.classList.add('card');
        // this.dom.append(this.card);

        return this;
    }

    action(): this {
        this.toggleFlipped();

        return this;
    }
    toggleFlipped(): this {
        for (const child of this.children) {
            const piece = Piece.getParentPiece(child);
            (piece as Card)?.toggleFlipped?.();
        }
        return this;
    }


    toggleSelected(val = !this.selected): this {
        super.toggleSelected(val);
        // if (!this.selected) return this.toggleFlipped(false);
        return this;
    }
}