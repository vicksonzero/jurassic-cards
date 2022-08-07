import { BasicCardFaceData, BasicCardBackData } from "./CardFaceFactory";

export default {
    BASIC(cardDef: BasicCardFaceData, div: HTMLDivElement) {
        const { id, title, description } = cardDef;
        div.style.backgroundColor = '#fbfbf8';
        div.style.color = 'black';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'stretch';
        div.style.textAlign = 'center';
        div.innerHTML = [
            `<div style="font-size:16px; position: absolute; width: 100%; bottom: 50%;">${title}</div>`,
            `<div style="font-size:12px; font-family: sans-serif; color: #333333; font-style: italic; position: absolute; width: 100%; top: 50%;">${description}</div>`,
            `<div style="font-size: 10px; position: absolute; width: 100%; bottom: 4px;">(${id})</div>`,
        ].join('\n');
    },
};