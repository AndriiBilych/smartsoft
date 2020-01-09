import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { CommonModule } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { HttpClientModule } from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {DeviceDetectorModule} from "ngx-device-detector";

import { COMPONENTS } from "./components";
import { FACTORIES } from "./factories";
import { setDefaultTranslationsAndLang } from "./translations-default";
import {SERVICES} from "./services";

@NgModule({
  providers: [...FACTORIES, ...SERVICES],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    TranslateModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot()
  ],
  exports: [
    ReactiveFormsModule,
    IonicModule,
    CommonModule,
    ...COMPONENTS,
    TranslateModule,
    HttpClientModule
  ]
})
export class SharedModule {
  constructor(translateService: TranslateService) {
    setDefaultTranslationsAndLang(translateService);
  }
}
