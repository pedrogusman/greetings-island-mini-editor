import { IDrawData } from './../../models/designer.models';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

declare const CanvasRenderingContext2D: any;

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
    this.setRenderText();
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

  setRenderText() {
    if (CanvasRenderingContext2D && !CanvasRenderingContext2D.prototype.renderText) {

      CanvasRenderingContext2D.prototype.renderText = function (text, x, y, letterSpacing) {
        if (!text || typeof text !== 'string' || text.length === 0) {
          return;
        }

        if (typeof letterSpacing === 'undefined') {
          letterSpacing = 0;
        }

        // letterSpacing of 0 means normal letter-spacing

        let characters = String.prototype.split.call(text, ''),
          index = 0,
          current,
          currentPosition = x,
          align = 1;

        if (this.textAlign === 'right') {
          characters = characters.reverse();
          align = -1;
        } else if (this.textAlign === 'center') {
          let totalWidth = 0;
          for (let i = 0; i < characters.length; i++) {
            totalWidth += (this.measureText(characters[i]).width + letterSpacing);
          }
          currentPosition = x - (totalWidth / 2);
        }

        while (index < text.length) {
          current = characters[index++];
          this.fillText(current, currentPosition, y);
          currentPosition += (align * (this.measureText(current).width + letterSpacing));
        }
      };
    }
  }


}
