import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sspirit-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.sass']
})
export class LoaderComponent implements OnInit {
  @Input() loading = false;
  @Input() message?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
