import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {SelectButtonItem} from '../select-buttons/select-buttons.component';

@Component({
  selector: 'sspirit-select-icon',
  templateUrl: './select-icon.component.html',
  styleUrls: ['./select-icon.component.sass']
})
export class SelectIconComponent implements OnChanges {
  @Input() placeholderLabel = 'Seleccione una opción';
  @Input() options: SelectButtonItem[] = [];

  @Input() value?: string;
  @Output() valueChange = new EventEmitter<string>();
  @Input() label: string | null = null;

  selected?: SelectButtonItem;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value || changes.options) {
      this.selected = this.options.find(s => s.id === this.value);
    }
  }

}
