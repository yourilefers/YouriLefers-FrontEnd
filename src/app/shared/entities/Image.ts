/**
 * Created by yourilefers on 14-08-16.
 */

export class Image {
    /**
     * The descriptive title of the image.
     */
    public title:string;

    /**
     * The source URL of the image.
     */
    public source:string;

    /**
     * Parse the image from the API result.
     *
     * @param object
     * @return {BlogPost}
     * @constructor
     */
    public static ParseEntity(object:any): Image {
        let entity = new Image();
        entity.title = object.title;
        entity.source = object.source;
        return entity;
    }
}
