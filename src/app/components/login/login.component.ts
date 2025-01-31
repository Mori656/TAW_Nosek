import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
 selector: 'login',
 standalone: true,
 imports: [FormsModule],
 providers: [AuthService],
 templateUrl: './login.component.html',
 styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

 public credentials = {
   login: '',
   password: ''
 };

 public logged?: boolean;
 public logout?: boolean;

 constructor(public authService: AuthService,
             private router: Router) {
 }


 ngOnInit(): void {
 }

 signIn() {
  return this.authService.authenticate(this.credentials).subscribe((result) => {
    console.log(result);
    if (result) { // Sprawdzenie, czy logowanie się powiodło i czy otrzymano token
      this.logout = false;
      this.credentials = {
        login: '',
        password: ''
      };
      this.router.navigate(['/']);
    } else {
      this.logged = false; // Logowanie nie powiodło się
      
      // Możesz dodać tutaj dodatkowe informacje o błędzie, np. komunikat dla użytkownika
      console.error('Logowanie nie powiodło się');
    }
  }, (error) => {
    // Obsługa błędów, które mogą wystąpić podczas wywołania serwisu
    this.logged = false;
    alert('Logowanie nie powiodło się');
    console.error('Wystąpił błąd podczas logowania:', error);
  });
}

}
