import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{
itemForm!: FormGroup;
  formModel: any = { role: '', email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;
  roles: string[] = ['Choose Role', 'BUSINESS', 'DRIVER', 'CUSTOMER'];
  showError:boolean=false;
  errorMessage:any;

  constructor(private fb: FormBuilder, private authService:AuthService, private httpService:HttpService, private router:Router) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Choose Role', [Validators.required, this.validateRole]]
    });
  }

  validateRole(control: any) 
  {
    return control.value === 'Choose Role' ? { invalidRole: true } : null;
  }

  // onRegister(): void {
  //  if(this.itemForm.valid)
  //    {
  //      this.showError=false;
  //      this.showMessage=false;
  //      this.httpService.registerUser(this.itemForm.value).subscribe(data=>{
  //       console.log("Subscribe working");
  //        this.showMessage=true;
  //        this.responseMessage='Hi '+data.name +", you have successfully registered!";
  //        this.itemForm.reset();
         
  //      },error=>{
  //        this.showError=true;
  //        this.errorMessage=error.error})
  //    }
  //    else{
  //      this.itemForm.markAllAsTouched();
  //    }
  // }

  
onRegister(): void {
this.httpService.registerUser(this.itemForm.value).subscribe({
  next: (data) => {
    this.showMessage = true;
    this.responseMessage = 'Welcome ' + data.name + " you are successfully registered";
    this.itemForm.reset();
    setTimeout(() => {
      this.router.navigateByUrl('/login');
    }, 2000);
  },
  error: (error) => {
    this.errorMessage = true;

    // Check if error has a message
    if (error.error && error.error.message) {
      this.responseMessage = error.error.message;
    } else {
      this.responseMessage = 'An unexpected error occurred: ' + JSON.stringify(error);
    }

    console.error('Registration error:', error);
  }
});
  
  
}
}

