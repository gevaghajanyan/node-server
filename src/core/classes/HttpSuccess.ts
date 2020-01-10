export class HttpResponse<T> {
  constructor(
    public statusCode: number,
    public data: T,
    public errorMessages: Array<string>,
  ) {
  }
}

export class SuccessHttpResponse<T> extends HttpResponse<T> {
  constructor(data: T) {
    super(200, data, null);
  }
}

export class ErrorHttpResponse extends HttpResponse<null> {
  constructor(errorMessages: Array<string>) {
    super(500, null, errorMessages);
  }
}