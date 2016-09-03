import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {BrowserModule} from '@angular/platform-browser';
import {enableProdMode, ApplicationRef, NgModule} from '@angular/core';
import {AppComponent, environment} from './app/';
import {MdRippleModule, RtlModule, PortalModule, OverlayModule} from "@angular2-material/core/core";
import {MdTooltipModule} from "@angular2-material/tooltip/tooltip";
import {MdToolbarModule} from "@angular2-material/toolbar/toolbar";
import {MdSidenavModule} from "@angular2-material/sidenav/sidenav";
import {MdMenuModule} from "@angular2-material/menu/menu";
import {MdListModule} from "@angular2-material/list/list";
import {MdInputModule} from "@angular2-material/input/input";
import {MdIconModule} from "@angular2-material/icon/icon";
import {MdCheckboxModule} from "@angular2-material/checkbox/checkbox";
import {MdButtonModule} from "@angular2-material/button/button";
import {routing, appRoutingProviders} from "./app/app.routing";
import {HomeComponent} from "./app/home/home.component";
import {AboutComponent} from "./app/about/about.component";
import {PortfolioComponent} from "./app/portfolio/portfolio.component";
import {ItemComponent as PortfolioItemComponent} from "./app/portfolio/item/item.component";
import {BlogComponent} from "./app/blog/blog.component";
import {ItemComponent as BlogItemComponent} from "./app/blog/item/item.component";
import {BlogService} from "./app/shared/services/BlogService";

@NgModule({
    imports: [
        BrowserModule,
        MdButtonModule,
        MdCheckboxModule,
        MdIconModule,
        MdInputModule,
        MdListModule,
        MdMenuModule,
        MdRippleModule,
        MdSidenavModule,
        MdToolbarModule,
        MdTooltipModule,
        OverlayModule,
        PortalModule,
        RtlModule,
        routing,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        PortfolioComponent,
        PortfolioItemComponent,
        BlogComponent,
        BlogItemComponent
    ],
    entryComponents: [
        AppComponent
    ],
    providers: [
        appRoutingProviders,
        BlogService
    ],
})
export class AppModule {
    constructor(private _appRef: ApplicationRef) { }

    ngDoBootstrap() {
        this._appRef.bootstrap(AppComponent);
    }
}

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);
