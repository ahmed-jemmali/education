import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  url:string;
  signupForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private userService : UserService,
    private router : Router) { }

  ngOnInit() {
    this.url = this.router.url;
    alert(this.url);
    this.signupForm=this.formBuilder.group({
      firstName:['',[Validators.required,Validators.minLength(4)]],
      lastName:['',[Validators.required,Validators.minLength(4)]],
      email:['',[Validators.required,Validators.email]],
      pwd:['',[Validators.required,Validators.minLength(4)]]
    });
  }



  signup(user){

    console.log("Signup user: ",this.signupForm.value);

    user.role = (this.url =="/signupAdmin" ) ? 'Admin' : 'User';
    console.log("Signup user: ",this.signupForm.value);
    
    this.userService.signup(user).subscribe(
      (data)=>{
        console.log('Information : ' ,data.message);
        
      }
    )
  }
}
