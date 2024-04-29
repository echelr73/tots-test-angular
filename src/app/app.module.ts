import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TOTS_CORE_PROVIDER, TotsCoreModule } from '@tots/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TOTS_AUTH_PROVIDER, TotsAuthConfig, TotsAuthInterceptor, TotsAuthModule } from '@tots/auth';
import { TOTS_CLOUD_STORAGE_PROVIDER } from '@tots/cloud-storage';
import { TableComponent } from './pages/table/table.component';
import { TOTS_TABLE_DEFAULT_CONFIG, TotsTableModule } from '../../tots_table/table/src/public-api';
import { totsTableDefaultConfig } from './entities/tots-table-default-config';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TotsDateColumnModule } from 'tots_table/date-column/src/public-api';
import { TotsEditableColumnsModule } from 'tots_table/editable-columns/src/public-api';
import { MatMenuModule } from '@angular/material/menu';
import { TotsFormModule } from 'tots_form/form/src/public-api';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,

    TotsCoreModule,
    TotsAuthModule,
    TotsDateColumnModule,
    TotsEditableColumnsModule,
    BrowserAnimationsModule,
    TotsTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    HttpClientModule,
    MatMenuModule,
    MatFormFieldModule,
    TotsFormModule,
  ],
  providers: [
    {
      provide: TOTS_CORE_PROVIDER,
      useValue: {
        baseUrl: 'https://agency-coda.uc.r.appspot.com/'
      }
    },
    {
      provide: TOTS_CLOUD_STORAGE_PROVIDER,
      useValue: {
        bucket: 'codahub-files'
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TotsAuthInterceptor,
      multi: true
    },
    {
      provide: TOTS_AUTH_PROVIDER,
      useValue: {
        signInPath: 'oauth/token',
        changePasswordPath: 'users/me/password',
      } as TotsAuthConfig
    },
    {
      provide: TOTS_TABLE_DEFAULT_CONFIG,
      useValue: totsTableDefaultConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
