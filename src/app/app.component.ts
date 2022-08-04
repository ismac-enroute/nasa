import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AppService } from './app.component.service';
import { IResponse, ROVER_CAMERAS } from './app.component.types';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'nasa-mars-rover';
  photos: IResponse[];
  selectedPhoto: string;
  isWrapperEnabled: boolean;
  photoIndex: number;
  selectedMenu: ROVER_CAMERAS;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _appService: AppService,
    private _changeDetectorRef: ChangeDetectorRef
  ) {
    this._unsubscribeAll = new Subject();
    this.photos = [];
    this.selectedPhoto = '';
    this.isWrapperEnabled = false;
    this.photoIndex = 0;
    this.selectedMenu = this.RoverCameras.FHAZ;
  }

  ngOnInit() {
    this._appService.imgArray$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((photos: IResponse[]) => {
        this.photos = photos;
        this._changeDetectorRef.markForCheck();
      });

    this._appService.getImagesFromCamera(this.selectedMenu).subscribe();
  }

  public get RoverCameras(): typeof ROVER_CAMERAS {
    return ROVER_CAMERAS;
  }

  loadContent(camera: ROVER_CAMERAS) {
    this.selectedMenu = camera;
    this._appService.getImagesFromCamera(camera).subscribe();
  }

  setSelectedPhoto(photoIndex: number) {
    this.photoIndex = photoIndex;
    this.selectedPhoto = this.photos[photoIndex].img_src;

    //this.selectedPhoto = photo.img_src;
    this.isWrapperEnabled = true;
  }

  scrollImgLeft() {
    if (this.photoIndex > 0) {
      this.photoIndex--;
    } else {
      this.photoIndex = this.photos.length - 1;
    }
    this.selectedPhoto = this.photos[this.photoIndex].img_src;
  }

  scrollImgRight() {
    if (this.photoIndex < this.photos.length - 1) {
      this.photoIndex++;
    } else {
      this.photoIndex = 0;
    }
    this.selectedPhoto = this.photos[this.photoIndex].img_src;
  }

  closeButton() {
    this.isWrapperEnabled = false;
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(0);
    this._unsubscribeAll.complete();
  }
}
