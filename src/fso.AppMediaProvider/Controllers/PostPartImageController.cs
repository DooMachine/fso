using EasyNetQ;
using fso.AppMediaProvider.Models;
using fso.AppMediaProvider.Settings;
using fso.EventCore;
using fso.EventCore.PostPartActions;
using ImageSharp;
using ImageSharp.Formats;
using ImageSharp.Processing;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Security.Claims;

namespace fso.AppMediaProvider.Controllers
{
    [EnableCors("CorsPolicy")]
    [Route("v1/[controller]")]
    public class PostPartImageController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly PostPartImageSettings _postPartImageSettings;
        private readonly IBus _bus;
        private string rootFolder;
        public PostPartImageController(
            IHostingEnvironment hostingEnvironment,
            IBus bus,
            IHttpContextAccessor httpContextAccessor,
            IOptions<PostPartImageSettings> settings
            )
        {
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _bus = bus;
            rootFolder = Path.Combine(_hostingEnvironment.WebRootPath);
            _postPartImageSettings = settings.Value;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UpdatePostPartImage(IFormFile postpartimage, string postpartid)
        {
            int postPartId = Convert.ToInt32(postpartid);
            Claim idClaim = User.FindFirst("sub");
            bool checkPostPartOwner = CheckPostPartOwner(postPartId, idClaim.Value);
            if (!checkPostPartOwner)
            {
                return Unauthorized();
            }
            UpdatePostPartImageReturnModel ret = new UpdatePostPartImageReturnModel();
            try
            {
                string largeUrlPath = "";
                string thumbUrlPath = "";
                string lazyUrlPath = "";
                string smallUrlpath = "";
                PostPartImageUpdatedAction busAction = new PostPartImageUpdatedAction()
                {
                    DateUtcAction = DateTime.UtcNow,
                    PostPartId = postPartId,
                    FileExtension = "jpeg"
                };
                Stream outputStream = new MemoryStream();
                string rootPath = _httpContextAccessor.HttpContext.Request.Host.ToString();
                var prefx = _httpContextAccessor.HttpContext.Request.IsHttps ? "https://" : "http://";

                string fileName = postpartimage.FileName;
                var headers = postpartimage.Headers;
                string userId = User.FindFirst("sub").Value;
                // Check if directory Exist
                var directoryPath = Path.Combine(rootFolder, "fimg/pp/" + postpartid);
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                // Large Resizing
                using (Image image = new Image(postpartimage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });                    
                    image.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _postPartImageSettings.PostPartLargeMaxHeight,
                            Width = _postPartImageSettings.PostPartLargeMaxWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    busAction.Dimension = (((float)image.Width / (float)image.Height)).ToString();
                    var path = Path.Combine(rootFolder, "fimg/pp/" + postpartid + "/"+ imageWidth + "x"+imageHeight+".jpeg");
                    
                    image.Save(path);
                    largeUrlPath = prefx + rootPath + "/fimg/pp/" + postpartid + "/" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.LargeImageUrl = largeUrlPath;
                };
                // Thumb Resizing
                using (Image image = new Image(postpartimage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _postPartImageSettings.PostPartThumbMaxHeight,
                            Width = _postPartImageSettings.PostPartThumbMaxWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg/pp/" + postpartid + "/" + imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    thumbUrlPath = prefx + rootPath + "/fimg/pp/" + postpartid + "/" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.ThumbImageUrl = thumbUrlPath;
                };
                // Small Resizing
                using (Image image = new Image(postpartimage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _postPartImageSettings.PostPartSmallMaxHeight,
                            Width = _postPartImageSettings.PostPartSmallMaxWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg/pp/" + postpartid + "/" + imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    smallUrlpath = prefx + rootPath + "/fimg/pp/" + postpartid + "/" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.SmallImageUrl = smallUrlpath;
                };
                using (Image image = new Image(postpartimage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = 30,
                            Width = 30
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg/pp/" + postpartid + "/lazy.jpeg");

                    image.Save(path);
                    lazyUrlPath = prefx + rootPath + "/fimg/pp/" + postpartid + "/lazy.jpeg";
                    busAction.LazyImageUrl = lazyUrlPath;
                };
                outputStream.Dispose();                
               
                _bus.Publish<PostPartImageUpdatedAction>(busAction);

                ret.IsSucceed = true;
                ret.PostPartId = postPartId;
                // Disable browser cache via qparam
                ret.LargeImageUrl = largeUrlPath + "?v=" + DateTime.UtcNow.Millisecond.ToString();
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
        public bool CheckPostPartOwner(int postPartId,string currUserId)
        {
            var req = new CheckUserPostPartOwner { UserId =currUserId ,PostPartId = postPartId};
            var response = _bus.Request<CheckUserPostPartOwner, CheckUserPostPartOwnerResponse>(req);
            return response.IsOkay;
        }
    }
}
