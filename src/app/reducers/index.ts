import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromDesigner from './../designer/store';


export interface IAppState {
  designer?: fromDesigner.IDesignerState;
}

export const reducers: ActionReducerMap<IAppState> = {
  designer: fromDesigner.reducer
};


export const metaReducers: MetaReducer<IAppState>[] = !environment.production ? [] : [];
