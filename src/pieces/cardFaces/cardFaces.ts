import { PlainCardFaceData, PlainCardBackData } from "./CardFaceFactory";

export default {
    BASIC(cardDef: PlainCardFaceData, div: HTMLDivElement) {
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
            `<div style="font-size:12px; position: absolute; width: 100%; top: 50%; font-family: sans-serif; color: #333333; font-style: italic;">${description}</div>`,
            `<div style="font-size: 10px; position: absolute; width: 100%; bottom: 4px;">(${id})</div>`,
        ].join('\n');
    },
    TILE({ data }: any, div: HTMLDivElement) {
        const { id, tier, copies, copyId, name, iconKey, icon, text } = data;
        div.style.backgroundColor = '#fbfbf8';
        div.style.color = 'black';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'end';
        div.style.alignItems = 'stretch';
        div.style.textAlign = 'left';
        div.style.padding = '4px';
        div.innerHTML = [
            (iconKey == null ? '' : `<img src="assets/game-icons/ffffff/transparent/1x1/${iconKey}.png" style="background-color: #bdccba;">`),
            `<div style="font-size:16px; position: absolute; width: calc(100% - 8px); bottom: 60%;">${name}</div>`,
            `<div style="font-size:12px; position: absolute; width: 100%; top: 44%; padding: 4px; font-family: sans-serif; color: #333333; font-style: italic;">`,
            `    ${(text ?? '').replace(/\n/g, '<br>')}`,
            `</div>`,
            `<div style="font-size: 10px; position: absolute; width: 100%; bottom: 4px; padding: 4px;">(${id}-${copyId})</div>`,
        ].join('\n');
    },
    ITEM({ data }: any, div: HTMLDivElement) {
        const { id, tier, copies, copyId, type, name, iconKey, icon, text } = data;
        div.style.backgroundColor = '#fbfbf8';
        div.style.color = 'black';
        div.style.display = 'flex';
        div.style.flexDirection = 'column';
        div.style.justifyContent = 'begin';
        div.style.alignItems = 'center';
        div.style.textAlign = 'left';
        div.style.padding = '4px';
        div.innerHTML = [
            (iconKey == null ? '' : `<img src="assets/game-icons/ffffff/transparent/1x1/${iconKey}.png" style="background-color: #abad5c; width: 100px; height: 100px;">`),
            `<div style="font-size:16px; position: absolute; width: calc(100% - 8px); bottom: 60%;">${name ?? '??'}</div>`,
            `<div style="font-size:12px; position: absolute; width: 100%; top: 44%; padding: 4px; font-family: sans-serif; color: #333333; font-style: italic;">`,
            `    ${(text ?? '').replace(/\n/g, '<br>')}`,
            `</div>`,
            `<div style="font-size: 10px; position: absolute; width: 100%; bottom: 4px; padding: 4px;">(${id}-${copyId})</div>`,
        ].join('\n');
    },
};