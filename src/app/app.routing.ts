import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {PortfolioComponent} from "./portfolio/portfolio.component";
import {ItemComponent as PortfolioItemComponent} from "./portfolio/item/item.component";
import {BlogComponent} from "./blog/blog.component";
import {ItemComponent as BlogItemComponent} from "./blog/item/item.component";

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'portfolio', component: PortfolioComponent },
    { path: 'portfolio/:id', component: PortfolioItemComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/:id', component: BlogItemComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home' }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
