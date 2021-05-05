import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormArray, FormControl} from "@angular/forms";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import {ObjectService} from "@smartsoft001/utils";

import {InputBaseComponent} from "../base/base.component";
import {IButtonOptions, IFormOptions} from "../../../models";
import {FormFactory} from "../../../factories/form/form.factory";
import {FieldType, getModelFieldOptions, getModelOptions, IFieldOptions, IModelOptions} from "@smartsoft001/models";

@Component({
    selector: 'smart-input-array',
    templateUrl: './array.component.html',
    styleUrls: ['./array.component.scss'],
})
export class InputArrayComponent<T, TChild> extends InputBaseComponent<T> implements OnInit {
    childOptions: Array<IFormOptions<TChild> & { fieldOptions: IFieldOptions, show?: boolean, modelOptions: IModelOptions }>;
    addButtonOptions: IButtonOptions = {
        click: async () => {
            const options = this.getOptions();
            const modelOptions = getModelOptions(options.classType);
            const control = await this.factory.create(
                new this.fieldOptions.classType(), { mode: this.internalOptions.mode }
            );
            (this.internalOptions.control as FormArray).push(control);
            this.childOptions.push({
                treeLevel: this.internalOptions.treeLevel + 1,
                mode: this.internalOptions.mode,
                control,
                model : ObjectService.createByType(control.value, options.classType),
                fieldOptions: options,
                modelOptions,
                show: true
            });
            this.control.markAsDirty();
        }
    };

    FieldType = FieldType;

    constructor(cd: ChangeDetectorRef,  private factory: FormFactory) {
        super(cd);
    }

    protected afterSetOptionsHandler() {
        this.initData();
    }

    onRemove(index: number) {
        (this.internalOptions.control as FormArray).removeAt(index);
        this.initData();
        this.control.markAsDirty();
        this.control.setValue(this.childOptions.map(o => o.control.value));
    }

    ngOnInit() {}

    private initData(): void {
        this.childOptions = (this.internalOptions.control as FormArray).controls.map(control => {
            const options = this.getOptions();
            const modelOptions = getModelOptions(options.classType);

            return {
                treeLevel: this.internalOptions.treeLevel + 1,
                mode: this.internalOptions.mode,
                control,
                model : ObjectService.createByType(control.value, options.classType),
                fieldOptions: options,
                modelOptions,
                show: false
            } as IFormOptions<TChild> & { fieldOptions: IFieldOptions, modelOptions: IModelOptions };
        });
    }

    drop(event: CdkDragDrop<T, any>) {
        moveItemInArray(this.childOptions, event.previousIndex, event.currentIndex);
        this.control.markAsDirty();
        this.control.setValue(this.childOptions.map(o => o.control.value));
        this.cd.detectChanges();
    }

    private getOptions(): IFieldOptions {
        const options = this.internalOptions.model[0] && this.internalOptions.model[0][this.internalOptions.fieldKey] ?
            getModelFieldOptions(this.internalOptions.model[0], this.internalOptions.fieldKey)
            : getModelFieldOptions(this.internalOptions.model, this.internalOptions.fieldKey);
        return options;
    }
}
