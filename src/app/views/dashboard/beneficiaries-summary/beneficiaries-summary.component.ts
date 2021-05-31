import {Component, OnInit} from '@angular/core';
import {from, Observable, of} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {map, startWith, switchMap} from 'rxjs/operators';
import {BeneficiariesService} from '../../../services/beneficiaries.service';
import {Beneficiary} from '../../../models/beneficiary.model';

@Component({
  selector: 'sspirit-beneficiaries-summary',
  templateUrl: './beneficiaries-summary.component.html',
  styleUrls: ['./beneficiaries-summary.component.sass']
})
export class BeneficiariesSummaryComponent implements OnInit {
  beneficiaryId$: Observable<string | null>;
  beneficiary$: Observable<Beneficiary | null>;

  constructor(private route: ActivatedRoute, public service: BeneficiariesService) {
    this.beneficiaryId$ = route.params.pipe(
      map(params => params.userId ?? null)
    );
    this.beneficiary$ = this.beneficiaryId$.pipe(
      switchMap(id => id ? from(service.get(id)).pipe(startWith(null)) : of(null))
    );
  }

  ngOnInit(): void {
  }
}
