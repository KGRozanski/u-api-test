import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { NotificationActions } from 'src/app/core/actions/notifications.actions';
import { NotificationType } from 'src/app/core/enums/notification-type.enum';

@Component({
    selector: 'app-crop-img',
    templateUrl: './crop-img.component.html',
    styleUrls: ['./crop-img.component.scss']
})
export class CropImgComponent {
    imageChangedEvent: any = '';
    croppedImage: any = '';

    constructor(public dialogRef: MatDialogRef<CropImgComponent>, private store: Store) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    fileChangeEvent(event: Event): void {
        this.imageChangedEvent = event;
    }

    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
    }

    imageLoaded(image: LoadedImage) {
        // show cropper
    }

    cropperReady() {
        // cropper ready
    }

    loadImageFailed() {
        // show message
        this.store.dispatch(
            NotificationActions.push({
                notification: {
                    type: NotificationType.ERROR,
                    message: 'Failed to load image'
                }
            })
        );
    }
}
