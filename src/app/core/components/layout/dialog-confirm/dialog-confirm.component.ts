import { Component, Inject } from '@angular/core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';

@Component({
	selector: 'app-dialog-confirm',
	templateUrl: './dialog-confirm.component.html',
	styleUrls: ['./dialog-confirm.component.scss'],
})
export class DialogConfirmComponent {
	constructor(
		public dialogRef: MatDialogRef<DialogConfirmComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { question: string },
	) {}

	public onNoClick(): void {
		this.dialogRef.close();
	}
}
