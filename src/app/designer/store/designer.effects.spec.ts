import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { DesignerEffects } from './designer.effects';

describe('DesignerEffects', () => {
  let actions$: Observable<any>;
  let effects: DesignerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DesignerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(DesignerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
