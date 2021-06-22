import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {RewardsService} from '../../../services/rewards.service';
import {Observable} from 'rxjs';
import {Reward} from '../../../models/rewards/reward';
import {startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'sspirit-reward-list',
  templateUrl: './reward-list.component.html',
  styleUrls: ['./reward-list.component.sass']
})
export class RewardListComponent implements OnInit {
  rewardCategoryControl = new FormControl('DECORATION');
  rewards$: Observable<Reward[] | null>;

  constructor(private rewards: RewardsService) {
    this.rewards$ = this.rewardCategoryControl.valueChanges.pipe(
      switchMap(category => rewards.query(category).pipe(startWith(null)))
    );
  }

  ngOnInit(): void {
  }
}
