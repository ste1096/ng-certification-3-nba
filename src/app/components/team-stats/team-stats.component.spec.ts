import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'

import { NbaService } from '../../services'
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component'
import { TeamStatsComponent } from './team-stats.component'

describe('TeamResultsComponent', () => {
  let component: TeamStatsComponent;
  let fixture: ComponentFixture<TeamStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamStatsComponent, ModalDialogComponent],
      imports: [HttpClientTestingModule],
      providers: [NbaService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
