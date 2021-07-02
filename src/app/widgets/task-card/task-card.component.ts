import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {ObjectiveLog} from '../../models/task.model';
import {DevelopmentAreaService} from '../../services/development-area.service';
import {splitKey} from '../../utils/key';
import Color from 'color';
import {ObjectivesService} from '../../services/objectives.service';
import {ObjectiveKey} from '../../services/groups.service';
import {DevelopmentStage} from '../../models/area-value';

@Component({
  selector: 'sspirit-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.sass']
})
export class TaskCardComponent implements OnInit {
  @Input() task?: ObjectiveLog | null;
  @Input() pressable = false;
  @Input() label = 'Seleccionar objetivo';
  @Input() disabled = false;
  @Output() press = new EventEmitter<void>();

  get key(): ObjectiveKey | null {
    return this.task ? ObjectivesService.splitObjective(this.task.objective) : null;
  }

  constructor(private service: ObjectivesService, private areaService: DevelopmentAreaService) {
  }

  get color(): string {
    const area = this.task ? this.service.verifyArea(splitKey(this.task.objective)[1]) : null;
    const color = this.task && area ?
      this.areaService.getArea(area).color :
      Color('#5D24FF');
    return color.toString();
  }

  get shadowColor(): string {
    const color = Color(this.color).alpha(0.23);
    return color.toString();
  }

  get areaName(): string {
    const area = this.task ? this.service.verifyArea(splitKey(this.task.objective)[1]) : null;
    return this.task && area ?
      this.areaService.getArea(area).name :
      'Sin definir';
  }

  ngOnInit(): void {
  }

  getStageName(stage: DevelopmentStage): string {
    return this.service.getStage(stage).name;
  }

  getTaskLabel(task: ObjectiveLog): string {
    return task['personal-objective']?.length ? task['personal-objective'] : task['original-objective'];
  }

  isPersonal(task: ObjectiveLog): boolean {
    return !!task['personal-objective'];
  }
}
