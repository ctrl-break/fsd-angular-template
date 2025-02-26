import { Injectable } from '@angular/core';
import { <%= classify(name) %> } from '../model/<%= dasherize(name) %>.model';

@Injectable({
  providedIn: 'root'
})
export class <%= classify(name) %>Service {}