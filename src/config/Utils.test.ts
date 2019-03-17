import { replaceEnvVars } from "./Utils";

describe("Config", () => {
  describe("replaceEnvVars", () => {
    it("should replace vars", () => {
      process.env = Object
        .assign(process.env, {
          TEST1: "t1t1",
          TEST2: "123",
        });

      const replacedString = replaceEnvVars('{"Test1": "${TEST1}", "Test2": ${TEST2}, "Test3": ${TEST3:111}}');

      expect('{"Test1": "t1t1", "Test2": 123, "Test3": 111}')
        .toBe(replacedString);
    });
  });
});
