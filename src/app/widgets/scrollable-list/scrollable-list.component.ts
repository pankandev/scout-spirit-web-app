import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {DateTime} from 'luxon';

export interface ListItem {
  id: string;
  imageUrl?: string | null;
  title?: string;
  subtitle?: string;
  icon?: string;
  time?: DateTime;
}

@Component({
  selector: 'sspirit-scrollable-list',
  templateUrl: './scrollable-list.component.html',
  styleUrls: ['./scrollable-list.component.sass']
})
export class ScrollableListComponent implements OnInit {
  @Input() items: ListItem[] = [];
  @Input() activeId: string | null = null;
  @Output() selectedItem = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }
}
