import { Component, OnInit } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
currentUser:any;
role :any;
  constructor(private cookie : CookieService,private Router : Router) { }
  ngOnInit(): void {

    const Login =this.cookie.get("login");

    this.currentUser = JSON.parse(Login);
    this.role = this.currentUser.role;
    // console.log("header data",JSON.parse(Login));
  }

  logout(){
    this.cookie.deleteAll()
    setTimeout(()=>{
      Swal.fire({
        title: 'Are you sure?',
        text: "did you want to Logout",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'yes, logout'
      }).then((result) => {
        if (result.value) {
          this.cookie.deleteAll();
          this.Router.navigate(["/login"]);
        }
      })

    },)
  }

  login(){
    this.cookie.deleteAll();
    this.Router.navigate(['/login'])
  }

}
