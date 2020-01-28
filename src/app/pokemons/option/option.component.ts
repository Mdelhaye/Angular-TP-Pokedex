import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class OptionComponent implements OnInit {

  islogin: boolean;
  location: Location;
  constructor(private cookieService: CookieService, location: Location) {
    this.location = location;
  }

  ngOnInit() {
    if (this.cookieService.get('access_token')) {
      this.islogin = true;
    }
  }

  login() {
    this.location.go('connexion');
    location.reload();
  }

  logout() {
    this.cookieService.delete('access_token');
    this.cookieService.delete('refresh_token');
    this.location.go('pokedex');
    location.reload();
  }

  goToTeam() {
    this.location.go('team');
    location.reload();
  }

}
