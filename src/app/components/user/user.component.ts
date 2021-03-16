import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
      this.toastr.error('ola');
}

  navigateToUserCreate(): void {
    this.router.navigate(['/user/create']);
  }
}
