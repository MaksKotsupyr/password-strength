import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordService } from 'src/app/services/password-strength.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {
  passwordForm!: FormGroup;
  passwordStrength: string = 'empty';
  passwordStrengthClass: string = 'gray'

  constructor(
    private formBuilder: FormBuilder,
    private passwordService: PasswordService,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: [''],
    });
    
    this.checkPasswordStrength();

    this.passwordForm.get('password')?.valueChanges.subscribe(() => {
      this.checkPasswordStrength();
    });
  }

  checkPasswordStrength() {
    const passwordControl = this.passwordForm.get('password');
    if (passwordControl) {
      const password = passwordControl.value;
      this.passwordStrength = this.passwordService.getPasswordStrength(password);
      this.addPasswordClass();
    }
  }

  addPasswordClass () {
    if (this.passwordStrength === 'lower') {
      this.getClassForElement(['red','red','red'])
    } else if (this.passwordStrength === 'strong') {
      this.getClassForElement(['green','green','green'])
    } else if (this.passwordStrength === 'medium') {
      this.getClassForElement(['yellow','yellow','gray'])
    } else if (this.passwordStrength === 'easy') {
      this.getClassForElement(['red','gray','gray'])
    } else {
      this.getClassForElement(['gray','gray','gray'])
    }
  }

  getClassForElement(arr: string[]) {
    const divElements = this.elementRef.nativeElement.querySelectorAll('div.strength-section div');
    for (let i=0; i<arr.length; i++) {
      divElements[i].classList.remove('red', 'yellow', 'green');
      divElements[i].classList.add(`${arr[i]}`);
    }
  }
  
}
