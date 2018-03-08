

namespace fso.DataExtensions.Models
{
    public class PublishPostReturnModel : BaseFormReturnModel
    {
        public PublishPostReturnModel():base(){}
        public int PublishedPostId { get; set; }
    }

    public class SaveEditingPostReturnModel : BaseFormReturnModel
    {
        public SaveEditingPostReturnModel():base(){}
        public int PublishedPostId { get; set; }
    }
    public class DeletePostReturnModel:BaseFormReturnModel{
        public DeletePostReturnModel() : base(){}
    }
}
