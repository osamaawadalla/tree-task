import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { SharedModule } from 'src/app/shared/shared.module';
import { HomeService } from './services/home/home.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule
  ],
  providers: [HomeService],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  users: User[] = [];
  usersTree: User[][] = [];

  private subscription: Subscription = new Subscription();

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getUsers(): void {
    this.homeService.getUsers()
      .subscribe({
        next: res => {
          this.users = res.sort((a: any, b: any) => a.code.localeCompare(b.code));
          this.usersTree = this.getAbsoluteParentUsers();
        },
        error: err => {
          console.log(err);
        }
      })
  }

  getUserChildren(user: User): User[] {
    return this.users.filter((u) => u.code.startsWith(user.code + '.') && u.code.split('.').length === user.code.split('.').length + 1);
  }

  userHasChildren(user: User): boolean {
    return this.getUserChildren(user).length > 0;
  }

  getAbsoluteParentUsers(): User[][] {
    const parentCodes = new Set(this.users.map((u) => u.code.split('.')[0]));
    const parentUsers: User[][] = [];
    parentCodes.forEach(code => {
      parentUsers.push(this.users.filter((u) => code == u.code));
    })
    return parentUsers;
  }

}
