import {Component, ViewEncapsulation, ViewChild, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MdIconRegistry} from "@angular2-material/icon";

@Component({
    moduleId: module.id,
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

    // The sidenav element
    @ViewChild('end') sidenav: any;

    // Whether the sidenav is open or not.
    private sideNavOpen:boolean = false;

    /**
     * Setup the icon registry in the base component.
     * @param _mdIconRegistry
     * @param _router
     */
    constructor(private _mdIconRegistry: MdIconRegistry, private _router: Router) {
        // Register social icons
        this._mdIconRegistry.registerFontClassAlias('socicon', 'socicon');

        // Register to router event to catch 'route changed' events
        // this._router.events.subscribe(event => {
        //     if (event instanceof NavigationEnd) {
        //         // this.sidenav
        //         //     .close()
        //         //     .then(() => {}, () => {});
        //     }
        // })
    }

    /**
     * View init callback.
     */
    ngOnInit():void {
        this.sidenav.onOpenStart.subscribe(() => {
            this.sideNavOpen = true;
        });
        this.sidenav.onCloseStart.subscribe(() => {
            this.sideNavOpen = false;
        });
    }

}
