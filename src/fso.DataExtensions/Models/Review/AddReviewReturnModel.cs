﻿

using fso.DataExtensions.Models;

namespace fso.DataExtensions.Models.Review
{
    public class AddReviewReturnModel : BaseReturnModel
    {
        public AddReviewReturnModel() : base() { }
        // Return added review to client.
        public ReviewActivityEntity Review { get; set; }
        // To use in notification event bus.
        public string PostAuthorId { get; set; }
    }
}