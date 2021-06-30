import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unit} from '../../models/area-value';
import {ObjectivesService, UnitDisplay} from '../../services/objectives.service';
import {SelectButtonItem} from '../select-buttons/select-buttons.component';

@Component({
  selector: 'sspirit-unit-select',
  templateUrl: './unit-select.component.html',
  styleUrls: ['./unit-select.component.sass']
})
export class UnitSelectComponent implements OnInit {
  @Input() label: string | null = null;
  @Input() value: Unit | null = null;
  @Output() valueChange = new EventEmitter<Unit | null>();

  units: UnitDisplay[] = this.service.queryUnits();
  options: SelectButtonItem[] = this.units.map(unit => ({
    label: unit.plural,
    icon: unit.unit,
    id: unit.unit
  }));

  constructor(private service: ObjectivesService) {
  }

  ngOnInit(): void {
  }

  emit($event: string): void {
    this.valueChange.emit($event as Unit);
  }
}
