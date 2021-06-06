import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'sspirit-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {
  @Input() icon: string | null = null;
  @Output() pressed = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }
}
