import { getLevelNumber, isWritableLevel } from "./LogLevel";

describe("Log", () => {
  describe("LogLevel", () => {
    describe("getLevelNumber", () => {
      it("should debug be 3", () => {
        expect(3).toBe(getLevelNumber("debug"));
      });

      it("should info be 2", () => {
        expect(2).toBe(getLevelNumber("info"));
      });

      it("should warn be 1", () => {
        expect(1).toBe(getLevelNumber("warn"));
      });

      it("should error be 0", () => {
        expect(0).toBe(getLevelNumber("error"));
      });

      it("should <any> be -1", () => {
        expect(-1).toBe(getLevelNumber("bla" as any));
      });
    });

    describe("isWritableLevel", () => {
      it("should debug be valid", () => {
        expect(true).toBe(isWritableLevel("debug", "debug"));
        expect(false).toBe(isWritableLevel("debug", "info"));
        expect(false).toBe(isWritableLevel("debug", "warn"));
        expect(false).toBe(isWritableLevel("debug", "error"));
      });

      it("should info be valid", () => {
        expect(true).toBe(isWritableLevel("info", "debug"));
        expect(true).toBe(isWritableLevel("info", "info"));
        expect(false).toBe(isWritableLevel("info", "warn"));
        expect(false).toBe(isWritableLevel("info", "error"));
      });

      it("should warn be valid", () => {
        expect(true).toBe(isWritableLevel("warn", "debug"));
        expect(true).toBe(isWritableLevel("warn", "info"));
        expect(true).toBe(isWritableLevel("warn", "warn"));
        expect(false).toBe(isWritableLevel("warn", "error"));
      });

      it("should error be valid", () => {
        expect(true).toBe(isWritableLevel("error", "debug"));
        expect(true).toBe(isWritableLevel("error", "info"));
        expect(true).toBe(isWritableLevel("error", "warn"));
        expect(true).toBe(isWritableLevel("error", "error"));
      });
    });
  });
});
