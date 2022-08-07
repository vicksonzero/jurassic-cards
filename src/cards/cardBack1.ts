export const cardBack1 = (cardDef: any) => (div: HTMLDivElement) => {
    div.style.backgroundColor = 'navy';
    div.style.color = 'white';
    div.style.display = 'flex';
    div.style.flexDirection = 'column';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.innerHTML = [
        `<p>Back</p>`,
    ].join('\n');

}