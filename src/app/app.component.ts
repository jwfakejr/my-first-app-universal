import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedFeature = 'recipe';


  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBxvl7FNdgFazhBvXsaQ6T7uHkrVnnSUdY",
      authDomain: "recipebook-9b418.firebaseapp.com"
    });

  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
