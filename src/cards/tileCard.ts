export const tileCard = (cardDef: any) => (div: HTMLDivElement) => {
    div.style.backgroundColor = '#fbfbf8';
    div.style.color = 'black';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.innerHTML = [
        `<p>Tile</p>`,
    ].join('\n');


}