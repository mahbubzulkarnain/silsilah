import { q, quote } from "./utils";

describe("Vendor/PostgreSQL/Utils", () => {
  it('should print text from string with quote escape', function() {
    const input = "Lorem Ipsum'\"";
    expect(q(input)).toEqual(quote + input + quote);
  });

  it('should print text from an array with quote escape', function() {
    const input = ["Lorem Ipsum'\"", "Lorem Ipsum'\""];
    expect(q(input)).toEqual(quote + input?.join(`${quote}, ${quote}`) + quote);
  });
});