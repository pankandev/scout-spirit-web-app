import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'sspirit-whatsapp-share',
  templateUrl: './whatsapp-share.component.html',
  styleUrls: ['./whatsapp-share.component.sass']
})
export class WhatsappShareComponent implements OnInit {
  @Input() message?: string;

  constructor() {
  }

  ngOnInit(): void {
  }

  get isMobile(): boolean {
    return /Android|webOS|iPhone|iPad|Mac|Macintosh|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  get shareUrl(): string {
    return this.isMobile ? 'whatsapp://send?text=' : 'https://web.whatsapp.com/send?text=';
  }

  share(): void {
    window.open(this.shareUrl + this.message, '_blank');
  }
}
