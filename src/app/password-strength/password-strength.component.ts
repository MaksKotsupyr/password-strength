import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})
export class PasswordStrengthComponent {
  password: string = '';
  passwordStrength: string = '';

  checkPasswordStrength() {
    const password = this.password;
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length === 0) {
      this.passwordStrength = '';
    } else if (password.length < 8) {
      this.passwordStrength = 'easy';
    } else if (hasLetters && hasNumbers && hasSymbols) {
      this.passwordStrength = 'strong';
    } else if (hasLetters && (hasNumbers || hasSymbols) || hasNumbers && hasSymbols) {
      this.passwordStrength = 'medium';
    } else {
      this.passwordStrength = 'easy';
    }
  }
}
