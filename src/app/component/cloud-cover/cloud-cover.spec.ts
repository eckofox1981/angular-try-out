import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudCover } from './cloud-cover';

describe('CloudCover', () => {
  let component: CloudCover;
  let fixture: ComponentFixture<CloudCover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloudCover]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudCover);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
