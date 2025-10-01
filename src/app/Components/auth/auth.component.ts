import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
   isLoginMode = true;

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    this.authService.login(email!, password!).subscribe({
      next: res => console.log('Login ok', res),
      error: err => console.error('Errore login', err)
    });
  }

  onRegister() {
    if (this.registerForm.invalid) return;

    const { name, lastname, email, password, confirmPassword } = this.registerForm.value;
    if (password !== confirmPassword) {
      alert('Le password non coincidono!');
      return;
    }

    this.authService.register({
      name: name!,
      lastname: lastname!,
      email: email!,
      password: password!
    }).subscribe({
      next: res => console.log('Registrazione ok', res),
      error: err => console.error('Errore registrazione', err)
    });
  }
}
