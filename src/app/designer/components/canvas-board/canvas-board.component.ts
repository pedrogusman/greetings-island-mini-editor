import { IDrawData } from './../../models/designer.models';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-canvas-board',
  templateUrl: './canvas-board.component.html',
  styleUrls: ['./canvas-board.component.scss']
})
export class CanvasBoardComponent {

  width = 500;
  height = 700;
  ctx: CanvasRenderingContext2D;

  @Input('drawData') set _drawData(data) {
    if (data) {
      this.drawAction(data);
    }
  }

  @Output() downloadImage: any = new EventEmitter();
  @Output() draw: any = new EventEmitter();
  @Output() download: any = new EventEmitter();
  @Output() undo: any = new EventEmitter();
  @Output() redo: any = new EventEmitter();

  @ViewChild('canvas') public canvas: ElementRef;

  constructor() {
  }

  drawAction(action: IDrawData) {
    // 1. Prepare the data
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;

    if (canvas.getContext) {
      this.ctx = canvas.getContext('2d');

      // 2. Trigger draw action
      this.draw.emit({ ctx: this.ctx, action: action });
    }

  }

  downloadAction() {
    // 1. Prepare the data
    const canvas: HTMLCanvasElement = this.canvas.nativeElement;

    // 2. Trigger download as image action
    this.download.emit(canvas);
  }

  undoAction() {
    // 1. Trigger undo action
    if (this.ctx) {
      this.undo.emit(this.ctx);
    }
  }

  redoAction() {
    // 1. Trigger redo action
    if (this.ctx) {
      this.redo.emit(this.ctx);
    }
  }

}
