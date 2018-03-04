using Newtonsoft.Json;
using System.Net.Http;
using System.Text;

namespace fso.IdentityProvider.Extensions.Helpers
{
    public class JsonContent : StringContent
    {
        public JsonContent(object obj) :
            base(JsonConvert.SerializeObject(obj), Encoding.UTF8, "application/x-www-form-urlencoded")
        { }
    }
}
