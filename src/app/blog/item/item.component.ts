import {Component, OnInit, OnDestroy} from '@angular/core';
import {BlogService} from "../../shared/services/BlogService";
import {BlogPost} from "../../shared/entities/BlogPost";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Rx";

@Component({
    moduleId: module.id,
    selector: 'app-item',
    templateUrl: 'item.component.html',
    styleUrls: ['item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

    /**
     * The current blog post.
     */
    private BlogPost: BlogPost;

    /**
     * The route params listener subscription
     */
    private routeParamsSubscription: Subscription;

    /**
     * Constructor of the blog post item component.
     *
     * @param route
     * @param blogPostService
     */
    constructor(
        private route: ActivatedRoute,
        private blogPostService: BlogService
    ) { }

    /**
     * Called on view init.
     */
    ngOnInit(): any {
        // Get params
        this.routeParamsSubscription = this.route.params.subscribe(params => {
            // Get the ID
            let id = parseInt(params['id']);

            // Retrieve blog posts
            this.blogPostService.get(id)
                .then(blogPost => this.BlogPost = blogPost);
        });
    }

    /**
     * Called on view destruction.
     */
    ngOnDestroy():void {
        // Unsubscribe params listener
        this.routeParamsSubscription.unsubscribe();
    }

}
