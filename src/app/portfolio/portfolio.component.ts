import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {PortfolioItem} from "../shared/entities/PortfolioItem";

@Component({
  moduleId: module.id,
  selector: 'app-portfolio',
  templateUrl: 'portfolio.component.html',
  styleUrls: ['portfolio.component.css']
})
export class PortfolioComponent implements OnInit, OnDestroy {

    /**
     * The list of blog posts.
     * @type {Array}
     */
    private PortfolioItems:Array<PortfolioItem> = [];

    /**
     * The current item it scrolled to.
     * @type {number}
     * @private
     */
    public _scrolledItem = 0;

    //
    // Construction
    //

    /**
     * Blog component constructor.
     */
    constructor(private ngZone: NgZone) {
        this.PortfolioItems.push(PortfolioItem.ParseEntity({
            id: 1,
            title: 'GoInCtrl (in development)',
            created: '1 September 2016',
            image: {title: 'Image title 1', 'source': 'http://placehold.it/922x475'},
            body: `
<p>GoInCtrl is an online application that oil measurement labs use to communicate the results with their customers. 
GoInCtrl will be used by multiple big labs in the lubricating oil (analysis) industry.</p>
<p>I've developed most of the application. The application back-end has been build with Symfony 3 and communicates
with a SSO server developed by us. The front-end has been build with <a href="http://angular.io">Angular 2</a>. This was
quite a challenge, because Angular 2 is still a RC and doens't have a stable version yet.</p>
            `,
            link: 'https://www.goinctrl.nl',
            category: 'Web application',
            tools: 'Angular 2, Symfony 3'
        }));
        this.PortfolioItems.push(PortfolioItem.ParseEntity({
            id: 2,
            title: 'My Daily Planner',
            created: '1 August 2016',
            image: {title: 'My Daily Planner', 'source': 'images/portfolio/mydailyplanner.png'},
            body: `
<p>MyDailyPlanner is an online appointment platform for small businesses. Businesses can subscribe to MyDailyPlanner and
are able to use MyDailyPlanner as their online agenda and CRM system. It also has the ability for customer to plan their
appointment using MyDailyPlanner.</p>
            `,
            link: 'https://www.mydailyplanner.com',
            category: 'Web application',
            tools: 'Drupal v7, AngularJS 1.5'
        }));
        this.PortfolioItems.push(PortfolioItem.ParseEntity({
            id: 3,
            title: 'Alex Vreeman',
            created: '1 Juli 2016',
            image: {title: 'Alex Vreeman', 'source': 'images/portfolio/alexvreeman.png'},
            body: `<p>Alex Vreeman is a portrait photographer that wanted to have a fully functional iOS and Android mobile 
            application that functions as a portfolio. The website had to be sober and only show core business information.
            The application functions as his only portfolio that displays news about him and his collections of photographs.</p>`,
            link: 'http://www.alexvreeman.nl',
            category: 'Website & Mobile application',
            tools: 'Drupal v7, AngularJS 1.5, PhoneGap'
        }));
    }

    /**
     * Called on view init.
     */
    ngOnInit() {
        // Register scroll event listener
        this.registerScrollEvent();
    }

    /**
     * Called on view destruction.
     */
    ngOnDestroy():void {
        this.deRegisterScrollEvent();
    }

    //
    // Scrolling
    //

    /**
     * The scroll defer.
     * @private
     */
    private _scrollDefer = false;

    /**
     * The previous amount of pixels scrolled down.
     * @type {number}
     * @private
     */
    private _previousScrollState = 0;

    /**
     * Called on the scroll event.
     *
     * This method will scroll the window to the given item. The function allows the user
     * to resize the screen.
     *
     * @param event
     */
    private scrollEvent(event:JQueryEventObject) {
        if(!this._scrollDefer) {
            // De-register the scroll event
            this.deRegisterScrollEvent();

            // Create defer
            this._scrollDefer = true;

            // Get md-content instance and the window height
            let $mdContent = jQuery('#content'), windowHeight = jQuery(window).height();

            // Scroll down?
            if ($mdContent.scrollTop() > this._previousScrollState) {

                // Scroll down

                // Increase count
                if (this.PortfolioItems.length > (this._scrolledItem - 1)) this._scrolledItem++;
            } else {

                // Scroll up

                // Increase count
                if (this._scrolledItem > 0) this._scrolledItem--;
            }

            // Calculate the new position
            let newPosition = windowHeight * this._scrolledItem;

            // Set previous
            this._previousScrollState = newPosition;

            // Scroll
            $mdContent.animate({scrollTop: newPosition}, {
                complete: () => {
                    console.log('complete');
                    setTimeout(() => {
                        console.log('timeout complete');
                        this._scrollDefer = false;
                        this.registerScrollEvent();
                    }, 1000);
                },
                duration: 500
            });
        }
    }

    /**
     * Function that registers the scroll event listener.
     */
    private registerScrollEvent(): void {
        jQuery('#content').on('scroll touchmove', (event:JQueryEventObject) => {
            console.log('scroll event');
            event.preventDefault();
            event.stopPropagation();
            this.ngZone.run(() => this.scrollEvent(event));
            return false;
        });
    }

    /**
     * Function that registers the scroll event listener.
     */
    private deRegisterScrollEvent(): void {
        jQuery('#content').off('scroll touchmove');
    }

}
