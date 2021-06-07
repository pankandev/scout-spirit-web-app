import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Chart, ChartData, ChartDataset} from 'chart.js';
import {DateTime} from 'luxon';
import {AppError} from '../../errors/app.error';
import {keysNumbered, mapNumberedKeys} from '../../utils/map';

@Component({
  selector: 'sspirit-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.sass']
})
export class LinearChartComponent implements OnInit, AfterViewInit, OnChanges {

  constructor() {
  }

  @Input() values: Record<string, Record<number, number>> = {};
  @Input() colors: string[] = ['red', 'blue', 'green'];
  @Input() aspectRatio: number = 16 / 9;
  @Input() keyStep = 24 * 60 * 60 * 1000;
  @Input() cumulated = false;

  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  width = 400;
  height = 400;

  chart?: Chart;

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart) {
      this.chart.data = this.data;
      this.chart.update();
    }
  }

  ngOnInit(): void {
  }

  @HostListener('window:resize')
  onResize(): void {
    if (this.canvas && this.chart) {
      const [width, height] = [this.canvas.nativeElement.parentElement?.clientWidth ?? 0, this.canvas.nativeElement?.clientHeight ?? 0];
      if (height * this.aspectRatio > width) {
        this.width = width;
        this.height = width / this.aspectRatio;
      } else {
        this.width = this.aspectRatio * height;
        this.height = height;
      }
      this.chart.resize(this.width, this.height);
    }
  }

  toDataset(keys: number[], label: string, dataset: Record<number, number>, border: string, background: string): ChartDataset {
    const obj = mapNumberedKeys<number>(
      dataset,
      (k) => this.normalizeKey(k),
      (a, b) => a + b
    );
    let sum = 0;
    return {
      label,
      data: keys.map(k => {
        const value = obj[k] ?? 0;
        if (this.cumulated) {
          sum += value;
          return sum;
        }
        return value;
      }),
      pointStyle: 'line',
      radius: 1,
      borderWidth: 2,
      borderColor: border,
      backgroundColor: background,
    };
  }

  normalizeKey(v: number, useCeil = false): number {
    const fn = useCeil ? Math.ceil : Math.floor;
    return fn(v / this.keyStep) * this.keyStep;
  }

  get keys(): number[] {
    const sourceKeys = Object.keys(this.values).reduce((prev, k) => [...keysNumbered<number>(this.values[k]), ...prev], [] as number[]);
    const base = Math.min(...sourceKeys.map(k => this.normalizeKey(k)));
    const max = this.normalizeKey(Date.now(), true);

    const keys: number[] = [];

    let key: number;
    for (key = base; key <= max; key += this.keyStep) {
      keys.push(this.normalizeKey(key));
    }
    return keys;
  }

  get labels(): string[] {
    return Object.keys(this.values);
  }

  get datasets(): ChartDataset[] {
    return this.labels.map((l, index) => {
      return this.toDataset(this.keys, l, this.values[l], this.colors[index], this.colors[index]);
    });
  }

  get data(): ChartData {
    return {
      labels: this.keys.map(k => DateTime.fromMillis(k).toSQLDate()),
      datasets: this.datasets
    };
  }

  ngAfterViewInit(): void {
    if (!this.canvas) {
      throw new AppError('Canvas not found');
    }
    const ctx = this.canvas.nativeElement.getContext('2d');
    if (!ctx) {
      throw new AppError('2D context not found');
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: this.data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
