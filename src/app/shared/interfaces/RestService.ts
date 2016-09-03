/**
 * Created by yourilefers on 03-09-16.
 */
export interface RestService<T> {

    /**
     * Get a single entity of the type.
     *
     * @param id
     */
    get(id: number): Promise<T>;

    /**
     * Get all entities of the type.
     */
    all(): Promise<Array<T>>;

    /**
     * Create a new entity of the type.
     *
     * @param entity
     */
    add(entity: T): Promise<T>;

    /**
     * Update an entity of the type.
     *
     * The entity will only be updated when the 'id' parameter has been set.
     *
     * @param entity
     */
    update(entity: T, id?: number): Promise<T>;

    /**
     * Delete an entity of the type.
     *
     * Promise resolves TRUE when the entity was deleted.
     *
     * @param entity
     */
    remove(entity: T): Promise<boolean>;

}
