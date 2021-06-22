import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RewardsService} from '../../services/rewards.service';
import {getControlOrThrow} from '../../utils/form';
import {RewardRarity} from '../../models/rewards/base';
import {AvatarPartType, AvatarReward} from '../../models/rewards/avatar';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'sspirit-new-avatar',
  templateUrl: './new-avatar.component.html',
  styleUrls: ['./new-avatar.component.sass']
})
export class NewAvatarComponent implements OnInit {
  rewardForm = new FormGroup({
    rarity: new FormControl('COMMON', {validators: [Validators.required]}),
    release: new FormControl(0, {validators: [Validators.required]}),
    type: new FormControl(null, {validators: [Validators.required]}),
  });
  materialControl = new FormControl('', {validators: [Validators.required]});
  shirtTypeControl = new FormControl('common', {validators: [Validators.required]});

  loading = false;

  constructor(private rewardService: RewardsService) {
  }

  ngOnInit(): void {
  }

  get rarity(): FormControl {
    return getControlOrThrow('rarity', this.rewardForm);
  }

  get type(): FormControl {
    return getControlOrThrow('type', this.rewardForm);
  }

  getAvatarDescription(): any {
    const description: any = {};
    description.material = this.materialControl.value;
    if (this.type.value === 'shirt') {
      description.type = this.shirtTypeControl.value;
    }
    return description;
  }

  async createAvatar(): Promise<void> {
    this.loading = true;
    const reward: AvatarReward = {
      description: {
        type: this.type.value as AvatarPartType,
        description: this.getAvatarDescription()
      },
      category: 'AVATAR',
      rarity: this.rarity.value as RewardRarity,
      release: environment.release
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

  clear(): void {
    this.materialControl.setValue('');

    this.rarity.markAsUntouched();
    this.type.markAsUntouched();
  }
}
