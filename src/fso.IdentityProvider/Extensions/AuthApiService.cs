using System;
using Microsoft.Extensions.Options;
using fso.IdentityProvider.Extensions.Helpers;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using System.Text;

namespace fso.IdentityProvider.Extensions
{
    public class AuthApiService : IAuthApiService
    {
        private readonly AppSettings _appSettings;
        private readonly ILogger _logger;
        public AuthApiService(
            IOptions<AppSettings> appSettings,
            ILoggerFactory loggerFactory
            )
        {
            _appSettings = appSettings.Value;
            _logger = loggerFactory.CreateLogger("AuthApiLogger");
        }
        public async void AddUserInfoAsync(string userId,string jwt)
        {
            // TODO : SECURE THE API
            try
            {
                object postInfo = new { userId = userId };
                var postJson = new JsonContent(postInfo);
                HttpClient htClient = new HttpClient();
                htClient.SetBearerToken(jwt);
                _logger.LogInformation("Content is is: {0}", postJson.ToString());
                var qw = await htClient.PostAsync(_appSettings.ApiUrl + "/Auth/AddUserInfo", postJson);
                _logger.LogInformation("Status Code = {0}", qw.StatusCode);
                qw.Dispose();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message ?? ex.InnerException.Message);
                throw;
            }
            
        }

        public async void RemoveUserInfoAsync(string userId, string jwt)
        {
            // TODO : SECURE THE API
            object postInfo = new { userId = userId };
            var postJson = new JsonContent(postInfo);
            HttpClient htClient = new HttpClient();
            var qw = await htClient.PostAsync(_appSettings.ApiUrl + "/Auth/removeuserinfo", postJson);

            qw.Dispose();
        }
    }
}
