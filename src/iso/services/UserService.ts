import { inject } from "react-ioc";
import { StoreService } from "./StoreService";

export class UserService {
    @inject public store: StoreService;

    public get user() {
        return this.store.store$.value.user;
    }
}
