using fso.Core.Domains.Helpers;

namespace fso.DataExtensions.Models
{
    public class UserFeedReturn : PaginatedReturn<UserActivityDTO<IActivityEntity>>
    {
        public UserFeedReturn()
        {
        }

    }
}
