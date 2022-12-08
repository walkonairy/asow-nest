class RestResponse<T> {
  private static readonly CODE_OK = '200';
  private static readonly SUCCESS_MESSAGE = 'Succeeded';

  private static readonly CODE_ERROR = '500';
  private static readonly FAIL_MESSAGE = 'Failed';

  code: string;

  message: string;

  data: T;

  constructor(code?: string, message?: string, data?: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  public static ok<T>(p: string | T | null) {
    if (!typeof p) {
      return new RestResponse(this.CODE_OK, this.SUCCESS_MESSAGE);
    } else if (typeof p === 'string') {
      return new RestResponse(this.CODE_OK, p);
    } else {
      const r = new RestResponse();
      r.code = this.CODE_OK;
      r.message = this.SUCCESS_MESSAGE;
      r.data = p;
      return r;
    }
  }

  public static fail(message?: string) {
    return new RestResponse(this.CODE_ERROR, message || this.FAIL_MESSAGE);
  }
}

export default RestResponse;
