import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
 
  private uploadUrl = 'http://localhost:8080/file/upload';
  private fetchFilesUrl = 'http://localhost:8080/file/list';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('document', file, file.name);
    return this.http.post(this.uploadUrl, formData, { responseType: 'text' });
  }

  getAllFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.fetchFilesUrl);
  }
}
