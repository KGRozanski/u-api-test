import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hamburger-btn',
  templateUrl: './hamburger-btn.component.html',
  styleUrls: ['./hamburger-btn.component.scss']
})
export class HamburgerBtnComponent implements OnInit {
  public hamburgerFlag: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
  
  public toggleBurger() {
    this.hamburgerFlag = !this.hamburgerFlag;
  }

}
