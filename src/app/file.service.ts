import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
 
  private uploadUrl = 'http://localhost:8080/file/upload';
  private fetchFilesUrl = 'http://localhost:8080/file/list';
  private sharableLinkUrl='http://localhost:8080/file/generate-link?fileId=';


  constructor(private http: HttpClient) {}


  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('document', file, file.name);
    return this.http.post(this.uploadUrl, formData, { responseType: 'text' });
  }

  getAllFiles(): Observable<any[]> {
    return this.http.get<any[]>(this.fetchFilesUrl);
  }

  generateSharableLink(fileId:string):Observable<any>{
    
    const url = this.sharableLinkUrl + encodeURIComponent(fileId); 
    return this.http.get<any>(url,{responseType: 'text' as 'json'});
  }
  shareFile(shareData: { users: string[]; message: string; link: string }) {
    return this.http.post('/api/files/share', shareData);
  }
  }



