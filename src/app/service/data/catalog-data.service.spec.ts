import { TestBed } from '@angular/core/testing';

import { CatalogDataService } from './catalog-data.service';

describe('CatalogDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatalogDataService = TestBed.get(CatalogDataService);
    expect(service).toBeTruthy();
  });
});
