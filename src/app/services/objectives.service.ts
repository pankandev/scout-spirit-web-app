import {Injectable} from '@angular/core';
import prepubertyObjectives from '../../assets/resources/objectives/prepuberty.json';
import pubertyObjectives from '../../assets/resources/objectives/puberty.json';
import _linesNames from '../../assets/resources/lines.json';
import {Objective} from '../models/objective.model';
import {DevelopmentArea, DevelopmentStage, Unit} from '../models/area-value';
import {AreaDisplay, DevelopmentAreaService} from './development-area.service';
import {AppError} from '../errors/app.error';
import {ObjectiveLog} from '../models/task.model';
import {joinKey, splitKey} from '../utils/key';
import {mapKeys} from '../utils/map';
import {ObjectiveKey} from './groups.service';

export interface UnitDisplay {
  unit: Unit;
  single: string;
  plural: string;
}

export interface StageDisplay {
  stage: DevelopmentStage;
  name: string;
}

export interface LineGroup {
  line: string;
  tasks: ObjectiveLog[];
}

export interface AreaGroup {
  area: DevelopmentArea;
  group: LineGroup[];
}

@Injectable({
  providedIn: 'root'
})
export class ObjectivesService {
  constructor(private areasService: DevelopmentAreaService) {
  }

  lines: Record<DevelopmentArea, { name: string }[]> = _linesNames;

  public readonly units: UnitDisplay[] = [
    {unit: 'scouts', single: 'Scout', plural: 'Tropa'},
    {unit: 'guides', single: 'Guía', plural: 'Compañía'}
  ];

  public readonly stages: StageDisplay[] = [
    {stage: 'prepuberty', name: 'Pre-pubertad'},
    {stage: 'puberty', name: 'Pubertad'},
  ];

  get stagesIds(): DevelopmentStage[] {
    return this.stages.map(s => s.stage);
  }

  public readonly areas: DevelopmentArea[] = this.areasService.areas;

  private readonly data: Record<DevelopmentStage, Record<DevelopmentArea, string[][]>> = {
    prepuberty: prepubertyObjectives,
    puberty: pubertyObjectives
  };

  static transform(text: string, unit: Unit = 'scouts'): string {
    return text
      .replace(/{OsAs}/g, unit === 'guides' ? 'as' : 'os')
      .replace(/{OA}/g, unit === 'guides' ? 'a' : 'o')
      .replace(/{GuiaScout}/g, unit === 'guides' ? 'Guía' : 'Scout')
      .replace(/{GuiasScouts}/g, unit === 'guides' ? 'Guías' : 'Scouts')
      .replace(/{Unidad}/g, unit === 'guides' ? 'Compañía' : 'Tropa')
      .replace(/{MyGender}/g, unit === 'guides' ? 'mujer' : 'hombre')
      .replace(/{OtherGender}/g, unit === 'guides' ? 'hombre' : 'mujer')
      .replace(/{LibroDePatrulla}/g, 'Libro de Patrulla');
  }

  private static joinObjective(key: ObjectiveKey): string {
    return joinKey(key.stage, key.area, [key.line, key.subline].join('.'));
  }

  public static splitObjective(objective: string): ObjectiveKey {
    const [stage, area, lineSubline] = splitKey(objective);
    const [line, subline] = lineSubline.split('.').map(l => parseInt(l, 10) + 1);
    return {
      area: area as DevelopmentArea,
      stage: stage as DevelopmentStage,
      line,
      subline
    };
  }

  get(stage: DevelopmentStage, area: DevelopmentArea, line: number, subLine: number, unit: Unit = 'scouts'): Objective {
    const content = this.data[stage][area][line][subLine];
    return {area, content: ObjectivesService.transform(content, unit), line, stage, subline: subLine};
  }

  queryLine(stage: DevelopmentStage, area: DevelopmentArea, line: number, unit: Unit = 'scouts'): Objective[] {
    const contents = this.data[stage][area][line];
    return contents.map((content, subline) => this.get(stage, area, line, subline, unit));
  }

  queryArea(stage: DevelopmentStage, area: DevelopmentArea, unit: Unit = 'scouts'): Objective[] {
    const objectives = this.data[stage][area].map((_, line) => this.queryLine(stage, area, line, unit));
    return objectives.reduce((prev, o) => [...prev, ...o], []);
  }

  queryStage(stage: DevelopmentStage, unit: Unit = 'scouts'): Objective[] {
    const objectives = Object.keys(this.data[stage]).map((area: string) => this.queryArea(stage, area as DevelopmentArea, unit));
    return objectives.reduce((prev, o) => [...prev, ...o], []);
  }

  verifyStage(stage: string): DevelopmentStage | null {
    return this.stagesIds.find(s => s === stage) ?? null;
  }

  verifyArea(area: string): DevelopmentArea | null {
    return this.areas.find(s => s === area) ?? null;
  }

  verifyUnit(unit: string): Unit | null {
    return this.units.find(s => unit === s.unit)?.unit ?? null;
  }

  getUnit(unit: Unit): UnitDisplay {
    const display = this.units.find(u => u.unit === unit);
    if (!display) {
      throw new AppError(`No unit found '${unit}'`);
    }
    return display;
  }

  queryUnits(): UnitDisplay[] {
    return [...this.units];
  }

  getStage(stage: DevelopmentStage): StageDisplay {
    const found = this.stages.find(s => s.stage === stage);
    if (!found) {
      throw new AppError(`Stage ${stage} not found`);
    }
    return found;
  }

  getArea(area: DevelopmentArea, unit: Unit = 'scouts'): AreaDisplay {
    return this.areasService.getArea(area, unit);
  }

  query(stage: DevelopmentStage | null = null, area: DevelopmentArea | null = null, unit: Unit = 'scouts'): Objective[] {
    return this.stagesIds
      .map(s => this.queryStage(s, unit))
      .reduce((prev, objs) => [...prev, ...objs], [] as Objective[])
      .filter(l => (!area || l.area === area) && (!stage || l.stage === stage));
  }

  queryAll(unit: Unit = 'scouts'): Objective[] {
    return this.stagesIds
      .map(stage => this.queryStage(stage, unit))
      .reduce((prev, objs) => [...prev, ...objs], [] as Objective[]);
  }

  objectiveToTask(objective: ObjectiveKey, unit: Unit | null = 'scouts'): ObjectiveLog {
    const obj = this.get(objective.stage, objective.area, objective.line, objective.subline);
    return {
      completed: false,
      created: 0,
      objective: ObjectivesService.joinObjective(objective),
      originalObjective: unit ? ObjectivesService.transform(obj.content, unit) : obj.content,
      personalObjective: unit ? ObjectivesService.transform(obj.content, unit) : obj.content,
      tasks: []
    };
  }

  groupTasks(tasks: ObjectiveLog[]): AreaGroup[] {
    const mapped = mapKeys(this.lines, (descriptions, area) =>
      descriptions
        .map((l, index) => ({
          line: `${index}. ${l.name}`,
          tasks: tasks.filter(task => {
            const key = ObjectivesService.splitObjective(task.objective);
            return key.area === area && key.line === index;
          })
        }))
        .filter(a => a.tasks.length > 0)
    );
    return this.areas
      .map(area => ({area, group: mapped[area]}))
      .filter(a => a.group.length > 0);
  }

  getAreasAll(): AreaDisplay[] {
    return this.areas.map(a => this.getArea(a));
  }

  queryStages(): StageDisplay[] {
    return [...this.stages];
  }

  queryAreas(unit: Unit = 'scouts'): AreaDisplay[] {
    return this.areasService.query(unit);
  }
}
