import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DevelopmentArea} from '../../models/area-value';
import {AreaDisplay, DevelopmentAreaService} from '../../services/development-area.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'sspirit-area-ranking',
  templateUrl: './area-ranking.component.html',
  styleUrls: ['./area-ranking.component.sass']
})
export class AreaRankingComponent implements OnInit, OnChanges {
  @Input() rankingAreas: DevelopmentArea[] = [];

  constructor(private service: DevelopmentAreaService, private router: Router, private route: ActivatedRoute) {
  }

  ranking: AreaDisplay[] = [];

  ngOnInit(): void {
    this.updateRanking();
  }

  updateRanking(): void {
    this.ranking = this.rankingAreas.map(a => this.service.getArea(a));
  }

  async seeDetails(): Promise<void> {
    await this.router.navigate(['details'], {relativeTo: this.route});
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateRanking();
  }
}
