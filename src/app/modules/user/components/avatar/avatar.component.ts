import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {
    @Input('photo') photo: string | null = null;

    constructor() {}

    ngOnInit(): void {}
}
