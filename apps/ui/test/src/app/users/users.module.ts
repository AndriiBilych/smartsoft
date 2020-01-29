import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from "@smartsoft001/angular";
import { AuthModule } from "@smartsoft001/auth-shell-angular";
import {User} from "./user.dto";
import {CrudModule} from "@smartsoft001/crud-shell-angular";
import {ChangePasswordComponent} from "./component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthModule,
    CrudModule.forFeature({
      routing: true,
      config: {
        type: User,
        title: 'Użytkownicy',
        entity: "users",
        apiUrl: "http://localhost:8102/users",
        details: true,
        edit: true,
        add: true,
        detailsComponents: {
          top: ChangePasswordComponent
        }
      }
    })
  ]
})
export class UsersModule {}
