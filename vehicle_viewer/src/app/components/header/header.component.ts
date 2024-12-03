import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector:"vv-header",
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    @Input() isVehicleList = true;
    @Output() onValueChange: EventEmitter<string>;
    constructor(){
        this.onValueChange = new EventEmitter<string>();
    }

    handleValueChange(evt: Event): void {
        this.onValueChange.emit((evt.target as HTMLInputElement).value);
    }
}