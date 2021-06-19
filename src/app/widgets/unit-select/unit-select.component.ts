import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unit} from '../../models/area-value';
import {ObjectivesService, UnitDisplay} from '../../services/objectives.service';

@Component({
  selector: 'sspirit-unit-select',
  templateUrl: './unit-select.component.html',
  styleUrls: ['./unit-select.component.sass']
})
export class UnitSelectComponent implements OnInit {
  @Input() value: Unit | null = null;
  @Output() valueChange = new EventEmitter<Unit | null>();

  units: UnitDisplay[] = this.service.queryUnits();

  constructor(private service: ObjectivesService) {
  }

  ngOnInit(): void {
  }
}
