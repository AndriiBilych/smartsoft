import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {Store, StoreModule} from "@ngrx/store";
import {SocketIoModule} from "ngx-socket-io";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

import {SharedModule} from "@smartsoft001/angular";
import {IEntity} from "@smartsoft001/domain-core";

import {CrudConfig} from "./crud.config";
import {CrudEffects} from "./+state/crud.effects";
import {getReducer} from "./+state/crud.reducer";
import {ListComponent} from "./pages/list/list.component";
import {ItemComponent} from "./pages/item/item.component";
import {CrudPipesModule} from "./pipes/pipes.module";
import { CrudService } from './services/crud/crud.service';
import { CrudFacade } from './+state/crud.facade';
import {CrudListPaginationFactory} from "./factories/list-pagination/list-pagination.factory";
import {CrudComponentsModule} from "./components/components.module";

const PAGES = [
    ItemComponent,
    ListComponent
];

@NgModule({
    declarations: [
        ...PAGES
    ],
    entryComponents: [
        ...PAGES
    ],
    imports: [
        StoreModule,
        SharedModule,
        CrudPipesModule,
        SocketIoModule,
        RouterModule.forChild([
            {path: '', component: ListComponent}
            , {path: 'add', component: ItemComponent}
            , {path: ':id', component: ItemComponent}
        ]),
        FormsModule,
        CommonModule,
        CrudComponentsModule
    ],
    exports: [
        ...PAGES
    ],
    providers: [
        CrudService,
        CrudEffects,
        CrudFacade,
        CrudListPaginationFactory,
    ]
})
export class CrudFullModule<T extends IEntity<string>> {
    constructor(store: Store<any>, config: CrudConfig<T>, effects: CrudEffects<any>) {
        store.addReducer(config.entity, getReducer(config.entity));
        effects.init();
    }
}
