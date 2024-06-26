import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export  default class LoginComponent {
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  showPass:boolean = false;
  
  loginForm !: FormGroup;
  ngOnInit(): void{
    this.loginForm = this.fb.group({
      email : ['', [Validators.required, Validators.email]],
      password : ['', Validators.required],
    });
  }

  login(){
    this.authService.loginService(this.loginForm.value)
    .subscribe({
      next: (res) => {
        alert("Login is success!");
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem("user_id", res.data._id);
        }
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['home']);
        this.loginForm.reset();
      },
      error: (err)=>{
        console.log(err);
        alert(err.error);
      }
    })
    
  }

  togglePass(){
    this.showPass = !this.showPass;
  }
}
