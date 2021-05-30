import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {Chart, ChartDataset} from 'chart.js';
import {DateTime} from 'luxon';
import {AppError} from '../../errors/app.error';

@Component({
  selector: 'sspirit-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.sass']
})
export class LinearChartComponent implements OnInit, AfterViewInit {
  @Input() values: Record<string, Record<number, number>> = {};
  @Input() colors: string[] = ['red', 'blue', 'green'];
  @Input() aspectRatio: number = 16 / 9;
  @Input() keyStep = 24 * 60 * 60 * 1000;

  @ViewChild('canvas') canvas?: ElementRef<HTMLCanvasElement>;

  width = 400;
  height = 400;

  chart?: Chart;

  constructor() {
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
    return {
      label,
      data: keys.map(e => dataset[e] ?? 0),
      borderWidth: 1,
      borderColor: border,
      backgroundColor: background,
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
    const labels = Object.keys(this.values);
    const allKeys: number[] = [...new Set(Object.values(this.values)
      .map(value => Object.keys(value).map(a => parseInt(a, 10)))
      .reduce((prev, a) => [...prev, ...a])
      .sort((a, b) => a - b)
    )];
    const base = Math.min(...allKeys);
    const max = Math.max(...allKeys);

    let key: number;

    const keys: number[] = [];
    for (key = base; key <= max; key += this.keyStep) {
      keys.push(key);
    }

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: keys.map(k => DateTime.fromMillis(k).toSQLDate()),
        datasets: labels.map((label, index) => {
          return this.toDataset(keys, label, this.values[label], this.colors[index], this.colors[index]);
        })
      },
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
