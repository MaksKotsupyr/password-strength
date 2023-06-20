import { Injectable } from '@angular/core';

@Injectable()
export class PasswordService {
    getPasswordStrength(password: string): string {
        if (!password || password.length === 0) {
          return 'empty';
        }
        
        if (password.length < 8) {
          return 'lower';
        }
    
        // Перевірка складності пароля
        const hasLetters = /[a-zA-Z]/.test(password);
        const hasDigits = /[0-9]/.test(password);
        const hasSymbols = /[^a-zA-Z0-9]/.test(password);
    
        if (hasLetters && hasDigits && hasSymbols) {
          return 'strong';
        } else if ((hasLetters && hasDigits) || (hasLetters && hasSymbols) || (hasDigits && hasSymbols)) {
          return 'medium';
        } else {
          return 'easy';
        }
      }
}
