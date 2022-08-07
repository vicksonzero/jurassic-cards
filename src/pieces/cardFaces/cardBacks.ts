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

export const cardBack2 = (cardDef: any) => (div: HTMLDivElement) => {
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
}