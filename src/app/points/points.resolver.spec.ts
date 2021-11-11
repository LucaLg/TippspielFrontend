import { TestBed } from '@angular/core/testing';

import { PointsResolver } from './points.resolver';

describe('PointsResolver', () => {
  let resolver: PointsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(PointsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
