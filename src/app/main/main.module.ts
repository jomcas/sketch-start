import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MainRoutingModule } from "./main-routing.module";
import { MainComponent } from "./main.component";
import { SketchListComponent } from "./sketch-list/sketch-list.component";
import { SharedModule } from "../shared/shared.module";
import { MySketchListComponent } from "./my-sketch-list/my-sketch-list.component";
import { CreateSketchComponent } from "./create-sketch/create-sketch.component";
import { SketchInfoComponent } from "./sketch-info/sketch-info.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    MainComponent,
    SketchListComponent,
    MySketchListComponent,
    CreateSketchComponent,
    SketchInfoComponent,
  ],
  imports: [CommonModule, MainRoutingModule, SharedModule, FormsModule],
})
export class MainModule {}