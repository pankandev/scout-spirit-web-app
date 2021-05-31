import {Injectable} from '@angular/core';
import {DevelopmentArea, Unit} from '../models/area-value';
import Color from 'color';

interface AreaDisplayLabel {
  area: DevelopmentArea;
  name: string;
}

export interface AreaDisplay extends AreaDisplayLabel {
  color: Color;
}

@Injectable({
  providedIn: 'root'
})
export class DevelopmentAreaService {
  private data: Record<DevelopmentArea, AreaDisplayLabel> = {
    affectivity: {
      area: 'affectivity',
      name: 'Afectividad'
    },
    character: {
      area: 'character',
      name: 'Carácter'
    },
    corporality: {
      area: 'corporality',
      name: 'Corporalidad'
    },
    creativity: {
      area: 'creativity',
      name: 'Creatividad'
    },
    sociability: {
      area: 'sociability',
      name: 'Sociabilidad'
    },
    spirituality: {
      area: 'spirituality',
      name: 'Espiritualidad'
    }
  };

  private colors: Record<Unit, Record<DevelopmentArea, Color>> = {
    scouts: {
      corporality: Color('#AEAEAE'),
      creativity: Color('#923B89'),
      character: Color('#6BD9D6'),
      affectivity: Color('#D62E6A'),
      sociability: Color('#000000'),
      spirituality: Color('#6FCF34')
    },
    guides: {
      corporality: Color('#6FCF34'),
      creativity: Color('#F3732B'),
      character: Color('#923B89'),
      affectivity: Color('#6BD9D6'),
      sociability: Color('#F0D961'),
      spirituality: Color('#0F5D89')
    }
  };

  constructor() {
  }

  public getArea(area: DevelopmentArea, unit: Unit = 'scouts'): AreaDisplay {
    return {
      area: this.data[area].area,
      name: this.data[area].name,
      color: this.colors[unit][area]
    };
  }
}
