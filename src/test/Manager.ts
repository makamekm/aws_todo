import * as MockedManager from "../orm";

const defaultGetManager = MockedManager.getDB;

export const restoreGetManager = () => {
    (MockedManager as any).GetManager = defaultGetManager;
};

export const mockGetManager = (functions) => {
    (MockedManager as any).GetManager = jest.fn().mockReturnValue({
        connect: async () => ({
            getRepository: () => {
                const obj = {};
                Object.assign(obj, functions(obj));
                return {
                    createQueryBuilder: () => obj,
                    ...obj,
                };
            },
        }),
    });
};
