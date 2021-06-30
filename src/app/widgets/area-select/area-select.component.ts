import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DevelopmentArea} from '../../models/area-value';
import {ObjectivesService} from '../../services/objectives.service';
import {SelectButtonItem} from '../select-buttons/select-buttons.component';

@Component({
  selector: 'sspirit-area-select',
  templateUrl: './area-select.component.html',
  styleUrls: ['./area-select.component.sass']
})
export class AreaSelectComponent implements OnInit {
  @Input() label = 'Selecciona una etapa';
  @Input() value: DevelopmentArea | null = null;
  @Output() valueChange = new EventEmitter<DevelopmentArea | null>();
  stages = this.service.queryAreas();
  options: SelectButtonItem[] = this.stages.map(stage => ({
    label: stage.name,
    id: stage.area
  }));

  constructor(private service: ObjectivesService) {
  }

  ngOnInit(): void {
  }

  emit(areaId: string): void {
    this.valueChange.emit(areaId as DevelopmentArea);
  }
}
