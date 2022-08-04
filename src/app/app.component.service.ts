import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { IResponse, ROVER_CAMERAS } from './app.component.types';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _imgArray: BehaviorSubject<IResponse[]>;
  private NASA_ENDPOINT =
    'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';
  private API_KEY = 'J7RiDgM7bLFA30fDBKSBeKW2uNgggK0qOwASi7Vk';

  constructor(private _httpClient: HttpClient) {
    this._imgArray = new BehaviorSubject<IResponse[]>([]);
  }

  /*
   * Getters
   */
  get imgArray$(): Observable<IResponse[]> {
    return this._imgArray.asObservable();
  }

  public getImagesFromCamera(
    cameraName: ROVER_CAMERAS
  ): Observable<IResponse[]> {
    return this._httpClient
      .get(`${this.NASA_ENDPOINT}`, {
        params: {
          sol: 100,
          page: 1,
          camera: cameraName,
          api_key: this.API_KEY,
        },
      })
      .pipe(
        map((result: any) => {
          if (result) {
            const photos: IResponse[] = result.photos;
            // const { photos } = result;
            if (photos) {
              const end = photos.length > 20 ? 20 : photos.length;
              this._imgArray.next(photos.slice(0, end));
            }
            return photos;
          }
          return [];
        })
      );
  }
}
