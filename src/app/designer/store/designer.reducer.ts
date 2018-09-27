import { IDrawData } from './../models/designer.models';
import { Action } from '@ngrx/store';
import { DesignerActions, DesignerActionTypes } from './designer.actions';

export interface IDesignerState {
  enableEdit: Boolean;
  formData: IDrawData;

  actions: IDrawData[];
  latestRemovedActions: IDrawData[];

  canvasData: IDrawData;
}

export const initialState: IDesignerState = {
  enableEdit: true,
  formData: undefined,

  actions: [],
  latestRemovedActions: [],

  canvasData: undefined
};

export function reducer(state = initialState, action: DesignerActions): IDesignerState {
  switch (action.type) {

    case DesignerActionTypes.LoadDesigners:
      return state;

    case DesignerActionTypes.UPDATE_FORM: {
      const { payload: formData } = action;

      return {
        ...state,
        actions: [
          ...state.actions,
          formData
        ],
        formData: {
          ...formData
        },
        latestRemovedActions: []
      };
    }

    case DesignerActionTypes.DRAW_IMGAE: {
      const { payload: canvasData } = action;

      return {
        ...state,
        canvasData: {
          ...canvasData
        }
      };
    }

    case DesignerActionTypes.REMOVE_LATEST_UNDO_ACTION: {
      const { payload: updatedActions = [] } = action;

      return {
        ...state,
        actions: [
          ...updatedActions
        ]
      };
    }

    case DesignerActionTypes.SAVE_LATEST_UNDO_ACTION: {
      const { payload: removedAction } = action;

      return {
        ...state,
        latestRemovedActions: [
          ...state.latestRemovedActions,
          removedAction
        ]
      };
    }

    case DesignerActionTypes.REDO_DRAW_ACTION: {
      const { latestRemovedActions = [] } = state;

      const actionToRedo = latestRemovedActions.pop();

      return {
        ...state,
        actions: [
          ...state.actions,
          ...(actionToRedo ? [actionToRedo] : [])
        ],
        latestRemovedActions: [
          ...latestRemovedActions
        ]
      };
    }


    default:
      return state;
  }
}
