import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css']
})
export class NewGroupComponent implements OnInit {

  groupUserList:string[] = []
  groupform = new FormGroup({
    groupName : new FormControl('',[Validators.required]),
    user: new FormControl('',[])
  });
  constructor() { }
  ngOnInit(): void {
  }

}
