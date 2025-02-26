import { Component } from '@angular/core';

@Component({
  selector: 'app-<%= dasherize(name) %>',
  imports: [],
  templateUrl: './<%= dasherize(name) %>.component.html',
  styleUrls: ['./<%= dasherize(name) %>.component.scss']
})
export class <%= classify(name) %>Component {}