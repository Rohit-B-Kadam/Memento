import { TestBed } from '@angular/core/testing';

import { EventStatusInfoService } from './event-status-info.service';

describe('EventStatusInfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventStatusInfoService = TestBed.get(EventStatusInfoService);
    expect(service).toBeTruthy();
  });
});
