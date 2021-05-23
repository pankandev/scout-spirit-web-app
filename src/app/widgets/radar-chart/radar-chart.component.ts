import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  HostListener,
  OnInit,
  ViewChild,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {AreaValue} from '../../models/area-value';
import {AppError} from '../../errors/app.error';

@Component({
  selector: 'sspirit-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.sass']
})
export class RadarChartComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() {
  }

  @Input() values: AreaValue<number> = {
    affectivity: 0,
    character: 0,
    corporality: 0,
    creativity: 0,
    sociability: 0,
    spirituality: 0
  };

  @ViewChild('radar') radarChart: ElementRef<HTMLCanvasElement>;
  @ViewChild('container') container: ElementRef<HTMLDivElement>;

  public canvasContext?: CanvasRenderingContext2D;

  public get initialized(): boolean {
    return !!this.canvasContext;
  }

  public get context(): CanvasRenderingContext2D {
    if (!this.canvasContext) {
      throw new AppError('Trying to use context before initializing');
    }
    return this.canvasContext;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.canvasContext = this.radarChart.nativeElement.getContext('2d');
    this.onResize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.values && this.initialized) {
      this.onResize();
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    const [width, height] = [this.container.nativeElement.clientWidth, this.container.nativeElement.clientHeight];
    this.radarChart.nativeElement.width = width;
    this.radarChart.nativeElement.height = height;
    this.drawChart();
  }

  drawChart(): void {
    const ctx = this.context;

    const values = Object.values(this.values);
    const back = this.drawValues(ctx, values.map(_ => 1));
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.38)';
    ctx.lineWidth = 3;
    ctx.fill(back);
    ctx.stroke(back);

    const front = this.drawValues(ctx, values);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.38)';
    ctx.fill(front);
  }

  drawValues(ctx: CanvasRenderingContext2D, values: number[]): Path2D {
    const [width, height] = [ctx.canvas.width, ctx.canvas.height];
    const center: [number, number] = [width / 2, height / 2];

    const n = values.length;
    const maxValue = Math.max(...values);
    const radius = Math.min(width, height) / 2;

    let idx: number;

    const path = new Path2D();
    for (idx = -1; idx < n; idx++) {
      const angle = (idx / n) * 2 * Math.PI;
      const itemRadius = (values[idx] / maxValue) * radius;

      const [x, y] = [center[0] + itemRadius * Math.cos(angle), center[1] + itemRadius * Math.sin(angle)];
      if (idx < 0) {
        path.moveTo(x, y);
      }
      path.lineTo(x, y);
    }
    path.closePath();
    return path;
  }
}
