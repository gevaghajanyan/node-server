export class HttpSuccess {
    public data: any;
    public errors: string[];
    public statusCode: number;

    constructor(data:any, errors?: string[], statusCode?: number) {
        this.data = data;
        this.errors = null;
        this.statusCode = 200;
    }
}