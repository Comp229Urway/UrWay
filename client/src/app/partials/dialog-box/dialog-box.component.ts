import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title: string, message: string, isNotify: boolean}) {
  }

  ngOnInit(): void {
  }

}
