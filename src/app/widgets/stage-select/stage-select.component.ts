import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {DevelopmentStage} from '../../models/area-value';

@Component({
  selector: 'sspirit-stage-select',
  templateUrl: './stage-select.component.html',
  styleUrls: ['./stage-select.component.sass']
})
export class StageSelectComponent implements OnInit {
  @Input() value: DevelopmentStage | null = null;
  @Output() valueChange = new EventEmitter<DevelopmentStage | null>();

  constructor() { }

  ngOnInit(): void {
  }

}
