import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from "@ngx-translate/core";
import { CookieModule, TransferHttpModule } from "@gorniv/ngx-universal";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio/ngx";

import { ToastService } from "./toast/toast.service";
import { ErrorService } from "./error/error.service";
import { HardwareService } from "./hardware/hardware.service";
import { ModalService } from "./modal/modal.service";
import { DynamicComponentLoader } from "./dynamic-component-loader/dynamic-component-loader.service";
import { PopoverService } from "./popover/popover.service";
import { StorageService } from "./storage/storage.service";
import { AuthService } from "./auth/auth.service";
import { FingerprintService } from "./fingerprint/fingerprint.service";
import { CameraService } from "./camera/camera.service";

@NgModule({
  imports: [
    IonicModule,
    TranslateModule.forChild(),
    CookieModule.forRoot(),
    TransferHttpModule,
  ],
  providers: [
    ToastService,
    ErrorService,
    HardwareService,
    ModalService,
    DynamicComponentLoader,
    PopoverService,
    StorageService,
    AuthService,
    FingerprintService,
    FingerprintAIO,
    CameraService,
  ],
})
export class SharedServicesModule {}
