import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector:"vv-header",
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true
})
export class HeaderComponent {

    @Output() onValueChange: EventEmitter<string>;
    constructor(){
        this.onValueChange = new EventEmitter<string>();
    }

    // TODO: emits input most recent value to search

}