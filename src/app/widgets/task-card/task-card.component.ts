import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../models/task.model';
import {DevelopmentAreaService} from '../../services/development-area.service';
import {splitKey} from '../../utils/key';
import {DevelopmentArea} from '../../models/area-value';
import Color from 'color';

@Component({
  selector: 'sspirit-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent implements OnInit {
  @Input() task?: Task | null;

  get color(): string {
    const color = this.task ?
      this.areaService.getArea(splitKey(this.task.objective)[0] as DevelopmentArea).color :
      Color('#5D24FF');
    return color.toString();
  }

  get areaName(): string {
    return this.task ?
      this.areaService.getArea(splitKey(this.task.objective)[0] as DevelopmentArea).name :
      'Sin definir';
  }

  constructor(private areaService: DevelopmentAreaService) {
  }

  ngOnInit(): void {
  }

}
