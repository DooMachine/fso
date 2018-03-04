using fso.Core;
using fso.Core.Domains;
using Newtonsoft.Json;
using System;

namespace fso.DataExtensions.Models
{
    /// <summary>
    /// Declare like =>
    /// var activityList = new List<IUserActivity>();
    /// </summary>
    /// <typeparam name="T">BaseEntity</typeparam>
    public class UserActivityDTO<T> where T : IActivityEntity
    {
        public int Id { get; set; }
        public DateTime DateUtcActivity { get; set; }
        public string AppUserId { get; set; }
        [JsonIgnore]
        public Type Type
        {
            get
            {
                return typeof(T);
            }
        }
        /// <summary>
        /// The Primary Entity Id( Eg. Comment,Review,Collection)
        /// </summary>
        public T PrimaryEntity { get; set; }
        /// <summary>
        /// The Secondary (Effected) Entity Id( Eg. Comment,Review,Collection)
        /// </summary>
        public T ParentEntity { get; set; }
        public ParentEntityType ParentEntityType { get; set; }
        public UserActivityType FeedType { get; set; }
    }
    public interface IUserActivity
    {

    }
}
