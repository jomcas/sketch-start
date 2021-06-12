import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "ss-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  signOut() {
    this.authService.signOut();
  }

  private getCurrentUser() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      if (!user) {
        this.router.navigate(["/"]);
      }
    });
  }
}