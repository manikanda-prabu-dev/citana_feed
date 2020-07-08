import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private title : Title , private Router : Router
    ) { }

  ngOnInit(): void {
    this.title.setTitle("Cintana | 404")
  }

  Home(){
   this.Router.navigate(['/dashboard'])
  }

}
