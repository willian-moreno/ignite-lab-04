export class Content {
  constructor(
    private readonly _value: string,
    private readonly _minLength: number = 5,
    private readonly _maxLength: number = 255,
  ) {
    const isMinContentLengthValid = this.validateMinContentLength(
      this._value,
      this._minLength,
    );

    if (!isMinContentLengthValid)
      throw new Error(
        `Content length is smallest than ${this._minLength} characters`,
      );

    const isMaxContentLengthValid = this.validateMaxContentLength(
      this._value,
      this._maxLength,
    );

    if (!isMaxContentLengthValid)
      throw new Error(
        `Content length is largest than ${this._maxLength} characters`,
      );
  }

  get value(): string {
    return this._value;
  }

  private validateMinContentLength(
    content: string,
    minLength: number,
  ): boolean {
    return content.length >= minLength;
  }

  private validateMaxContentLength(
    content: string,
    maxLength: number,
  ): boolean {
    return content.length <= maxLength;
  }
}
