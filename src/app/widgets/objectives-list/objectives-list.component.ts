import {Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {ObjectiveLog} from '../../models/task.model';
import {AreaGroup, ObjectivesService} from '../../services/objectives.service';
import {DevelopmentArea} from '../../models/area-value';

@Component({
  selector: 'sspirit-objectives-list',
  templateUrl: './objectives-list.component.html',
  styleUrls: ['./objectives-list.component.sass']
})
export class ObjectivesListComponent implements OnInit, OnChanges {
  @Input() selectable = false;
  @Input() label = 'Seleccionar objetivo';
  @Output() selectTask = new EventEmitter<ObjectiveLog>();

  constructor(private service: ObjectivesService) {
  }

  public groups: AreaGroup[] = [];

  get count(): number {
    return this.groups.reduce((prev, g) => prev + g.group.reduce((p, l) => l.tasks.length, 0), 0);
  }

  @Input() items: ObjectiveLog[] = [];

  getAreaName(area: DevelopmentArea): string {
    return this.service.getArea(area).name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.items) {
      this.group();
    }
  }

  private group(): void {
    this.groups = this.service.groupTasks(this.items);
  }

  ngOnInit(): void {
    this.group();
  }
}
