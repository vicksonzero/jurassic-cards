import { PlainCardBackData } from "./CardFaceFactory";

export default {
    BASIC(cardDef: PlainCardBackData, div: HTMLDivElement) {
        div.style.backgroundColor = cardDef.color;
        div.style.color = 'white';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.innerHTML = [
            `<p>${cardDef.cardType}</p>`,
        ].join('\n');

    },

    LIGHT_NEGATIVE(cardDef: any, div: HTMLDivElement) {
        div.style.backgroundColor = 'white';
        div.style.color = 'black';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';

        const negativeIcon = document.createElement('div');
        negativeIcon.style.width = '64px';
        negativeIcon.style.height = '64px';
        negativeIcon.style.borderRadius = '6px';
        negativeIcon.style.backgroundColor = '#5a5a77'; // pale navy
        negativeIcon.style.color = 'white';
        negativeIcon.style.display = 'flex';
        negativeIcon.style.flexDirection = 'column';
        negativeIcon.style.justifyContent = 'center';
        negativeIcon.style.alignItems = 'center';
        negativeIcon.innerHTML = [
            `<p>Back</p>`,
        ].join('\n');
        div.append(negativeIcon);
    },
};