import { Injectable } from '@angular/core';
import {DevelopmentArea} from '../models/area-value';

export interface AreaDisplay {
  area: DevelopmentArea;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DevelopmentAreaService {
  private data: Record<DevelopmentArea, AreaDisplay> = {
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
  constructor() { }

  public getArea(area: DevelopmentArea): AreaDisplay {
    return this.data[area];
  }
}
