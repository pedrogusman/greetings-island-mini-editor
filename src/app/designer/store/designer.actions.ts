import { Action } from '@ngrx/store';

export enum DesignerActionTypes {
  LoadDesigners = '[Designer] Load Designers',
  UPDATE_FORM = '[Designer] UPDATE_FORM',

  DRAW_IMGAE = '[Designer] DRAW_IMGAE',
  DOWNLOAD_IMAGE = '[Designer] DOWNLOAD_IMAGE',
  UNDO_DRAW_ACTION = '[Designer] UNDO_DRAW_ACTION',
  REMOVE_LATEST_UNDO_ACTION = '[Designer] REMOVE_LATEST_UNDO_ACTION',
  SAVE_LATEST_UNDO_ACTION = '[Designer] SAVE_LATEST_UNDO_ACTION',
  REDO_DRAW_ACTION = '[Designer] REDO_DRAW_ACTION'
}

export class LoadDesigners implements Action {
  readonly type = DesignerActionTypes.LoadDesigners;
}

export class UpdateForm implements Action {
  readonly type = DesignerActionTypes.UPDATE_FORM;
  constructor(public payload: any) { }
}

export class DrawImage implements Action {
  readonly type = DesignerActionTypes.DRAW_IMGAE;
  constructor(public payload: any) { }
}

export class DownloadImage implements Action {
  readonly type = DesignerActionTypes.DOWNLOAD_IMAGE;
  constructor(public payload: any) { }
}

export class UndoDrawAction implements Action {
  readonly type = DesignerActionTypes.UNDO_DRAW_ACTION;
  constructor(public payload: any) { }
}

export class RemoveLatestUndoAction implements Action {
  readonly type = DesignerActionTypes.REMOVE_LATEST_UNDO_ACTION;
  constructor(public payload: any) { }
}

export class SaveLatestUndoAction implements Action {
  readonly type = DesignerActionTypes.SAVE_LATEST_UNDO_ACTION;
  constructor(public payload: any) { }
}

export class RedoDrawAction implements Action {
  readonly type = DesignerActionTypes.REDO_DRAW_ACTION;
  constructor(public payload: any) { }
}

export type DesignerActions =
  | LoadDesigners
  | UpdateForm
  | DrawImage
  | DownloadImage
  | UndoDrawAction
  | RemoveLatestUndoAction
  | SaveLatestUndoAction
  | RedoDrawAction
  | any;
