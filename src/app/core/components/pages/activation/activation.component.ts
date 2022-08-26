import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class ActivationComponent implements OnInit {
  public activationMsg: string;
  
  private $routeSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.$routeSubscription = this.route.queryParams.subscribe((params) => {
      this.activationMsg = atob(params['res']);
    });
  }

  ngOnDestroy(): void {
    this.$routeSubscription.unsubscribe();
  }

}
