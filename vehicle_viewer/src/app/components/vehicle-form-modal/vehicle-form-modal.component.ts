import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzModalModule } from "ng-zorro-antd/modal";
import { VehicleFormComponent } from "../vehicle-form/vehicle-form.component";
import { BehaviorSubject, Observable } from "rxjs";
import { ID, Nullish } from "../../common/types";

@UntilDestroy()
@Component({
    selector: 'vv-vehicle-form-modal',
    templateUrl: './vehicle-form-modal.component.html',
    styleUrl: './vehicle-form-modal.component.scss',
    imports:[
      CommonModule, 
      NzButtonModule,
      NzModalModule,
      VehicleFormComponent
    ],
    providers:[],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class VehicleFormModalComponent {

    readonly createTitle = "Create Vehicle";
    readonly editTitle = "Edit Vehicle";

    @Input() get idVehicle(): Nullish<ID> {
      return this._idVehicle;
    }
    set idVehicle(value: Nullish<ID>) {
      this._idVehicle = value;
      if(!!value) {
        this.titleSubject.next(this.createTitle);
      } else {
        this.titleSubject.next(this.editTitle);
      }
    }
    @Input() get visible(): Nullish<boolean> { 
      return this.visibleSubject.value; 
    }
    set visible(value: Nullish<boolean>){
      this.visibleSubject.next(value ?? false);
    }

    modalTitle$: Observable<Nullish<string>>;
    isVisible$: Observable<boolean>;

    protected readonly titleSubject: BehaviorSubject<Nullish<string>>;
    protected readonly visibleSubject: BehaviorSubject<boolean>;
    protected _idVehicle:Nullish<ID>;
    
    constructor() {
        this.titleSubject = new BehaviorSubject<Nullish<string>>("");
        this.visibleSubject = new BehaviorSubject<boolean>(false);
        this.isVisible$ = this.visibleSubject.pipe(untilDestroyed(this));
        this.modalTitle$ = this.titleSubject.pipe(untilDestroyed(this));
    }

    handleCancel(): void {
      this.visibleSubject.next(false);
    }

  }