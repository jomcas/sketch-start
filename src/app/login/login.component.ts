import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "ss-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.checkIfUserIsLoggedIn();
  }

  login() {
    this.authService.googleSignin();
  }

  private checkIfUserIsLoggedIn() {
    this.authService.user$.subscribe((user) => {
      if (user) {
        this.router.navigate(["/main"]);
      }
    });
  }
}