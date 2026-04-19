import { TestBed } from '@angular/core/testing';
import { Apollo } from 'apollo-angular';

import { Medicine } from './medicine';

describe('Medicine', () => {
  let service: Medicine;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: Apollo, useValue: {} }],
    });
    service = TestBed.inject(Medicine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
