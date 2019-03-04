import { TestBed } from '@angular/core/testing';

import { EventTypeCollectionService } from './event-type-collection.service';

describe('EventTypeCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventTypeCollectionService = TestBed.get(EventTypeCollectionService);
    expect(service).toBeTruthy();
  });
});
