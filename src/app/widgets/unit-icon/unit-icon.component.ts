import {Component, Input, OnInit} from '@angular/core';
import {Unit} from '../../models/area-value';
import {ThemePalette} from '@angular/material/core/common-behaviors/color';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'sspirit-unit-icon',
  templateUrl: './unit-icon.component.html',
  styleUrls: ['./unit-icon.component.sass']
})
export class UnitIconComponent implements OnInit {
  @Input() unit: Unit = 'scouts';
  @Input() color: ThemePalette | null = 'primary';

  get name(): string {
    return `${this.unit}`;
  }

  constructor(private registry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    const units: Unit[] = ['guides', 'scouts'];

    let unit: Unit;
    for (unit of units) {
      const name = unit;
      const url = this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${name}.svg`);
      this.registry.addSvgIcon(name, url);
    }
  }

  ngOnInit(): void {
  }
}
