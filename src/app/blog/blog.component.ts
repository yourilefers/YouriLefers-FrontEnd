import {Component, OnInit, OnDestroy, NgZone} from '@angular/core';
import {BlogPost} from "../shared/entities/BlogPost";
import {BlogService} from "../shared/services/BlogService";

declare var $: any;

@Component({
    moduleId: module.id,
    selector: 'app-blog',
    templateUrl: 'blog.component.html',
    styleUrls: ['blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {

    /**
     * The list of blog posts.
     * @type {Array}
     */
    public BlogPosts:Array<BlogPost> = [];

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
    constructor(
        private ngZone: NgZone,
        private blogPostService: BlogService
    ) {}

    /**
     * Called on view init.
     */
    ngOnInit() {
        // Register scroll event
        this.registerScrollEvent();

        // Retrieve blog posts
        this.blogPostService.all()
            .then(BlogPosts => {
                // Run as ngZone
                this.ngZone.run(() => {
                    // Set blog posts
                    this.BlogPosts = BlogPosts;
                })
            });
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
                if (this.BlogPosts.length > (this._scrolledItem - 1)) this._scrolledItem++;
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
