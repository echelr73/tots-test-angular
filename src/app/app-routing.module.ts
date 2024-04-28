import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableComponent } from './pages/table/table.component';
import { FormComponentComponent } from './pages/form-component/form-component.component';

const routes: Routes = [
  { path: '', component: TableComponent },
  { path: 'form', component: FormComponentComponent },
  //{ path: 'sidebar', component: FormSidebarComponent },
  //{ path: 'wizard', component: FormWizardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
