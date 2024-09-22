import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PeriodicElement } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TriggerUpdateElementService {

  private triggerUpdateElement: BehaviorSubject<[boolean, PeriodicElement | null, number]> = new BehaviorSubject<[boolean, PeriodicElement | null, number]>([false, null, 0]);

  public getTriggerUpdateElement(): Observable<[boolean, PeriodicElement | null, number]> {
    return this.triggerUpdateElement.asObservable();
  }

  public setTriggerUpdateElement(triggered: boolean, element: PeriodicElement | null, index: number): void {
    this.triggerUpdateElement.next([triggered, element, index]);
  }
}
