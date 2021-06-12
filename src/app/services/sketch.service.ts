import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import firebase from "firebase";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SketchService {
  collectionName = "sketches";

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage
  ) {}

  createSketch(sketch: any) {
    this.angularFirestore.collection(this.collectionName).add(sketch);
  }

  getById(id: string) {
    return this.angularFirestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges();
  }

  getAll() {
    return this.angularFirestore
      .collection(this.collectionName)
      .valueChanges({ idField: "id" });
  }

  getAllByUserId(userId: string) {
    return this.angularFirestore
      .collection(this.collectionName, (ref) =>
        ref.where("owner.uid", "==", userId)
      )
      .valueChanges({ idField: "id" });
  }

  async uploadSketchImage(base64Image: string) {
    const randomId = Math.random().toString(36).substring(2);
    const ref = this.angularFireStorage.ref(
      this.collectionName + "/" + randomId
    );

    const fileUploaded = await ref.put(
      this.dataURLtoFile(base64Image, "thumbnail.png")
    );

    return await fileUploaded.ref.getDownloadURL();
  }

  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }
}
