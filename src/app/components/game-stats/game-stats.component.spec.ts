import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'

import { NbaService } from '../../services'
import { GameStatsComponent } from './game-stats.component'

describe('GameStatsComponent', () => {
  let component: GameStatsComponent;
  let fixture: ComponentFixture<GameStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameStatsComponent ],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [NbaService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
