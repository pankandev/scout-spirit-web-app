import {ComponentFixture, TestBed} from '@angular/core/testing';

import {InviteComponent} from './invite.component';
import {RouterTestingModule} from '@angular/router/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {GroupsService} from '../../services/groups.service';
import {Group} from '../../models/group.model';

class MockUpGroupService extends GroupsService {
  async getGroup(districtId: string, groupId: string): Promise<Group> {
    return {
      name: 'group',
      scouters: {}
    };
  }
}

describe('InviteComponent', () => {
  let component: InviteComponent;
  let fixture: ComponentFixture<InviteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InviteComponent],
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [
        {
          provide: GroupsService,
          useClass: MockUpGroupService
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
