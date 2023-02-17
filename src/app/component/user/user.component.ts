// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-user',
//   templateUrl: './user.component.html',
//   styleUrls: ['./user.component.css'],
// })
// export class UserComponent implements OnInit {
//   users: any = [];
//   isEditting = false;
//   editedUser: any = {};

//   @ViewChild('modalTriggerButton') modalTriggerButton!: ElementRef; // Added

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.getUsers();
//   }

//   getUsers() {
//     this.http.get('http://localhost:4000/person').subscribe((data: any) => {
//       this.users = data;
//     });
//   }

//   editUser(id: string) {
//     this.isEditting = true;
//     console.log(`Editing user with ID: ${id}`);
//     this.editedUser = this.users.find((user: any) => user._id === id);
//     this.modalTriggerButton.nativeElement.click(); // Added
//   }
//   submitEdit() {
//     console.log(this.editedUser);
//     this.modalTriggerButton.nativeElement.click();
//   }

//   deleteUser(id: string) {
//     if (confirm('Are you sure you want to delete this user?')) {
//       this.http.delete(`http://localhost:4000/person/${id}`).subscribe(() => {
//         this.getUsers();
//       });
//     }
//   }
// }

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: any = [];
  isEditting = false;
  editedUser: any = {};
  newUserData: any = {};

  @ViewChild('modalTriggerButton') modalTriggerButton!: ElementRef; // Added

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get('http://localhost:4000/person').subscribe((data: any) => {
      this.users = data;
    });
  }

  editUser(id: string) {
    this.isEditting = true;
    console.log(`Editing user with ID: ${id}`);
    this.editedUser = this.users.find((user: any) => user._id === id);
    this.newUserData = { ...this.editedUser }; // Added
    this.modalTriggerButton.nativeElement.click();
  }

  submitEdit() {
    console.log(this.editedUser); // Updated
    this.editedUser = { ...this.newUserData }; // Updated
    this.modalTriggerButton.nativeElement.click();
    this.newUserData = {}; // Added
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:4000/person/${id}`).subscribe(() => {
        this.getUsers();
      });
    }
  }
}
