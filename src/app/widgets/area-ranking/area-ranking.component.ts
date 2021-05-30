import {Component, Input, OnInit} from '@angular/core';
import {DevelopmentArea} from '../../models/area-value';
import {AreaDisplay, DevelopmentAreaService} from '../../services/development-area.service';

@Component({
  selector: 'sspirit-area-ranking',
  templateUrl: './area-ranking.component.html',
  styleUrls: ['./area-ranking.component.sass']
})
export class AreaRankingComponent implements OnInit {
  @Input() rankingAreas: DevelopmentArea[] = [];

  constructor(private service: DevelopmentAreaService) { }

  ngOnInit(): void {
  }

  get ranking(): AreaDisplay[] {
    return this.rankingAreas.map(a => this.service.getArea(a));
  }
}
