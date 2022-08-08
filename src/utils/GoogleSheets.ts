export class GoogleSheets {

    apiKey: string = '';
    workbookId: string = '';
    constructor() {
        const params = (new URL(document.URL)).searchParams;
        this.apiKey = params.get(`apiKey`) ?? '';
        this.workbookId = params.get(`workbookId`) ?? '';
    }
    async GetSheetJson(sheet: string, range: string) {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${this.workbookId}/values/${sheet}!${encodeURIComponent(range)}?key=${this.apiKey}`;

        console.log('GetSheetJson', url);
        const data = await fetch(url).then((response) => response.json());

        const { values }: { values: any[][] } = data;

        const keys: string[] = values[0];
        return values.slice(1).map(row => {
            const result: { [x: string]: any } = {};
            keys.forEach((key, i) => {
                result[key.replace(/ /g, '_')] = row[i];
            });
            return result;
        });

    }
}