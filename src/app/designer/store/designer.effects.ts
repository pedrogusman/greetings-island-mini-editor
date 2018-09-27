import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { DesignerActionTypes } from './designer.actions';
import { map, withLatestFrom, tap } from 'rxjs/operators';
import * as fromDesigner from './../store';
import { IDrawData } from '../models/designer.models';
import { Store } from '@ngrx/store';
import { IAppState } from '../../reducers';

@Injectable()
export class DesignerEffects {

  @Effect()
  loadFoos$ = this.actions$.pipe(ofType(DesignerActionTypes.LoadDesigners));

  @Effect({ dispatch: false })
  drawAction = this.actions$
    .ofType(fromDesigner.DesignerActionTypes.DRAW_IMGAE)
    .pipe(
      map((action: fromDesigner.DrawImage) => action.payload),
      tap((data: { ctx: CanvasRenderingContext2D, action: IDrawData }) => {
        // 1. Data restructure
        const {
          ctx,
          action: {
            text,
            fontSize,
            fontFamily,
            fontColor,
            xPosition,
            yPosition
          }
        } = data;

        // 2. Set properties and draw
        {
          // save state
          ctx.save();

          // font size and font family
          ctx.font = `${fontSize}px ${fontFamily}`;

          // color hex values
          ctx.fillStyle = `#${fontColor}`;

          // text and position
          ctx.fillText(text, xPosition, yPosition);
        }
      })
    );

  @Effect({ dispatch: false })
  downloadImage = this.actions$
    .ofType(fromDesigner.DesignerActionTypes.DOWNLOAD_IMAGE)
    .pipe(
      map((action: fromDesigner.DownloadImage) => action.payload),
      tap((canvas: HTMLCanvasElement) => {
        // 1. Set as image and save
        {
          const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
          const link = document.createElement('a');
          link.download = 'my-image.png';
          link.href = image;
          link.click();
        }
      })
    );

  @Effect({ dispatch: false })
  undoDrawAction = this.actions$
    .ofType(fromDesigner.DesignerActionTypes.UNDO_DRAW_ACTION)
    .pipe(
      map((action: fromDesigner.UndoDrawAction) => action.payload),
      withLatestFrom(this.store.select(fromDesigner.getDrawActions)),
      map((states: [CanvasRenderingContext2D, IDrawData[]]) => {
        const { [0]: ctx, [1]: drawActions } = states;

        // 1. Clear Canvas
        {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, 500, 700);
          ctx.restore();
        }

        // 2. RedrawAll
        {
          // 2.1. Remove last action
          const removedAction = drawActions.pop();
          this.store.dispatch(new fromDesigner.RemoveLatestUndoAction(drawActions));

          // 2.2. Redraw all actions
          drawActions.forEach((action) => {
            this.store.dispatch(new fromDesigner.DrawImage({ ctx, action }));
          });

          // 2.3. Save last undo actions
          this.store.dispatch(new fromDesigner.SaveLatestUndoAction(removedAction));
        }

      })
    );

  @Effect({ dispatch: false })
  redoDrawAction = this.actions$
    .ofType(fromDesigner.DesignerActionTypes.REDO_DRAW_ACTION)
    .pipe(
      map((action: fromDesigner.RedoDrawAction) => action.payload),
      withLatestFrom(this.store.select(fromDesigner.getDrawActions)),
      map((states: [CanvasRenderingContext2D, IDrawData[]]) => {
        const { [0]: ctx, [1]: updatedActions } = states;
        const { [updatedActions.length - 1]: actionToRedo } = updatedActions;

        // 2. Redraw Latest
        {
          // Save redo action and trigger draw action
          this.store.dispatch(new fromDesigner.DrawImage({ ctx, action: actionToRedo }));
        }

      })
    );

  constructor(
    private actions$: Actions,
    private store: Store<IAppState>,
  ) { }
}
