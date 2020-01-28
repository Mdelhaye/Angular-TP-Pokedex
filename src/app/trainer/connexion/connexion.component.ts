import {Component, OnInit} from '@angular/core';
import {TrainerService} from '../trainer.service';
import {User} from '../../models/user.model';
import {CookieService} from 'ngx-cookie-service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {

  user: User;
  location: Location;
  private cookieValue: string;


  constructor(private trainerService: TrainerService, private cookieService: CookieService, location: Location) {
    this.location = location;
  }

  ngOnInit() {
    console.log(this.cookieService.get('access_token'));
    if (this.cookieService.get('access_token')) {
      this.location.go('pokedex');
      location.reload();
    }
  }

  verification(email: HTMLInputElement, password: HTMLInputElement) {
    this.trainerService.login(email.value, password.value).then(
      data => {
        this.user = data;
        if (this.user == null) {
          console.log('Error: User is not defined!');
          // TODO
        } else {
          const expire = new Date();
          expire.setSeconds(expire.getSeconds() + Number(this.user.expires_in));

          this.cookieService.set('access_token', this.user.access_token, expire);
          this.cookieService.set('refresh_token', this.user.refresh_token, expire);
          this.cookieValue = this.cookieService.get('access_token');

          this.location.go('pokedex');
          location.reload();
        }

      });
  }
}
