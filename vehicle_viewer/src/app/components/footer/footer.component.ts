import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Router } from "@angular/router";
import { NzButtonModule } from "ng-zorro-antd/button";

@Component({
    selector:"vv-footer",
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports:[NzButtonModule],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    
    constructor(protected readonly router: Router){

    }

    /**
     * Navigates to login view.
     */
    logout(): void {
        this.router.navigate(['/login'])
    }
}