using fso.Core.Domains.Helpers;
using fso.DataExtensions.Models;
using fso.DataExtensions.Models.GroupReturnModels;

namespace fso.Api.Models.Auth
{
    public class FirstLoginViewModel : BaseReturnModel
    {
        public FirstLoginViewModel(): base()
        {

        }
        public bool IsFirst { get; set; }
        
        public PaginatedList<InterestCard> Groups { get; set; }

    }

    public class FirstLoginInfiniteGroupModel : BaseReturnModel
    {
        public FirstLoginInfiniteGroupModel() : base()
        {
        }
        public PaginatedList<InterestCard> Groups { get; set; }

        public bool IsMoreGroup { get; set; }
    }
}
