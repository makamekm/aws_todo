import { IConfigScope } from "./IConfig";
import {
    applyDefaultConfig,
    getConfig,
    readConfig,
    saveConfig,
    setConfig,
} from "./Operations";

describe("Config", () => {
    describe("Operations", () => {
        afterEach(() => {
            applyDefaultConfig();
        });

        beforeEach(() => {
            applyDefaultConfig();
        });

        it("should getConfig match snapshot", () => {
            expect(getConfig()).toMatchSnapshot();
        });

        it("should readConfig from a file", () => {
            const conf = {
                default: {
                    db: "test",
                    logLevel: "test",
                },
            };
            readConfig(<any> {
                existsSync: jest.fn().mockReturnValue(true),
                readFileSync: jest.fn().mockReturnValue(
                    JSON.stringify(conf),
                ),
            });
            expect(getConfig()).toMatchObject(conf.default);
        });

        it("should saveConfig save config into a file", () => {
            const spy = jest.fn();
            saveConfig(<any> {
                existsSync: jest.fn().mockReturnValue(true),
                writeFileSync: spy,
            });
            expect(spy).toBeCalled();
        });

        it("should setConfig match object", () => {
            const conf: IConfigScope = {
                default: {
                    db: {},
                    logLevel: "debug",
                },
            };
            setConfig(conf);
            expect(getConfig()).toMatchObject(conf.default);
        });
    });
});
