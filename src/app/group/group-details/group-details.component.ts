import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'app/model/IUser';
import { BackendUserService } from 'app/service/backend-user.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css'],
})
export class GroupDetailsComponent implements OnInit {
  usernames: string[] = [];
  users: IUser[] = [];
  constructor(
    private route: ActivatedRoute,
    private userBackendService: BackendUserService
  ) {
    if (this.route.snapshot.queryParamMap.get('ArrayUsers')) {
      this.usernames = JSON.parse(
        this.route.snapshot.queryParamMap.get('ArrayUsers')
      );
    }
  }

  ngOnInit(): void {
    this.usernames.forEach((username) => {
      this.userBackendService.getUserByUsername(username).subscribe((res) => {
        this.users.push(res);
      });
    });
  }
}
