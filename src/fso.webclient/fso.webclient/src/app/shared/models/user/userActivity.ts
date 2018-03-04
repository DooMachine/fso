export class UserActivity {
    constructor(userName: string) {
        this.userName = userName;
    }
    id: string;
    /// <summary>
    /// The Primary Entity Id( Eg. Comment,Review,Collection)
    /// </summary>
    primaryEntity: any;
    feedType: UserActivityType;
    /// <summary>
    /// The Secondary (Effected) Entity Id( Eg. Comment,Review,Collection)
    /// </summary>
    parentEntity?: any;
    parentEntityType?: ParentEntityType;
    dateUtcActivity: Date;
    userName: string;
    /// <summary>
    /// The Explanation that will users see for example.
    /// (username added new collection named primaryEntity.name) or ( userName followed parentEntity.userName )
    /// </summary>
    _activityExplanation = '';
    get activityExplanation(): string {
        return this._activityExplanation;
    }
    set activityExplanation(theActivityExplanation: string) {
        this._activityExplanation =  `${this.userName} Implement Activity Explanation`;
    }
}


export enum UserActivityType {

    Add_Post_To_Favourites,
    Add_Review_To_Post,
    Like_Review_Of_Post,
    Add_Comment_To_Review,
    Add_Comment_To_Comment,
    Like_Comment,
    Follow_User,
    Add_New_Collection,
    Add_New_Post,
    Add_New_Post_To_Collection,
    Post_Got_In_Trends
}
export enum ParentEntityType {

    Comment,
    Collection,
    Review,
    User,
    Post
}
