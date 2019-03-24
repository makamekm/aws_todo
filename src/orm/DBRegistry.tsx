export class DBRegistry {
    public static cleanEntities() {
        this.entities = {};
    }

    public static addEntity(name: string, scope: string, entity: any) {
        if (!this.entities[name]) {
            this.entities[name] = [];
        }
        this.entities[name].push(this.makeEntity(scope, entity));
    }

    public static getEntities(scope: string = "default", ...args: string[]): any[] {
        let result = [];

        if (args && args.length > 0) {
            args.forEach((name) => {
                result = result.concat(
                    this.entities[name]
                        .filter((s) => s.scope === scope)
                        .map((s) => s.entity),
                );
            });
        } else {
            for (const name of Object.keys(this.entities)) {
                result = result.concat(
                    this.entities[name]
                        .filter((s) => s.scope === scope)
                        .map((s) => s.entity),
                );
            }
        }

        return result;
    }

    public static RegisterEntity(
        name: string,
        scope: string = "default",
    ): (target: any) => void {
        return (entity: any): void => {
            this.addEntity(name, scope, entity);
        };
    }

    private static entities: { [name: string]: Array<{
        entity: any
        scope: string,
    }> } = {};

    private static makeEntity(scope: string, entity: any) {
        return {
            entity,
            scope,
        };
    }
}
