import { Component, OnInit } from '@angular/core';
import {GroupService} from "../../service/group.service";
import {IGroup} from "../../model/IGroup";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groupList:IGroup[];
  constructor(private groupService:GroupService) { }

  ngOnInit(): void {
    this.groupService.getGroupList().subscribe(res=>{
      this.groupList = res;
      console.log(this.groupList);
    })
  }

}
