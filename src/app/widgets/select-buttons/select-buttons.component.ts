import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';

export interface SelectButtonItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'sspirit-select-buttons',
  templateUrl: './select-buttons.component.html',
  styleUrls: ['./select-buttons.component.sass']
})
export class SelectButtonsComponent implements OnInit {
  @Input() items: SelectButtonItem[] = [];

  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

}
