import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {FormService} from '../services/form/form.service';
import { identifierModuleUrl, IfStmt } from '@angular/compiler';
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(private Router : Router , private title : Title,private formBuilder: FormBuilder,private formService:FormService,private cookie : CookieService) { }

  ngOnInit(): void {
    this.title.setTitle("Cintana | Login");
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
  });

  }


// convenience getter for easy access to form fields
get f() {
   return this.loginForm.controls;
   }
  login(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }else{

    this.formService.login(this.loginForm.value).subscribe(data =>{

      console.log("login response",data);

      if(data.code == 404){
        Swal.fire({
          icon: 'error',
          title: data.message,
        }).then((result)=>{
          if(result.value == true){
            Swal.fire({
              title: 'do you want to register?',
              text: "",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'yes, register'
            }).then((result) => {
              if (result.value) {
               this.Register();
              }
            })
          }
        });

      }else if(data.code == 401){
        Swal.fire({
          icon: 'error',
          title: data.message
        })
      }else if(data.code == 200){
        //success
        var userdata = data.data;
        this.cookie.set("login" , JSON.stringify(userdata));
        const Login =this.cookie.get("login");
        console.log("logindata of cookie data",JSON.parse(Login));

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        })
        this.Router.navigate(['/dashboard']);
      }

    });

  }


  }

  Register(){
    this.Router.navigate(['/register']);
  }



}
