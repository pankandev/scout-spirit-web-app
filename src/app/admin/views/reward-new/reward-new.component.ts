import { Component, OnInit } from '@angular/core';
import {RewardCategory} from '../../../models/rewards/base';

@Component({
  selector: 'sspirit-reward-new',
  templateUrl: './reward-new.component.html',
  styleUrls: ['./reward-new.component.sass']
})
export class RewardNewComponent implements OnInit {
  rewardCategory: RewardCategory = 'DECORATION';
  constructor() { }

  ngOnInit(): void {
  }

}
