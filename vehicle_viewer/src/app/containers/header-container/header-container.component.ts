import { Component } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector:"vv-header-container",
    templateUrl: './header-container.component.html',
    styleUrl: './header-container.component.scss',
    imports: [HeaderComponent],
    standalone: true
})
export class HeaderContainerComponent {

    constructor () {}

    handleChangeValue(evt: unknown): void {
        // TODO lanza busqueda de registro
    }
}