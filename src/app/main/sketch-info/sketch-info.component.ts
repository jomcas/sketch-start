import { Component, OnInit } from "@angular/core";
import { SketchService } from "src/app/services/sketch.service";
import { ActivatedRouteSnapshot, ActivatedRoute } from "@angular/router";

@Component({
  selector: "ss-sketch-info",
  templateUrl: "./sketch-info.component.html",
  styleUrls: ["./sketch-info.component.scss"],
})
export class SketchInfoComponent implements OnInit {
  sketch: any;

  constructor(
    private sketchService: SketchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSketch();
  }

  private getSketch() {
    const sketchId = this.route.snapshot.params.id;

    this.sketchService
      .getById(sketchId)
      .subscribe((sketch) => (this.sketch = sketch));
  }
}