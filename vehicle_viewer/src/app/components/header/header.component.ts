import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { Store } from "@ngrx/store";
import { tap } from "rxjs";
import { Nullish } from "../../common/types";
import { selectUserRole } from "../../state/user.selector";

@UntilDestroy()
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

    userRole: Nullish<string>;
    constructor(protected readonly store: Store){
        this.onValueChange = new EventEmitter<string>();
        this.onCreate = new EventEmitter<void>();
        store.select(selectUserRole).pipe(
            untilDestroyed(this),
            tap(d => this.userRole = d)
        ).subscribe();
    }

    handleValueChange(evt: Event): void {
        this.onValueChange.emit((evt.target as HTMLInputElement).value);
    }
    
    handleCreate(): void {
        this.onCreate.emit();
    }
        
}