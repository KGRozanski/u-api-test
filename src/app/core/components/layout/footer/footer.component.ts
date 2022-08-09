import { Component, OnInit } from '@angular/core';
const PACKAGE_JSON = require('../../../../../../package.json');

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public VERSION = PACKAGE_JSON.version;
  public CURRENT_YEAR = new Date().getFullYear();

  constructor() { }

  ngOnInit(): void {
  }

}
