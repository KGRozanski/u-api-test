import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  public isDropdownVisible: boolean = false;

  constructor() { }

  public ngOnInit(): void {}


  public toggleDropdown(): void {
    this.isDropdownVisible = !this.isDropdownVisible;
  }


}
