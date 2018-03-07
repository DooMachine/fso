using EasyNetQ;
using fso.AppMediaProvider.Models;
using fso.AppMediaProvider.Settings;
using fso.EventCore;
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
    public class PostCollectionImageController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly PostCollectionImageSettings _collectionimageSettings;
        private readonly IBus _bus;
        private string rootFolder;
        public PostCollectionImageController(
            IHostingEnvironment hostingEnvironment,
            IBus bus,
            IHttpContextAccessor httpContextAccessor,
            IOptions<PostCollectionImageSettings> settings
            )
        {
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _bus = bus;
            rootFolder = Path.Combine(_hostingEnvironment.WebRootPath);
            _collectionimageSettings = settings.Value;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UpdatePostCollectionImage(IFormFile collectionimage, string collectionid)
        {
            if(collectionimage == null || string.IsNullOrEmpty(collectionid))
            {
                return BadRequest();
            }
            int colId = Convert.ToInt32(collectionid);
            Claim idClaim = User.FindFirst("sub");
            bool checkPostPartOwner = CheckPostCollectionOwner(colId, idClaim.Value);
            if (!checkPostPartOwner)
            {
                return Unauthorized();
            }
            UpdatePostCollectionImageReturnModel ret = new UpdatePostCollectionImageReturnModel();
            try
            {
                string thumbUrlPath = "";
                string lazyUrlPath = "";
                string smallUrlpath = "";
                PostCollectionImageUpdatedAction busAction = new PostCollectionImageUpdatedAction()
                {
                    DateUtcAction = DateTime.UtcNow,
                    CollectionId = colId,
                    FileExtension = "jpeg",                    
                };
                Stream outputStream = new MemoryStream();
                string rootPath = _httpContextAccessor.HttpContext.Request.Host.ToString();
                var prefx = _httpContextAccessor.HttpContext.Request.IsHttps ? "https://" : "http://";

                string fileName = collectionimage.FileName;
                var headers = collectionimage.Headers;
                string userId = User.FindFirst("sub").Value;
                // Check if directory Exist
                var directoryPath = Path.Combine(rootFolder, "fimg/c/" + collectionid);
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                // Thumb Resizing
                using (Image image = new Image(collectionimage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {
                        
                        Mode = ResizeMode.Min,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _collectionimageSettings.PostCollectionThumbMaxHeight,
                            Width = _collectionimageSettings.PostCollectionThumbMaxWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg/c/" + collectionid + "/" + imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    thumbUrlPath = prefx + rootPath + "/fimg/c/" + collectionid + "/" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.ThumbImageUrl = thumbUrlPath;
                };
                // Small Resizing
                using (Image image = new Image(collectionimage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _collectionimageSettings.PostCollectionSmallMaxHeight,
                            Width = _collectionimageSettings.PostCollectionSmallMaxWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg/c/" + collectionid + "/" + imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    smallUrlpath = prefx + rootPath + "/fimg/c/" + collectionid + "/" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.SmallImageUrl = smallUrlpath;
                };
                using (Image image = new Image(collectionimage.OpenReadStream()))
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
                    var path = Path.Combine(rootFolder, "fimg/c/" + collectionid + "/lazy.jpeg");

                    image.Save(path);
                    lazyUrlPath = prefx + rootPath + "/fimg/c/" + collectionid + "/lazy.jpeg";
                    busAction.LazyImageUrl = lazyUrlPath;
                };
                outputStream.Dispose();

                _bus.Publish<PostCollectionImageUpdatedAction>(busAction);

                ret.IsSucceed = true;
                ret.PostCollectionId = colId;
                // Disable browser cache via qparam
                ret.ThumbImageUrl = thumbUrlPath + "?v=" + DateTime.UtcNow.Millisecond.ToString();
                return Ok(Json(ret));
            }
            catch (Exception ex)
            {
                return BadRequest(Json(ex));
            }
        }
        private static bool IsJpeg(string fileName)
        {
            return fileName.EndsWith(".jpeg");
        }
        private bool CheckPostCollectionOwner(int collectionid, string currUserId)
        {
            var req = new CheckUserCollectionOwner { UserId = currUserId, CollectionId = collectionid };
            var response = _bus.Request<CheckUserCollectionOwner, CheckUserCollectionOwnerResponse>(req);
            return response.IsOkay;
        }
    }
}
