import cardBacks from './cardBacks';
import cardFaces from './cardFaces';


export type CardData = {
    front: CardFaceData,
    back: CardFaceData,
}


export type BaseCardFaceData = {
    type: string,
}
export type CardFaceReference = BaseCardFaceData & { collection: string, cardId: string };
export type BasicCardFaceData = BaseCardFaceData & {
    id: string,
    title: string,
    description: string,
};
export type BasicCardBackData = BaseCardFaceData & {
    cardType: string,
    color: string,
};

export type CardFaceData = CardFaceReference | BasicCardFaceData | BasicCardBackData;

export type CardFaceDelegate = (data: any, div: HTMLDivElement) => void;

export class CardFaceFactory {
    static apply(type: 'front' | 'back', data: CardFaceData, dom: HTMLDivElement) {
        if (type === 'front') {
            const renderer = (cardFaces as any)[data.type] as CardFaceDelegate;
            (renderer ?? cardFaces.BASIC)(data, dom);
        } else {
            const renderer = (cardBacks as any)[data.type] as CardFaceDelegate;
            (renderer ?? cardBacks.BASIC)(data, dom);
        }

    }
}


