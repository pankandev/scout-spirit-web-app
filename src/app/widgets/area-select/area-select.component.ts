import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DevelopmentArea} from '../../models/area-value';
import {ObjectivesService} from '../../services/objectives.service';
import {AreaDisplay, DevelopmentAreaService} from '../../services/development-area.service';

@Component({
  selector: 'sspirit-area-select',
  templateUrl: './area-select.component.html',
  styleUrls: ['./area-select.component.sass']
})
export class AreaSelectComponent implements OnInit {
  @Input() value: DevelopmentArea | null = null;
  @Output() valueChange = new EventEmitter<DevelopmentArea | null>();

  areas: AreaDisplay[];

  constructor(private service: ObjectivesService, private areaService: DevelopmentAreaService) {
    this.areas = this.areaService.query();
  }

  ngOnInit(): void {
  }

}
