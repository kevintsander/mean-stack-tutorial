import { AbstractControl } from "@angular/forms";
import { Observable, Observer, of } from "rxjs";

export const mimeType = (control: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any } | null> => {
  // if the image is just a string (path) pass validation automatically
  if (typeof (control.value) === 'string') {
    return of(null);  //quick way to create a simple observable with rxjs (it emits each argument immediately and then completes)
  }
  const file = control.value as File;
  const fileReader = new FileReader();
  // we need to create an observable to return using rxjs
  const fileReaderObs = new Observable((observer: Observer<{ [key: string]: any } | null>) => {
    //below could also use this syntax: fileReader.onloadend = () => { /* code here */ }
    fileReader.addEventListener("loadend", () => {
      const arr = new Uint8Array(fileReader.result as ArrayBuffer).subarray(0, 4);
      let header = "";
      let isValid = false;
      for (let i = 0; i < arr.length; i++) {
        header += arr[i].toString(16);
      }
      switch (header) {
        case "89504e47":
          isValid = true;
          break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
          isValid = true;
          break;
        default:
          isValid = false; // Or you can use the blob.type as fallback
          break;
      }
      if (isValid) {
        observer.next(null); // null means valid!
      } else {
        observer.next({ invalidMimeType: true })
      }
      observer.complete();
    });
    fileReader.readAsArrayBuffer(file);
  });
  return fileReaderObs;
};
