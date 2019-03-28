import { BehaviorSubject } from "rxjs";

export class StoreService {
    public store$: BehaviorSubject<any>;
    [key: string]: any;
}
