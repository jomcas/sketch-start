import { Component, OnInit } from "@angular/core";
import * as p5 from "p5";
import { SketchService } from "src/app/services/sketch.service";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "ss-create-sketch",
  templateUrl: "./create-sketch.component.html",
  styleUrls: ["./create-sketch.component.scss"],
})
export class CreateSketchComponent implements OnInit {
  canvas: any;
  colors: string[] = ["red", "black", "blue", "yellow"];
  colorRgb: number[][] = [
    [221, 80, 68],
    [0, 0, 0],
    [37, 174, 243],
    [253, 227, 102],
  ];
  sizes: string[] = ["small", "medium", "large", "xlarge"];
  sizeInNumber: number[] = [8, 15, 22, 30, 35];
  activeColor = "black";
  activeSize = "small";
  points: any[] = [];

  user: any;
  name: string;
  description: string;

  isCreating: boolean;

  constructor(
    private sketchService: SketchService,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getCurrentUser();
    this.initCanvas();
  }

  reset() {
    this.points = [];
  }

  async createSketch() {
    this.isCreating = true;
    const base64Canvas = document.querySelector("canvas").toDataURL();

    const imageURL = await this.sketchService.uploadSketchImage(base64Canvas);

    const sketch = {
      name: this.name,
      description: this.description,
      imageURL: imageURL,
      owner: this.user,
    };

    await this.sketchService.createSketch(sketch);

    this.isCreating = false;
    this.router.navigate(["/main/my-sketch-list"]);
  }

  private initCanvas() {
    const sketch = (s: any) => {
      s.setup = () => {
        const canvasWidth = innerWidth < 899 ? innerWidth : 899;
        const canvas = s.createCanvas(canvasWidth, 400);
        canvas.parent("canvasContainer");
        s.frameRate(300);
      };

      s.draw = () => {
        s.background(240);
        s.noStroke();

        if (s.mouseIsPressed) {
          const point = this.createPoint(
            { x: s.mouseX, y: s.mouseY },
            this.activeColor,
            this.activeSize
          );

          this.points.push(point);
        }

        this.points.forEach((point) => {
          s.fill(s.color(...point.col));
          s.ellipse(point.pos.x, point.pos.y, point.size, point.size);
        });
      };
    };

    this.canvas = new p5(sketch);
  }
  private createPoint(pos: any, color: string, size: string): any {
    const colorIndex = this.colors.indexOf(color);
    const sizeIndex = this.sizes.indexOf(size);
    return {
      pos,
      col: this.colorRgb[colorIndex],
      size: this.sizeInNumber[sizeIndex],
    };
  }

  private getCurrentUser() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
