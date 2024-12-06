
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
  export class VehicleDataComponent {}