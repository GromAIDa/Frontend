import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { CoreModule } from '@core/core.module';
import { SvgService } from '@services/svg/svg.service';
import {
  MatSnackBarModule,
  MAT_SNACK_BAR_DEFAULT_OPTIONS,
} from '@angular/material/snack-bar';
import { ErrorHandler } from '@core/interseptors/errorHandler';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CurrencyMaskModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 7000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      },
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (service: SvgService) =>
        function () {
          return service.registerSvg();
        },
      multi: true,
      deps: [SvgService],
    },
    ErrorHandler,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandler,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
