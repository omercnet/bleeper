import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Device } from '../services/data.service';

@Component({
  selector: 'app-view-device',
  templateUrl: './view-device.page.html',
  styleUrls: ['./view-device.page.scss'],
})
export class ViewDevicePage implements OnInit {
  public device: Device;

  constructor(
    public data: DataService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.device = this.data.getDeviceById(id);
  }
}
