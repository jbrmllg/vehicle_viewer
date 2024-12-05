import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { clearRole, setRole } from "../../state/user.actions";
import { Router } from "@angular/router";

@Injectable()
export class LoginContainerPresenter {

    constructor(
        protected readonly store: Store,
        protected readonly router: Router
    ){}

    resetRole(): void {
        this.store.dispatch(clearRole());
    }

    setRole(role: string): void {
        this.store.dispatch(setRole({ user: role }));
        this.router.navigate(['']);
    }

}
