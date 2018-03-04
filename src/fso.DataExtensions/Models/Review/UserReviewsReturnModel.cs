using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models;
using System.Collections.Generic;

namespace fso.DataExtensions.Models.Review
{
    public class UserReviewsReturnModel : PaginatedReturn<ReviewActivityEntity>
    {
        public List<PostActivityEntity> Posts { get; set; }
    }
}
