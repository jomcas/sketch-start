import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SketchListComponent } from "./sketch-list/sketch-list.component";
import { MainComponent } from "./main.component";
import { MySketchListComponent } from "./my-sketch-list/my-sketch-list.component";
import { CreateSketchComponent } from "./create-sketch/create-sketch.component";
import { SketchInfoComponent } from "./sketch-info/sketch-info.component";

const routes: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        component: SketchListComponent,
      },
      {
        path: "my-sketch-list",
        component: MySketchListComponent,
      },
      {
        path: "create-sketch",
        component: CreateSketchComponent,
      },
      {
        path: "sketch/:id",
        component: SketchInfoComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}