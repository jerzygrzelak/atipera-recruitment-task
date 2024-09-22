import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElementsTableComponent } from './components/elements-table/elements-table.component';
import { debounceTime, delay, map, Observable, of, startWith, Subject, tap } from 'rxjs';
import { PeriodicElement } from './models';
import { ELEMENT_DATA } from './mock-data/elements';
import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { ElementsTableSkeletonComponent } from './components/elements-table-skeleton/elements-table-skeleton.component';
import { rxState } from '@rx-angular/state';
import { TriggerUpdateElementService } from './services/trigger-update-element.service';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ElementsTableComponent,
    AsyncPipe,
    ElementsTableSkeletonComponent,
    JsonPipe,
    NgIf,
    MatFormField,
    MatInput,
    MatLabel,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private minDelay = 500;
  private maxDelay = 2000;
  private randomDelay = Math.random() * (this.maxDelay - this.minDelay) + this.minDelay;

  private state = rxState<{ elements: PeriodicElement[]; loading: boolean }>(({set, connect}) => {
    set({elements: [], loading: true});

    connect('elements', of(ELEMENT_DATA).pipe(
      delay(this.randomDelay),
      tap(() => set({loading: false}))
    ));
  });

  public elements$: Observable<PeriodicElement[]> = this.state.select('elements').pipe(
    startWith([])
  );

  public filteredElements$: Observable<PeriodicElement[]>;

  public loading$ = this.state.select('loading');
  private filterSubject = new Subject<string>();

  constructor(private triggerUpdateElementService: TriggerUpdateElementService) {
    this.triggerUpdateElementService.getTriggerUpdateElement().subscribe(([value, element, index]) => {
      if (value && element) {
        this.state.set('elements', (state) => {
          const updatedElements = [...state.elements];
          updatedElements[index] = element;
          return updatedElements;
        });
      }
    });

    this.filteredElements$ = this.elements$;
    this.filterSubject.pipe(
      debounceTime(2000)
    ).subscribe(value => {
      this.filter(value);
    });
  }

  public filter(value: string) {
    if (value) {
      this.filteredElements$ = this.state.select('elements').pipe(
        map(elements => elements.filter(element =>
          element.name.toLowerCase().includes(value.toLowerCase()) ||
          element.symbol.toLowerCase().includes(value.toLowerCase()) ||
          element.position.toString().includes(value) ||
          element.weight.toString().includes(value)
        ))
      );
    } else {
      this.filteredElements$ = this.elements$;
    }
  }

  public onFilterChange(event: any) {
    this.filterSubject.next(event.target.value);
  }
}
