import { IAppState } from '../../reducers';
import { createSelector } from '@ngrx/store';
import { IDesignerState } from './designer.reducer';

export const getDesigner = (state: IAppState) => state.designer;

export const getFormData = createSelector(
  getDesigner,
  (funz: IDesignerState) => funz.formData
);

export const getCanvasData = createSelector(
  getDesigner,
  (funz: IDesignerState) => funz.canvasData
);

export const getDrawActions = createSelector(
  getDesigner,
  (funz: IDesignerState) => funz.actions
);

export const getLatestRemovedActions = createSelector(
  getDesigner,
  (funz: IDesignerState) => funz.latestRemovedActions
);

