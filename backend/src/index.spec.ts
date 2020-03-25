import { expect } from "chai";
import "mocha";

/**
 * Mocha and chai example.
 */
describe("This", () => {
  describe("should", () => {
    it("always pass", () => {
      expect(true).to.equal(true);
    });
  });
});