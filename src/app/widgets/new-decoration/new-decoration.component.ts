import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {getControlOrThrow} from '../../utils/form';
import {RewardsService} from '../../services/rewards.service';
import {Reward} from '../../models/rewards/reward';
import {RewardRarity} from '../../models/rewards/base';

@Component({
  selector: 'sspirit-new-decoration',
  templateUrl: './new-decoration.component.html',
  styleUrls: ['./new-decoration.component.sass']
})
export class NewDecorationComponent implements OnInit {
  rewardForm = new FormGroup({
    rarity: new FormControl('COMMON', {validators: [Validators.required]}),
    release: new FormControl(0, {validators: [Validators.required]}),
    code: new FormControl('', {validators: [Validators.required]}),
    type: new FormControl(null, {validators: [Validators.required]})
  });
  loading = false;

  constructor(private rewardService: RewardsService) {
  }

  ngOnInit(): void {
  }

  get rarity(): FormControl {
    return getControlOrThrow('rarity', this.rewardForm);
  }

  get code(): FormControl {
    return getControlOrThrow('code', this.rewardForm);
  }

  get type(): FormControl {
    return getControlOrThrow('type', this.rewardForm);
  }

  async createDecoration(): Promise<void> {
    this.loading = true;
    this.formatCode();
    const reward: Reward = {
      description: {
        type: this.type.value as string,
        code: this.code.value as string
      },
      category: 'DECORATION',
      rarity: this.rarity.value as RewardRarity,
      release: 1
    };
    try {
      await this.rewardService.create(reward);
      this.clear();
    } catch (e) {
      this.loading = false;
      throw e;
    }
    this.loading = false;
  }

  formatCode(): void {
    const oldValue: string = this.code.value;
    this.code.setValue(oldValue.toLowerCase().replace(/ /g, '-'));
  }

  clear(): void {
    this.code.setValue('');
    this.type.setValue(null);

    this.rarity.markAsUntouched();
    this.code.markAsUntouched();
    this.type.markAsUntouched();
  }
}
