import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      role: ['client', Validators.required], 
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.userService.createClient(this.clientForm.value).subscribe(() => {
        this.router.navigate(['/client-list']);
      });
    }
  }
}
