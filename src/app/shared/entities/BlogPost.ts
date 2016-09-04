import {Image} from "./Image";

/**
 * Created by yourilefers on 14-08-16.
 */
export class BlogPost {
    /**
     * Blog post item ID.
     */
    public id:number;

    /**
     * The title of the blog post.
     */
    public title:string;

    /**
     * The image of the blog post.
     */
    public image:Image;

    /**
     * The created date of the blog post.
     */
    public created:string;

    /**
     * The body of the blog post.
     */
    public body:string;

    /**
     * Parse the blog post from the API result.
     *
     * @param object
     * @return {BlogPost}
     * @constructor
     */
    public static ParseEntity(object:any): BlogPost {
        let entity = new BlogPost();
        entity.id = parseInt(object.id);
        entity.title = object.title;
        entity.created = object.created;
        entity.body = object.body;
        entity.image = Image.ParseEntity(object.image);
        return entity;
    }
}
