import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  clientForm!: FormGroup;
  clientId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id')!;
    this.userService.getClient(this.clientId).subscribe(client => {
      console.log('Client data received from backend:', client); 
      this.clientForm = this.fb.group({
       email: [client.email, [Validators.required, Validators.email]],
        fname: [client.fname, Validators.required],
        lname: [client.lname, Validators.required]
     
      });
      console.log('Form Value:', this.clientForm.value);
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      console.log('Form Submitted:', this.clientForm.value);
      this.userService.updateClient(this.clientId, this.clientForm.value).subscribe(() => {
      
        this.router.navigate(['/clients']);
      });
    }
  }
}

