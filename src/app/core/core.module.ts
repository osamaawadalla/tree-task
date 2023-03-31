import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, RouterModule, withPreloading } from '@angular/router';
import { appRoutes } from '../app-routes';
import { throwIfAlreadyLoaded } from './guards/module-import/module-import.guard';
import { TokenInterceptor } from './interceptor/token/token.interceptor';



@NgModule({
  declarations: [],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}