import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sspirit-avatar-picture',
  templateUrl: './avatar-picture.component.html',
  styleUrls: ['./avatar-picture.component.sass']
})
export class AvatarPictureComponent implements OnInit {
  @Input() src: string | null = null;
  @Input() defaultSrc = 'assets/img/default-avatar.png';

  public get realSrc(): string {
    return this.src ?? this.defaultSrc;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

}
