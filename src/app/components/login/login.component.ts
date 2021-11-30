import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:any={};
  loginForm: FormGroup;
  constructor(private formBuilder : FormBuilder,
    private userService : UserService,
    private router :Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: [''],
      pwd: [''],
      
    })
  }

  login(){
    console.log('login :',this.user);
    this.userService.login(this.user).subscribe(
      (data)=>{
        console.log(' login information ',data);
        if(data.message == '2'){
          if(data.user.role=="User"){
            //go to
          }else{
            //go to
          }
          this.router.navigate(['admin']);
        }else{
          document.getElementById('msgError').innerHTML="Please verify your email/pwd";
          document.getElementById('msgError').style.color='red';
        }
        
      }
    )
  };

}
