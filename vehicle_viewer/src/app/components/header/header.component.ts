import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
    selector:"vv-header",
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    standalone: true,
    imports: [CommonModule, NzInputModule, NzButtonModule ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

    @Input() isVehicleList = true;
    @Output() onValueChange: EventEmitter<string>;
    @Output() onCreate: EventEmitter<void>;
    constructor(){
        this.onValueChange = new EventEmitter<string>();
        this.onCreate = new EventEmitter<void>();
    }

    handleValueChange(evt: Event): void {
        this.onValueChange.emit((evt.target as HTMLInputElement).value);
    }
    
    handleCreate(): void {
        this.onCreate.emit();
    }
}