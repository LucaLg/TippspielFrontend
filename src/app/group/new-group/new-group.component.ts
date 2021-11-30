import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendUserService } from 'app/service/backend-user.service';
import { TokenService } from 'app/service/token.service';
import { IGroup } from 'app/model/IGroup';
import { IUser as User } from 'app/model/IUser';
import { GroupService } from 'app/service/group.service';
@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.css'],
})
export class NewGroupComponent implements OnInit {
  groupUserList: string[] = [];
  groupform = new FormGroup({
    groupName: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.nullValidator]),
  });
  userDoesntExist: boolean = false;
  constructor(
    private tokenService: TokenService,
    private userBackendService: BackendUserService,
    private groupService: GroupService
  ) {
    tokenService.hasToken.subscribe((res) => {
      if (res) {
        this.groupUserList.push(localStorage.getItem('Username'));
      }
    });
  }
  ngOnInit(): void {}
  addUser() {
    let user = this.groupform.value.username;

    this.userBackendService.isUserPresent(user).subscribe((response) => {
      if (response) {
        this.groupUserList.push(user);
      } else {
        alert('User doesnt exist');
      }
    });

    //Check if User exists
    //Add to userList of Group
    //Error
    //User does not existn
  }
  onSave() {
    if (this.groupUserList.length == 1) {
      alert('Add more Users');
    }
    let group: IGroup = {
      name: this.groupform.value.groupName,
      users: this.groupUserList,
    };
    this.groupService.saveGroup(group).subscribe((savedGroup) => {
      alert('Group Saved');
      console.clear();
      console.error(savedGroup);
    });
  }
}
