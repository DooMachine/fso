using fso.Core.Domains;
using fso.Core.Domains.Helpers.Enum;
using fso.DataExtensions.Models.Collections;
using fso.DataExtensions.Models.GroupReturnModels;
using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    /// <summary>
    /// This class used for show form
    /// </summary>
    public class AddPostReturnModel
    {
        public AddPostReturnModel()
        {
            PostParts = new List<PostPartDisplay>();
        }
        public string Title { get; set; }
        public string Content { get; set; }
        public PrivacyStatus PrivacyStatus { get; set; }
        public string Description { get; set; }
        public int Id { get; set; }
        public List<PostPartDisplay> PostParts { get; set; }
        // Paginate Selectlist
        public IEnumerable<CollectionCard> UserCollections { get; set; }
    }
    public class EditPostReturnModel: AddPostReturnModel
    {
        public EditPostReturnModel():base(){

        }
        public bool IsAvaliable { get; set; }
        public int PrevCollectionId { get; set; }
        
        public ICollection<InterestCard> PrevInterests { get; set;}
    }
}
