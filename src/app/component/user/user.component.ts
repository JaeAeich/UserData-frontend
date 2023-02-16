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
    this.modalTriggerButton.nativeElement.click(); // Added
  }

  deleteUser(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete(`http://localhost:4000/person/${id}`).subscribe(() => {
        this.getUsers();
      });
    }
  }
}
