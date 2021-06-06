import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ObjectivesService} from '../../services/objectives.service';
import {DevelopmentArea, DevelopmentStage, Unit} from '../../models/area-value';
import {Observable, combineLatest} from 'rxjs';
import {distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {GroupsService} from '../../services/groups.service';
import {RouteParamsService} from '../../services/route-params.service';
import {Task} from '../../models/task.model';
import {Objective} from '../../models/objective.model';

@Component({
  selector: 'sspirit-summary-details',
  templateUrl: './summary-details.component.html',
  styleUrls: ['./summary-details.component.sass']
})
export class SummaryDetailsComponent implements OnInit {
  stage$: Observable<DevelopmentStage | null>;
  area$: Observable<DevelopmentArea | null>;
  unit$: Observable<Unit | null>;
  areaData$: Observable<Record<string, Record<number, number>>>;
  stageData$: Observable<Record<string, Record<number, number>>>;
  objectives$: Observable<Task[]>;
  filters$: Observable<{ unit: string, area: string, stage: string }>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private routeParams: RouteParamsService,
    private router: Router,
    private objectivesService: ObjectivesService,
    private groupService: GroupsService
  ) {
    this.stage$ = this.activatedRoute.queryParams.pipe(
      map(params => this.objectivesService.verifyStage(params.stage)),
      distinctUntilChanged()
    );
    this.area$ = this.activatedRoute.queryParams.pipe(
      map(params => this.objectivesService.verifyArea(params.area)),
      distinctUntilChanged()
    );
    this.unit$ = this.activatedRoute.queryParams.pipe(
      map(params => this.objectivesService.verifyUnit(params.unit)),
      distinctUntilChanged()
    );
    this.filters$ = combineLatest([this.unit$, this.stage$, this.area$])
      .pipe(
        map(([unit, stage, area]) => {
          return {
            unit: unit ? this.objectivesService.getUnit(unit).plural : 'Todas las unidades',
            stage: stage ? this.objectivesService.getStage(stage).name : 'Todas las etapas',
            area: area ? this.objectivesService.getArea(area).name : 'Todas las áreas'
          };
        })
      );

    this.objectives$ = combineLatest([this.unit$, this.stage$, this.area$])
      .pipe(
        map(([unit, stage, area]) => {
          return this.objectivesService.query(stage, area, unit ?? 'scouts');
        }),
        map((objs: Objective[]) => objs.map((obj: Objective) => {
          return this.objectivesService.objectiveToTask(obj);
        }))
      );
    this.stageData$ = this.unit$.pipe(switchMap(unit => this.groupService.getFilteredLogsStageDataset(unit)));
    this.areaData$ = combineLatest([this.unit$, this.stage$])
      .pipe(
        filter(([unit, stage]) => {
          const filtered = !this.lastFilter
            || unit !== this.lastFilter.unit
            || stage !== this.lastFilter.stage;
          this.lastFilter = {unit, stage};
          return filtered;
        }),
        map(([unit, stage]) => {
          return {unit, stage};
        }),
        switchMap(f => this.groupService.getFilteredLogsAreaDataset(f.unit, f.stage)),
      );
  }

  lastFilter?: { unit: Unit | null, stage: DevelopmentStage | null };
  areaColors = this.objectivesService.getAreasAll().map(a => a.color.toString());

  ngOnInit(): void {
  }

  async close(): Promise<boolean> {
    return await this.router.navigate(['..']);
  }

  async onStageSelect(stage: DevelopmentStage): Promise<void> {
    await this.router.navigate([], {queryParams: {stage}, queryParamsHandling: 'merge'});
  }

  async onAreaSelect(area: DevelopmentArea): Promise<void> {
    await this.router.navigate([], {queryParams: {area}, queryParamsHandling: 'merge'});
  }

  async onUnitSelect(unit: Unit): Promise<void> {
    await this.router.navigate([], {queryParams: {unit}, queryParamsHandling: 'merge'});
  }

  onObjectiveSelect(task: Task): void {
    console.log(task);
  }
}
