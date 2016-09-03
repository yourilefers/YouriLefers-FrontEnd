import {Image} from "./Image";

export class PortfolioItem {
    /**
     * Portfolio item ID.
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
     * The body of the blog post.
     */
    public body:string;

    /**
     * The link to the portfolio item.
     */
    public link:string;

    /**
     * The category
     */
    public category:string;

    /**
     * The body of the blog post.
     */
    public tools:string;

    /**
     * Parse the blog post from the API result.
     *
     * @param object
     * @return {BlogPost}
     * @constructor
     */
    public static ParseEntity(object:any): PortfolioItem {
        let entity = new PortfolioItem();
        entity.id = parseInt(object.id);
        entity.title = object.title;
        entity.body = object.body;
        entity.link = object.link;
        entity.category = object.category;
        entity.tools = object.tools;
        entity.image = Image.ParseEntity(object.image);
        return entity;
    }
}
