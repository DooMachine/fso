using System.ComponentModel.DataAnnotations;

namespace fso.Core.Domains
{
    public class UserActivity : BaseEntity
    {
        [StringLength(64)]
        public string AppUserId { get; set; }
        /// <summary>
        /// The Primary Entity Id( Eg. Comment,Review,Collection)
        /// </summary>
        public int? SourceEntityId { get; set; }
        /// <summary>
        /// The Secondary (Effected) Entity Id( Eg. Comment,Review,Collection)
        /// </summary>
        public int? ParentEntityId { get; set; }
        public ParentEntityType ParentEntityType { get; set; }
        public UserActivityType FeedType { get; set; }
    }
    public enum UserActivityType
    {
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
        Post_Got_In_Trends,
        Follow_Group,
        Unfollow_Group
    }
    public enum ParentEntityType
    {
        Comment,
        Collection,
        Review,
        User,
        Post,
        Group,
        None
    }
}
