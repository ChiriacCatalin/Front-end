import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sign-in-dropdown',
  templateUrl: './sign-in-dropdown.component.html',
  styleUrls: ['./sign-in-dropdown.component.css']
})
export class SignInDropdownComponent {

  constructor(private readonly router: Router, private authService: AuthService) { }

  signUp() {
    const navigator = from(this.router.navigate(['sign-In'], { state : { comesFromSignUp : true } }));
    navigator.pipe(take(1)).subscribe(response => {
      if(!response){
        this.router.navigate(['profile']);
      }
    })
    
    // this.authService.googleSignIn().subscribe(result => {
    //   console.log(result);
    //   //we should somehow redirect the user to another page where he
    //   //can enter info for his profile, if the operation type is sign up

    //   //if the operation type is sign in, we should redirect the user to the home page(or to his profile)
    // });
  }
}
