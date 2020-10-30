import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class EventService {
  private events: { [key: string]: Subject<any> } = {};
  // spinner loading
  public isLoading$: Subject<boolean> = new Subject();

  constructor() {
  }

  subscribeEvent(name: string): Subject<any> {
    if (!this.events[name]) {
      this.events[name] = new Subject<any>();
    }
    return this.events[name];
  }
}
