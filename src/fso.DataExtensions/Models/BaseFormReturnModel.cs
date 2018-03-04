using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    public class BaseFormReturnModel
    {
        public bool IsActionSucceed { get; set; }
        public Dictionary<string,string> Errors { get; set; }
        public bool HasError => Errors==null ? false : Errors.Count != 0;
    }
}
