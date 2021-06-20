import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ViewDevicePageRoutingModule } from './view-device-routing.module';

import { ViewDevicePage } from './view-device.page';

describe('ViewDevicePage', () => {
  let component: ViewDevicePage;
  let fixture: ComponentFixture<ViewDevicePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDevicePage ],
      imports: [IonicModule.forRoot(), ViewDevicePageRoutingModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDevicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
