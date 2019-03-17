import { setConfig } from "../config";
import { debug, error, info, warn } from "./LogFunctions";

describe("Log", () => {
    describe("LogFunctions", () => {
        const checkConsoleLogToBeCalled = (fn) => {
            // tslint:disable-next-line
            console.log = jest.fn();
            const spy = jest.spyOn(global.console, "log");
            setConfig({
                default: {
                    additionalLogMessages: ["testAd"],
                    logLevel: "debug",
                },
            });
            fn("hello");
            expect(spy).toHaveBeenCalled();
            spy.mockRestore();
        };

        afterEach(() => {
            // tslint:disable-next-line
            (console.log as any).mockClear();
        });

        const checkConsoleLogNotToBeCalled = (fn) => {
            const spy = jest.spyOn(global.console, "log");
            setConfig({
                default: {
                    additionalLogMessages: ["testAd"],
                    logLevel: "error",
                },
            });
            fn("hello");
            expect(spy).not.toHaveBeenCalled();
            spy.mockRestore();
        };

        it("<error> should write logs into console", () => {
            checkConsoleLogToBeCalled(error);
        });

        it("<warn> should write logs into console", () => {
            checkConsoleLogToBeCalled(warn);
        });

        it("<info> should write logs into console", () => {
            checkConsoleLogToBeCalled(info);
        });

        it("<debug> should write logs into console", () => {
            checkConsoleLogToBeCalled(debug);
        });

        it("<warn> should not write logs into console", () => {
            checkConsoleLogNotToBeCalled(warn);
        });

        it("<info> should not write logs into console", () => {
            checkConsoleLogNotToBeCalled(info);
        });

        it("<debug> should not write logs into console", () => {
            checkConsoleLogNotToBeCalled(debug);
        });
    });
});
