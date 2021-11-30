import { Component, OnInit } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { IGroup } from '../../model/IGroup';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css'],
})
export class GroupListComponent implements OnInit {
  groupList: IGroup[];
  users = JSON.stringify(['John2', 'Luca']);
  constructor(private groupService: GroupService, private router: Router) {}

  ngOnInit(): void {
    this.groupService.getGroupList().subscribe((res) => {
      this.groupList = res;
    });
  }
  onGroupClick(group: IGroup) {
    let userArray = JSON.stringify(group.users);

    let queryParams = {
      ArrayUsers: userArray,
    };
    const navigationExtras: NavigationExtras = {
      queryParams,
    };
    this.router.navigate(['../group-details'], navigationExtras);
  }
  deleteGroup(group: IGroup) {
    this.groupList.slice(this.groupList.indexOf(group), 1);

    this.groupService.deleteGroup(group.id).subscribe((res) => {
      console.error('Group deleted!');
    });
  }
}
