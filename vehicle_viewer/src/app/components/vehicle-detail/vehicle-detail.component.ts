import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from "@angular/core";
import { UntilDestroy } from "@ngneat/until-destroy";
import { IVehicle } from "../../models/vehicle.interface";
import { Nullish } from "../../common/types";
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzButtonModule } from "ng-zorro-antd/button";

@UntilDestroy()
@Component({
    selector: 'vv-vehicle-detail',
    templateUrl: './vehicle-detail.component.html',
    styleUrl: './vehicle-detail.component.scss',
    imports:[
      CommonModule, 
      NzGridModule,
      NzButtonModule,

    ],
    providers:[],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class VehicleDetailComponent {
      
    @Input() get vehicle(): Nullish<IVehicle> {
        return this._vehicle;
    }
    set vehicle(value: Nullish<IVehicle>) {
        this._vehicle = value;
        if(!!value) this.extractKeys(value);
    }
    @Output() onEdit: EventEmitter<void>;
        
    vehicleProperties: string[];
    
    // list of properties that will not display
    readonly hiddenProperties = ['idVehicle', 'picture'];
    protected _vehicle: Nullish<IVehicle>;

    constructor() {
        this.vehicleProperties = [];
        this.onEdit = new EventEmitter<void>();
    }

    onEditVehicle(): void {
        this.onEdit.emit();
    }

    protected extractKeys(paramVehicle: IVehicle): void {
        this.vehicleProperties = Object.keys(paramVehicle).filter(
            k => !this.hiddenProperties.includes(k)
        );
    }
}
  

  