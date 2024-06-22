import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit{
  message:any ;
  delete :any;
  cancel :any;
  heading:any;
  constructor(@Inject(MAT_DIALOG_DATA) private data:any){
    this.heading=data.heading;
    this.message=data.message;
    this.delete=data.delete;
    this.cancel=data.cancel;
  }
  ngOnInit(): void {
    
  }
}
