import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from '../services/form/form.service'
import Swal from 'sweetalert2'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(
    private Router: Router,
    private title: Title,
    private formBuilder: FormBuilder,
    private fromService : FormService
  ) {}

  ngOnInit(): void {
    this.title.setTitle('Cintana | Register');
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  login() {
    this.Router.navigate(['/login']);
  }

  onSubmit() {
    this.submitted = true;
    console.log('register form data', this.registerForm.value);
    const user = {
      name : this.registerForm.value.name,
      email : this.registerForm.value.email,
      password : this.registerForm.value.password
    }

    if (this.registerForm.invalid) {
      return;
    } else {

      this.fromService.register(user).subscribe(data =>{
       if(data.code == 409){
         Swal.fire({
          icon: 'error',
          title: data.message
        })
       }else if(data.code == 404){
         Swal.fire({
          icon: 'error',
          title: data.message

        })
       }else if(data.code == 201){
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: data.message,
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(()=>{
          this.Router.navigate(['/login']);
        },1100)
         console.log(data);
       }
      })

    }
  }
}
