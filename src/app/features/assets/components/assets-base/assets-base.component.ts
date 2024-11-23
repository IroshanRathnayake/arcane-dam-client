import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../services/asset.service';
import { CommonModule } from '@angular/common';
import { Alert, AlertService } from '../../../../shared/services/alert.service';
import { Asset } from '../../models/asset';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-assets-base',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assets-base.component.html',
  styleUrls: ['./assets-base.component.css'],
})
export class AssetsBaseComponent implements OnInit{
  loading: boolean = false;
  alerts: Alert[] = [];
  isModalOpen: boolean = false;
  files: File[] = [];
  selectedAsset: Asset | null = null;;
  isFolderSelected: boolean = false;
  dataList: Asset[] = [];

  folders: any[] = [
    { name: 'Folder 1', date: '2024-11-21' },
    { name: 'Folder 2', date: '2024-11-22' },
    { name: 'Folder 3', date: '2024-11-23' },
  ];

  selectedTab: string = 'All';

  constructor(private assetService: AssetService, private alertService: AlertService, private authService: AuthService) {}
 
  ngOnInit(): void {
    this.alertService.alert$.subscribe((alerts) => {
      this.alerts = alerts;
    });
    this.getAssetsBySpaceId();
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
  selectFolder(folder: any) {
    this.isFolderSelected = true;
  }


  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach((file) => this.files.push(file));
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.files = [];
  }

  onFileDrop(event: DragEvent) {
    event.preventDefault();
    const dataTransfer = event.dataTransfer;
    if (dataTransfer && dataTransfer.files) {
      Array.from(dataTransfer.files).forEach((file) => this.files.push(file));
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  removeFile(index: number) {
    this.files.splice(index, 1);
  }

  clearFiles() {
    this.files = [];
  }

  async onUpload() {
    this.loading = true;

    if (this.files && this.files.length > 0) {
      for (const file of this.files) {
        console.log(file);
        (await this.assetService.upload([file])).subscribe({
          next: (event: any) => {
            this.alertService.showAlert('success', 'File uploaded successfully');
            this.getAssetsBySpaceId();
            this.isModalOpen = false;
            this.files = [];
          },
          error: (error: any) => {
            this.alertService.showAlert('error', 'File upload failed');
            console.error('File upload failed:', error);
          },
          complete: () => {
            this.loading = false;
          },
        });
      }
    } else {
      this.loading = false;
      console.warn('No files selected for upload.');
    }
  }

  getAssetsBySpaceId(): void{
    const spaceId = this.authService.getCurrentSpaceID();
    this.assetService.getAssetsBySpaceId(spaceId).subscribe({
      next: (data) => {
        this.dataList = data;
      },
      error: (err) => {
        console.error('Error fetching assets:', err);
      },
    });
  }

  onSelectAsset(asset: any): void {
    this.selectedAsset = asset;
  }

  deleteAsset(fileId: string): void {
    this.assetService.deleteFile(fileId).subscribe({
      next: () => {
        console.log('Delete request successful');
        this.alertService.showAlert('success', 'File deleted successfully');
        this.getAssetsBySpaceId(); 
        this.selectedAsset = null;
      },
      error: (error) => {
        console.error('Error deleting file:', error);
        this.alertService.showAlert('error', 'Failed to delete the file');
      },
    });
  }
  

  downloadAsset(asset: Asset): void {
    this.assetService.downloadFile(asset.id).subscribe({
      next: (response: ArrayBuffer) => {
        const blob = new Blob([response], { type: asset.fileType });
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = asset.fileName; 
        anchor.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading file', error);
      },
    });
  }
  

  editAsset(asset: any): void {
   
  }

}
