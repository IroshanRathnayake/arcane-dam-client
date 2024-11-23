import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthService } from '../../../core/services/auth.service';
import { Asset } from '../models/asset';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private readonly BASE_URL = `${environment.BASE_URL}/api/v1/asset`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  async upload(files: File[]): Promise<Observable<any>> {
    const currentUserId = this.authService.getCurrentUser()?.id;
    const spaceIndexStr = localStorage.getItem('selectedSpaceIndex');
    const spacesStr = localStorage.getItem('spaces');

    if (spaceIndexStr && spacesStr) {
      const spaceIndex = parseInt(spaceIndexStr, 10);
      const spaces = JSON.parse(spacesStr);

      if (
        Array.isArray(spaces) &&
        spaceIndex >= 0 &&
        spaceIndex < spaces.length
      ) {
        var spaceId = spaces[spaceIndex].id;
        console.log('Space ID:', spaceId);
      } else {
        console.error('Invalid space index or spaces array is empty.');
      }
    } else {
      console.error('spaceId or spaces is missing in localStorage.');
    }
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('file', file, file.name);
      formData.append('spaceId', spaceId ?? '');
      formData.append('userId', currentUserId ?? '');
    });
    return this.http.post(`${this.BASE_URL}/upload`, formData);
  }

  // Download file
  downloadFile(fileId: string): Observable<any> {
    return this.http.get(`${this.BASE_URL}/download/${fileId}`, {
      responseType: 'arraybuffer',
    });
  }

  // Update file
  updateFile(fileId: string, file: FormData): Observable<any> {
    return this.http.put(`${this.BASE_URL}/${fileId}`, file);
  }

  // Delete file
  deleteFile(fileId: string): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/${fileId}`, { responseType: 'text' });
  }

  // Get assets by space ID
  getAssetsBySpaceId(spaceId: string): Observable<Asset[]> {
    return this.http.get<Asset[]>(`${this.BASE_URL}/space/${spaceId}`);
  }
}
