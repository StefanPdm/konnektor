import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  QueryList,
  Query,
  Input,
  ViewChildren,
} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { KonnektorService } from 'src/app/services/konnektor.service';

@Component({
  selector: 'app-konnektor-details',
  templateUrl: './konnektor-details.component.html',
  styleUrls: ['./konnektor-details.component.scss'],
})
export class KonnektorDetailsComponent implements AfterViewInit {
  @ViewChildren('dynamicRamCanvas', { read: ElementRef })
  canvasRAM!: QueryList<ElementRef>;

  @ViewChildren('dynamicCpuCanvas', { read: ElementRef })
  canvasCPU!: QueryList<ElementRef>;

  @Input() konnektor: any;

  konnektors: any[] = [];
  ctxRAM: any;
  ctxCPU: any;
  status: any;

  constructor(
    private konnektorService: KonnektorService,
    private dataService: DataService
  ) {
    this.canvasRAM = new QueryList<ElementRef>();
    this.canvasCPU = new QueryList<ElementRef>();
    this.status = true;
  }

  ngAfterViewInit(): void {
    this.canvasRAM.forEach((elementRef: ElementRef) => {
      this.ctxRAM = elementRef.nativeElement.getContext('2d');
    });
    this.canvasCPU.forEach((elementRef: ElementRef) => {
      this.ctxCPU = elementRef.nativeElement.getContext('2d');
    });

    this.status = this.konnektor.is_active;

    let gradientRAM = this.ctxRAM.createLinearGradient(0, 0, 135, 135); // x,y,w,h
    let gradientCPU = this.ctxCPU.createLinearGradient(0, 0, 135, 135); // x,y,w,h

    gradientRAM?.addColorStop(0, 'rgba(0, 255, 0, 1)');
    gradientRAM?.addColorStop(0.6, 'rgba(255, 255, 0, 1)');
    gradientRAM?.addColorStop(1, 'rgba(255, 0, 0, 1)');
    gradientCPU?.addColorStop(0, 'rgba(0, 255, 0, 1)');
    gradientCPU?.addColorStop(0.6, 'rgba(255, 255, 0, 1)');
    gradientCPU?.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this.konnektorService.drawRamChart(gradientRAM, this.konnektor);
    this.konnektorService.drawRam24Chart(this.konnektor);
    this.konnektorService.drawRam7Chart(this.konnektor);
    this.konnektorService.drawRam30Chart(this.konnektor);

    this.konnektorService.drawCpuChart(gradientCPU, this.konnektor);
    this.konnektorService.drawCpu24Chart(this.konnektor);
    this.konnektorService.drawCpu7Chart(this.konnektor);
    this.konnektorService.drawCpu30Chart(this.konnektor);
  }

  onChangeStatus() {
    this.konnektor.is_active = !this.konnektor.is_active;
  }
}
