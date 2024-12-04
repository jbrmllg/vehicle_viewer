import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector:"vv-header-container",
    templateUrl: './header-container.component.html',
    styleUrl: './header-container.component.scss',
    imports: [HeaderComponent],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderContainerComponent {

    @Output() onSearch: EventEmitter<string>;
    @Output() onCreate: EventEmitter<void>;
    
    constructor () {
        this.onSearch = new EventEmitter<string>();
        this.onCreate = new EventEmitter<void>();
    }

    handleChangeValue(evt: string): void {
        this.onSearch.emit(evt);
    }

    handleCreate(): void {
        this.onCreate.emit();
    }


}