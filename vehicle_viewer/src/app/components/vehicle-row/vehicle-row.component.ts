import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { IVehicle } from "../../models/vehicle.interface";
import { ID, Nullish, Roles, Vehicle } from "../../common/types";
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Car } from "../../models/car.model";
import { Store } from "@ngrx/store";
import { selectUserRole } from "../../state/user.selector";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { tap } from "rxjs";

@UntilDestroy()
@Component({
    selector:"vv-row",
    templateUrl: './vehicle-row.component.html',
    styleUrl: './vehicle-row.component.scss',
    standalone: true,
    imports: [CommonModule, NzInputModule, NzButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class VehicleRowComponent {

    @Input() get vehicle(): Nullish<IVehicle> {
        return this._vehicle;
    }
    set vehicle(value: Nullish<IVehicle>) {
        this._vehicle = value;
        this.isCar = value instanceof Car;
    }
    @Input() buttonStr: Nullish<string>;
    @Output() onClick: EventEmitter<ID>;

    isCar = false;
    get userRole(): string {
        return this._userRole as string;
    }
    // set userRole(role: string) {
    //     this._userRole = role;
    // }
    protected _vehicle: Nullish<IVehicle>;
    protected _userRole: Nullish<string>;
    constructor(protected readonly store: Store) {
        store.select(selectUserRole).pipe(
            untilDestroyed(this),
            tap(d => this._userRole = d)
        ).subscribe();
        this.onClick = new EventEmitter<ID>();
    }

    clickRow(): void {
        this.onClick.emit(this.vehicle?.idVehicle);
    }

}