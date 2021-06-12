import { Component, OnInit } from "@angular/core";
import { SketchService } from "src/app/services/sketch.service";

@Component({
  selector: "ss-sketch-list",
  templateUrl: "./sketch-list.component.html",
  styleUrls: ["./sketch-list.component.scss"],
})
export class SketchListComponent implements OnInit {
  sketches: any[] = [];

  constructor(private sketchService: SketchService) {}

  ngOnInit() {
    this.getSketches();
  }

  private getSketches() {
    this.sketchService
      .getAll()
      .subscribe((sketches) => (this.sketches = sketches));
  }
}