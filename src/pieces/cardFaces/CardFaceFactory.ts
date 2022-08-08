import cardBacks from './cardBacks';
import cardFaces from './cardFaces';


export type CardData = {
    front: CardFaceData,
    back: CardFaceData,
}


export type BaseCardFaceData = {
    style: string,
}
export type CardFaceReference = BaseCardFaceData & { collection: string, cardId: string };
export type PackedCardFaceData = BaseCardFaceData & { data: any };
export type PlainCardFaceData = BaseCardFaceData & {
    id: string,
    title: string,
    description: string,
};
export type PlainCardBackData = BaseCardFaceData & {
    cardType: string,
    color: string,
};

export type CardFaceData = CardFaceReference | PlainCardFaceData | PlainCardBackData | PackedCardFaceData;

export type CardFaceDelegate = (data: any, div: HTMLDivElement) => void;

export class CardFaceFactory {
    static apply(type: 'front' | 'back', data: CardFaceData, dom: HTMLDivElement) {
        if (type === 'front') {
            const renderer = (cardFaces as any)[data.style] as CardFaceDelegate;
            (renderer ?? cardFaces.BASIC)(data, dom);
        } else {
            const renderer = (cardBacks as any)[data.style] as CardFaceDelegate;
            (renderer ?? cardBacks.BASIC)(data, dom);
        }

    }
}


