import { CommonModule } from "@angular/common";
import { Component, ChangeDetectionStrategy } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { LoginContainerPresenter } from "./login-container.presenter";

@Component({
    selector: 'vv-login-container',
    templateUrl: './login-container.component.html',
    styleUrl: './login-container.component.scss',
    imports:[
      CommonModule, 
      NzButtonModule
    ],
    providers:[LoginContainerPresenter],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class LoginContainerComponent {

    constructor(protected readonly presenter: LoginContainerPresenter){
        this.presenter.resetRole();
    }

    onSelectRole(role: string): void {
        this.presenter.setRole(role);
    }
  }