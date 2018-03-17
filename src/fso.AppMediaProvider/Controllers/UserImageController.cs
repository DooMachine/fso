using System;
using System.IO;
using EasyNetQ;
using fso.AppMediaProvider.Models;
using fso.EventCore.UserSettingsActions;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Processing;
using SixLabors.ImageSharp.Processing.Transforms;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.Primitives;

namespace fso.AppMediaProvider.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("v1/[controller]")]
    public class UserImageController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IBus _bus;
        private string rootFolder;
        public UserImageController(IHostingEnvironment hostingEnvironment, IBus bus, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _bus = bus;
            rootFolder = Path.Combine(_hostingEnvironment.WebRootPath);
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public  IActionResult UpdateProfileImage(IFormFile userImage)
        {
            UpdateUserImageReturnModel ret = new UpdateUserImageReturnModel();
            try
            {            
                Stream outputStream = new MemoryStream();
                string fileName = userImage.FileName;
                var headers = userImage.Headers;
                string userId = User.FindFirst("sub").Value;
                using (Image<Rgba32> image = Image.Load(userImage.OpenReadStream()))
                {
                    
                    image.SaveAsJpeg(outputStream);
                    image.Mutate(p=>p.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Crop,
                        Compand = true,
                        Position = AnchorPositionMode.Center,
                        Size = new Size()
                        {
                            Height = 330,
                            Width = 330
                        }
                    }).AutoOrient());
                    var directoryPath = Path.Combine(rootFolder, "fimg/u/" + userId);
                    var path = Path.Combine(rootFolder, "fimg/u/" + userId + "/330x330.jpeg");
                    if (!Directory.Exists(directoryPath))
                    {
                        Directory.CreateDirectory(directoryPath);
                    }
                    image.Save(path);
                }
                outputStream.Dispose();
                string rootPath = _httpContextAccessor.HttpContext.Request.Host.ToString();
                var prefx = _httpContextAccessor.HttpContext.Request.IsHttps ? "https://" : "http://";
                string absUrlPath = prefx + rootPath + "/fimg/u/" + userId + "/330x330.jpeg";

                _bus.Publish<UserUpdatedProfileImageAction>(new UserUpdatedProfileImageAction()
                {
                    DateUtcAction = DateTime.UtcNow,
                    UserId = userId,
                    ImagePath = absUrlPath
                });

                ret.IsSucceed = true;
                // Disable browser cache via qparam
                ret.CurrentProfileImageUrl = absUrlPath+"?v="+DateTime.UtcNow.Millisecond.ToString();
                return Ok(Json(ret));
                }
            catch (Exception)
            {
                return BadRequest(Json(ret));
            }
        }
        public static bool IsJpeg(string fileName)
        {
            return fileName.EndsWith(".jpeg");
        }
    }
}