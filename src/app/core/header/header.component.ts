import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Info } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit {

  @Input()
  userInfo: Info | undefined;

  @Output()
  logoutEventEmitter: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void { }

  /**
   * This function is used to emit the logout status
   */
  logout() {
    this.logoutEventEmitter.emit(true);
  }
}
