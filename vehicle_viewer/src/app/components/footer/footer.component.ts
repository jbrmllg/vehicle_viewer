import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector:"vv-footer",
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
    
    constructor(){

    }

    /**
     * Navigates to login view.
     */
    logout(): void {

    }
}