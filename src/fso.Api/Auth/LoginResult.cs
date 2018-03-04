using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace fso.Api.Auth
{
    public class LoginResult
    {
        public string IdentityServerResponse { get; set; }
        public bool IsSuccessful { get; set; }
    }
}
