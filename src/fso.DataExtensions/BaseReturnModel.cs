namespace fso.DataExtensions.Models
{
    public class BaseReturnModel
    {
        public BaseReturnModel()
        {
            ErrorInformation = new ErrorReturnInformation()
            {
                ErrorType = ErrorType.NoAction,
                RedirectUrl = "",
                UserInformation = "Oops an error occured!"
            };
            SuccessInformation = new SuccessReturnInformation()
            {
                RedirectUrl = "",
                SuccessType = SuccessType.NoAction,
                UserInformation = "",
            };
            IsActionSucceed = true;
        }
        public bool IsActionSucceed { get; set; }

        public ErrorReturnInformation ErrorInformation { get; set; }

        public SuccessReturnInformation SuccessInformation { get; set; }
    }

    public class SuccessReturnInformation
    {
        public string UserInformation { get; set; }

        public string RedirectUrl { get; set; }

        public SuccessType SuccessType { get; set; }
    }
    
    public class ErrorReturnInformation
    {
        public string UserInformation { get; set; }        

        public string RedirectUrl { get; set; }

        public ErrorType ErrorType { get; set; }
    }

    public enum SuccessType
    {
        NoAction,
        Redirect,
        RedirectAuth,
        Logout
    }
    public enum ErrorType
    {
        NoAction,
        Redirect,
        RedirectAuth,
        Logout,
        NotFound
    }
}
