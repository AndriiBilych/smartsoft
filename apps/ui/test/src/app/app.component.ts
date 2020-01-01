import { Component } from "@angular/core";
import {of} from "rxjs";

import {IAppOptions} from "@smartsoft001/angular";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: "smartsoft-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "ui-test";

  appOptions: IAppOptions = {
    provider: {
      logged$: of(false)
    }
  };

  constructor(translateService: TranslateService) {
    translateService.use('eng');
  }
}
