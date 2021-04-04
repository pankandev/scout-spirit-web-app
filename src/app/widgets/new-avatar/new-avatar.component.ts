import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RewardsService} from '../../services/rewards.service';
import {getControlOrThrow} from '../../utils/form';
import {Reward} from '../../models/rewards/reward';
import {RewardRarity} from '../../models/rewards/base';
import {AvatarType} from '../../models/rewards/avatar';

@Component({
  selector: 'app-new-avatar',
  templateUrl: './new-avatar.component.html',
  styleUrls: ['./new-avatar.component.sass']
})
export class NewAvatarComponent implements OnInit {
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

  async createAvatar(): Promise<void> {
    this.loading = true;
    this.formatCode();
    const reward: Reward = {
      description: {
        type: this.type.value as AvatarType,
        code: this.code.value as string
      },
      category: 'AVATAR',
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
