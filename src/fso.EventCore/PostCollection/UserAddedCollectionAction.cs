
using fso.Core.Domains;

namespace fso.EventCore
{
    public class UserAddedCollectionAction : BaseAction
    {
        public PostCollection PostCollection { get; set; }
    }
}
