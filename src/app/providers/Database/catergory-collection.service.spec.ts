import { TestBed } from '@angular/core/testing';

import { CatergoryCollectionService } from './catergory-collection.service';

describe('CatergoryCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CatergoryCollectionService = TestBed.get(CatergoryCollectionService);
    expect(service).toBeTruthy();
  });
});
