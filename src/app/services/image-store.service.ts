import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageStoreService {
  constructor(private storage: AngularFireStorage) {}
  async getFileUrl(file: File): Promise<string> {
    const task = this.storage.upload(`Images/${file.name}`, file);
    return (await task).ref.getDownloadURL();
  }
}
