import {BlogPost} from "../entities/BlogPost";
import {RestService} from "../interfaces/RestService";
import {Observable, Observer} from "rxjs/Rx";

/**
 * Created by yourilefers on 03-09-16.
 */
export class BlogService implements RestService<BlogPost> {

    /**
     * The list of blog posts.
     */
    private BlogPosts: any = {};

    /**
     * Service constructor.
     *
     * Will setup the blog posts array.
     */
    constructor() {
        this.BlogPosts[1] = (BlogPost.ParseEntity({
            id: 1,
            title: 'New website',
            created: '1 September 2016',
            image: {title: 'New website', 'source': 'http://placehold.it/922x475'},
            body: `
            <p>Yay! A new website!</p>
`
        }));
    }

    /**
     * Get a single blog post by it's ID or null when it doesn't exist.
     *
     * @param id
     * @return {Promise<BlogPost>}
     */
    get(id:number):Promise<BlogPost> {
        // Return the new promise
        return (new Observable<BlogPost>((observer: Observer<BlogPost>) => {
            // Does the blogpost exist?
            if(this.BlogPosts[id]) {
                observer.next(this.BlogPosts[id]);
            } else {
                observer.error(null);
            }

            // Complete the observer
            observer.complete();
        })).toPromise();
    }

    /**
     * Get all blog posts.
     *
     * @return {Promise<Array<BlogPost>>}
     */
    all():Promise<Array<BlogPost>> {
        // Return the new promise
        return (new Observable<Array<BlogPost>>((observer: Observer<Array<BlogPost>>) => {
            // Create the list of blogposts
            let blogPosts = [];
            for (let blogPost in this.BlogPosts) {
                blogPosts.push(this.BlogPosts[blogPost]);
            }

            // Complete the observer
            observer.next(blogPosts);
            observer.complete();
        })).toPromise();
    }

    /**
     * Add a single blog post.
     *
     * @param entity
     * @return {Promise<BlogPost>}
     */
    add(entity:BlogPost):Promise<BlogPost> {
        // Return the new promise
        return (new Observable<BlogPost>((observer: Observer<BlogPost>) => {
            // Does the entity already have a new ID?
            if(!entity.id) {
                // Get the last known ID
                let keys = Object.keys(this.BlogPosts);
                let lastKnownKey = keys.pop();

                // Set the ID
                entity.id = parseInt(lastKnownKey) + 1;
            }

            // Update the blog post
            this.BlogPosts[entity.id] = entity;

            // Complete the observer
            observer.next(entity);
            observer.complete();
        })).toPromise();
    }

    /**
     * Update a blog post by it's internal ID or the given ID parameter.
     *
     * @param entity
     * @param id
     * @return {Promise<BlogPost>}
     */
    update(entity:BlogPost, id?:number):Promise<BlogPost> {
        // Return the new promise
        return (new Observable<BlogPost>((observer: Observer<BlogPost>) => {
            // External ID set?
            if(!id && !entity.id) {
                observer.error(null);
                observer.complete();
                return;
            } else if (!id) {
                id = entity.id;
            }

            // Update the blog post
            this.BlogPosts[id] = entity;

            // Complete the observer
            observer.next(entity);
            observer.complete();
        })).toPromise();
    }

    /**
     * Delete a blog post.
     *
     * @param entity
     * @return {Promise<boolean>}
     */
    remove(entity:BlogPost):Promise<boolean> {
        // Return the new promise
        return (new Observable<boolean>((observer: Observer<boolean>) => {
            // External ID set?
            if(!entity.id || !this.BlogPosts[entity.id]) {
                observer.next(false);
                observer.complete();
                return;
            }

            // Update the blog post
            delete this.BlogPosts[entity.id];

            // Complete the observer
            observer.next(true);
            observer.complete();
        })).toPromise();
    }

}

interface IBlogPosts {
    number: BlogPost
}
