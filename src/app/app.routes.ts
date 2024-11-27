
import { Routes } from '@angular/router';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { SharePopupComponent } from './component/share-popup/share-popup.component';



export const routes: Routes = [
    {
        path:'upload',
        component:FileUploadComponent
    },
    {
        path:'share',
        component:SharePopupComponent
    }
];
