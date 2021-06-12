import { Component, OnInit } from "@angular/core";
import { SketchService } from "src/app/services/sketch.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "ss-my-sketch-list",
  templateUrl: "./my-sketch-list.component.html",
  styleUrls: ["./my-sketch-list.component.scss"],
})
export class MySketchListComponent implements OnInit {
  sketches: any[] = [];
  user: any;

  constructor(
    private sketchService: SketchService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getCurrentUser();
  }

  private getSketches() {
    this.sketchService
      .getAllByUserId(this.user.uid)
      .subscribe((sketches) => (this.sketches = sketches));
  }

  private getCurrentUser() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      this.getSketches();
    });
  }
}