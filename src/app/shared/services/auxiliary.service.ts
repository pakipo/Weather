import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuxiliaryService {
  preloaderToggle: boolean = false;
  preloaderToggleSubj = new Subject();
  constructor() { }

  preloaderCtrl(mode: boolean) {
    this.preloaderToggle = mode;
    this.preloaderToggleSubj.next(this.preloaderToggle)
  }
}
