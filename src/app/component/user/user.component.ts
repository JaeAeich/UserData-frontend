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

  @ViewChild('modalTriggerButton') modalTriggerButton!: ElementRef;

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
    // console.log(`Editing user with ID: ${id}`);
    this.editedUser = this.users.find((user: any) => user._id === id);
    this.newUserData = { ...this.editedUser };
    this.modalTriggerButton.nativeElement.click();
  }

  submitEdit() {
    // console.log(this.editedUser);
    // send a PUT request to the backend to update the user data
    const url = `http://localhost:4000/person/${this.editedUser._id}`;
    const body = {
      name: this.editedUser.name,
      age: this.editedUser.age,
      gender: this.editedUser.gender,
      mobile: this.editedUser.mobile,
    };
    this.http.put(url, body).subscribe(
      (response) => {
        console.log('Update successful', response);
      },
      (error) => {
        console.error('Update failed', error);
      }
    );
    this.editedUser = { ...this.newUserData }; 
    this.modalTriggerButton.nativeElement.click();
    this.newUserData = {}; 
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:4000/person/${id}`).subscribe(() => {
        this.getUsers();
      });
    }
  }
}
