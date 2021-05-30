import {Component, Input, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DevelopmentArea, Unit} from '../../models/area-value';
import {DomSanitizer} from '@angular/platform-browser';
import {ThemePalette} from '@angular/material/core/common-behaviors/color';

@Component({
  selector: 'sspirit-area-icon',
  templateUrl: './area-icon.component.html',
  styleUrls: ['./area-icon.component.sass']
})
export class AreaIconComponent implements OnInit {
  @Input() unit: Unit = 'scouts';
  @Input() area: DevelopmentArea | null = null;
  @Input() color: ThemePalette | null = 'primary';

  get name(): string {
    return `${this.unit}-${this.area}`;
  }

  constructor(private registry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    const units: Unit[] = ['guides', 'scouts'];
    const areas: DevelopmentArea[] = ['corporality', 'creativity', 'character', 'sociability', 'spirituality', 'affectivity'];

    let unit: Unit;
    for (unit of units) {
      let area: DevelopmentArea;
      for (area of areas) {
        const name = `${unit}-${area}`;
        const url = this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${name}.svg`);
        this.registry.addSvgIcon(name, url);
      }
    }
  }

  ngOnInit(): void {
  }

}
