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

  @ViewChild('chartCPU') canvas24: ElementRef | undefined;
  @Input() konnektor: any;

  konnektors: any[] = [];
  ctx: any;

  constructor(
    private konnektorService: KonnektorService,
    private dataService: DataService
  ) {
    this.canvasRAM = new QueryList<ElementRef>();
  }

  ngAfterViewInit(): void {
    console.log('canvasRAM QueryList', this.canvasRAM);
    this.canvasRAM.forEach((elementRef: ElementRef) => {
      this.ctx = elementRef.nativeElement.getContext('2d');
      console.log('ctx', this.ctx);
    });

    console.log('Konnektor', this.konnektor);

    let gradientRAM = this.ctx.createLinearGradient(0, 0, 135, 135); // x,y,w,h
    let gradientCPU = this.ctx.createLinearGradient(0, 0, 135, 135); // x,y,w,h
    gradientRAM?.addColorStop(0, 'rgba(0, 255, 0, 1)');
    gradientRAM?.addColorStop(0.6, 'rgba(255, 255, 0, 1)');
    gradientRAM?.addColorStop(1, 'rgba(255, 0, 0, 1)');
    gradientCPU?.addColorStop(0, 'rgba(0, 255, 0, 1)');
    gradientCPU?.addColorStop(0.6, 'rgba(255, 255, 0, 1)');
    gradientCPU?.addColorStop(1, 'rgba(255, 0, 0, 1)');

    this.konnektorService.drawRamChart(gradientRAM, this.konnektor);
    this.konnektorService.drawRam24Chart(this.konnektor);
    this.konnektorService.drawRam7Chart();
    this.konnektorService.drawRam30Chart();

    this.konnektorService.drawCpuChart(96, gradientCPU);
    this.konnektorService.drawCpu24Chart();
    this.konnektorService.drawCpu7Chart();
    this.konnektorService.drawCpu30Chart();
  }
}
