import { DrawImage } from './../store/designer.actions';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { IDrawData } from '../models/designer.models';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';
import * as fromDesigner from './../store';


@Component({
  selector: 'app-designer',
  templateUrl: './designer.component.html',
  styleUrls: ['./designer.component.scss']
})
export class DesignerComponent implements OnInit {
  drawForm: FormGroup;
  fonts: Array<{ name: string, value: string }> = [
    { name: 'Rouge Script', value: 'Rouge Script' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Notable', value: 'Notable' },
    { name: 'Open Sans', value: 'Open Sans' },
    { name: 'Indie Flower', value: 'Indie Flower' }
  ];

  formData$ = this.store.select(fromDesigner.getFormData);

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<IAppState>
  ) { }

  ngOnInit() {
    this.onFormInit();
  }

  onFormInit() {
    this.drawForm = this.formBuilder.group({
      text: ['', [Validators.required]],
      fontFamily: ['', [Validators.required]],
      fontColor: ['', [Validators.required]],
      fontSize: [16, [Validators.required, Validators.min(10)]],
      xPosition: [0, [Validators.required]],
      yPosition: [0, [Validators.required]]
    });
  }

  onSubmit(form) {
    if (form.valid) {
      const fromData: IDrawData = form.value;

      // 2. Dispatch draw action
      this.store.dispatch(new fromDesigner.UpdateForm(fromData));

      // 3. Reset form
      this.drawForm.reset();
    }
  }

  onDrawAction(data: any) {
    this.store.dispatch(new fromDesigner.DrawImage(data));
  }

  onDownloadAction(data: any) {
    this.store.dispatch(new fromDesigner.DownloadImage(data));
  }

  onUndoAction(data: any) {
    this.store.dispatch(new fromDesigner.UndoDrawAction(data));
  }

  onRedoAction(data: any) {
    this.store.dispatch(new fromDesigner.RedoDrawAction(data));
  }


}
