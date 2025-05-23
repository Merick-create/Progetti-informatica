import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtleteComponentComponent } from './atlete-component.component';

describe('AtleteComponentComponent', () => {
  let component: AtleteComponentComponent;
  let fixture: ComponentFixture<AtleteComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AtleteComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtleteComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
