import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppSelectorService {
  public menuSelector = 1;

  constructor() { }
}
