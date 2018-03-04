

namespace fso.DataExtensions.Models.GroupReturnModels.GroupAdd
{
    public class GroupAddReturn : BaseReturnModel
    {
    }


    public class GroupIsValidUrlKeyReturn : BaseReturnModel
    {
        public GroupIsValidUrlKeyReturn() : base()
        {

        }
        public bool IsExist { get; set; }
    }
}
