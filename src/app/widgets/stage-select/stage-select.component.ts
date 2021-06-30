import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {DevelopmentStage} from '../../models/area-value';
import {SelectButtonItem} from '../select-buttons/select-buttons.component';
import {ObjectivesService} from '../../services/objectives.service';

@Component({
  selector: 'sspirit-stage-select',
  templateUrl: './stage-select.component.html',
  styleUrls: ['./stage-select.component.sass']
})
export class StageSelectComponent implements OnInit {
  @Input() label = 'Selecciona una etapa';
  @Input() value: DevelopmentStage | null = null;
  @Output() valueChange = new EventEmitter<DevelopmentStage | null>();
  stages = this.service.queryStages();
  options: SelectButtonItem[] = this.stages.map(stage => ({
    label: stage.name,
    id: stage.stage
  }));

  constructor(private service: ObjectivesService) {
  }

  ngOnInit(): void {
  }

  emit(stageId: string): void {
    this.valueChange.emit(stageId as DevelopmentStage);
  }
}
