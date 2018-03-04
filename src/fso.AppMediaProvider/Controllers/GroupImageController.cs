using EasyNetQ;
using fso.AppMediaProvider.Models;
using fso.AppMediaProvider.Settings;
using fso.EventCore;
using fso.EventCore.GroupActions;
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
    public class GroupImageController : Controller
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly GroupImageSettings _groupImageSettings;
        private readonly IBus _bus;
        private string rootFolder;
        public GroupImageController(
            IHostingEnvironment hostingEnvironment,
            IBus bus,
            IHttpContextAccessor httpContextAccessor,
            IOptions<GroupImageSettings> settings
            )
        {
            _httpContextAccessor = httpContextAccessor;
            _hostingEnvironment = hostingEnvironment;
            _bus = bus;
            rootFolder = Path.Combine(_hostingEnvironment.WebRootPath);
            _groupImageSettings = settings.Value;
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UpdateGroupProfileImage(IFormFile profileImage, string groupId)
        {
            if (profileImage == null || string.IsNullOrEmpty(groupId))
            {
                return BadRequest();
            }
            int grpId = Convert.ToInt32(groupId);
            Claim idClaim = User.FindFirst("sub");
            UpdateGroupCoverImageReturnModel ret = new UpdateGroupCoverImageReturnModel();
            try
            {
                string thumbUrlPath = "";
                string smallUrlpath = "";
                GroupProfileImageUpdatedAction busAction = new GroupProfileImageUpdatedAction()
                {
                    DateUtcAction = DateTime.UtcNow,
                    GroupId = grpId,
                    FileExtension = "jpeg",
                };
                Stream outputStream = new MemoryStream();
                string rootPath = _httpContextAccessor.HttpContext.Request.Host.ToString();
                var prefx = _httpContextAccessor.HttpContext.Request.IsHttps ? "https://" : "http://";

                string fileName = profileImage.FileName;
                var headers = profileImage.Headers;
                string userId = User.FindFirst("sub").Value;
                // Check if directory Exist
                var directoryPath = Path.Combine(rootFolder, "fimg\\g\\" + groupId);
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                // Thumb Resizing
                using (Image image = new Image(profileImage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {

                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _groupImageSettings.GroupProfileThumbMaxHeight,
                            Width = _groupImageSettings.GroupProfileThumbMaxWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg\\g\\" + groupId + "\\p_" + imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    thumbUrlPath = prefx + rootPath + "/fimg/g/" + groupId + "/p_" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.ThumbImageUrl = thumbUrlPath;
                };
                // Small Resizing
                using (Image image = new Image(profileImage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _groupImageSettings.GroupProfileSmallMaxHeight,
                            Width = _groupImageSettings.GroupProfileSmallMaxWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg\\g\\" + groupId + "\\p_" + imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    smallUrlpath = prefx + rootPath + "/fimg/g/" + groupId + "/p_" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.SmallImageUrl = smallUrlpath;
                };
                outputStream.Dispose();

                _bus.Publish<GroupProfileImageUpdatedAction>(busAction);

                ret.IsSucceed = true;
                ret.GroupId = grpId;
                // Disable browser cache via qparam
                ret.ThumbImageUrl = thumbUrlPath + "?v=" + DateTime.UtcNow.Millisecond.ToString();
                return Ok(Json(ret));
            }
            catch (Exception ex)
            {
                return BadRequest(Json(ex));
            }
        }
        [Authorize(Policy = "fso.AngularUser")]
        [HttpPost("[action]")]
        public IActionResult UpdateGroupCoverImage(IFormFile coverImage, string groupId)
        {
            if (coverImage == null || string.IsNullOrEmpty(groupId))
            {
                return BadRequest();
            }
            int grpId = Convert.ToInt32(groupId);
            Claim idClaim = User.FindFirst("sub");
            UpdateGroupCoverImageReturnModel ret = new UpdateGroupCoverImageReturnModel();
            try
            {
                string thumbUrlPath = "";
                string largeUrlPath = "";
                string smallUrlpath = "";
                GroupCoverImageUpdatedAction busAction = new GroupCoverImageUpdatedAction()
                {
                    DateUtcAction = DateTime.UtcNow,
                    GroupId = grpId,
                    FileExtension = "jpeg",
                };
                Stream outputStream = new MemoryStream();
                string rootPath = _httpContextAccessor.HttpContext.Request.Host.ToString();
                var prefx = _httpContextAccessor.HttpContext.Request.IsHttps ? "https://" : "http://";

                string fileName = coverImage.FileName;
                var headers = coverImage.Headers;
                string userId = User.FindFirst("sub").Value;
                // Check if directory Exist
                var directoryPath = Path.Combine(rootFolder, "fimg\\g\\" + groupId);
                if (!Directory.Exists(directoryPath))
                {
                    Directory.CreateDirectory(directoryPath);
                }
                // Thumb Resizing
                using (Image image = new Image(coverImage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {

                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _groupImageSettings.GroupCoverThumbHeight,
                            Width = _groupImageSettings.GroupCoverThumbWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg\\g\\" + groupId + "\\" + imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    thumbUrlPath = prefx + rootPath + "/fimg/g/" + groupId + "/" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.ThumbImageUrl = thumbUrlPath;
                };
                // Small Resizing
                using (Image image = new Image(coverImage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _groupImageSettings.GroupCoverSmallHeight,
                            Width = _groupImageSettings.GroupCoverSmallWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg\\g\\" + groupId + "\\" + imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    smallUrlpath = prefx + rootPath + "/fimg/g/" + groupId + "/" + imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.SmallImageUrl = smallUrlpath;
                };
                // Large Resizing
                using (Image image = new Image(coverImage.OpenReadStream()))
                {
                    image.SaveAsJpeg(outputStream, new JpegEncoderOptions() { Quality = 100 });
                    image.Resize(new ResizeOptions()
                    {
                        Mode = ResizeMode.Max,
                        Position = AnchorPosition.Center,
                        Size = new Size()
                        {
                            Height = _groupImageSettings.GroupCoverLargeHeight,
                            Width = _groupImageSettings.GroupCoverLargeWidth
                        }
                    });
                    image.AutoOrient();
                    var imageWidth = image.Width;
                    var imageHeight = image.Height;
                    var path = Path.Combine(rootFolder, "fimg\\g\\" + groupId + "\\" + +imageWidth + "x" + imageHeight + ".jpeg");

                    image.Save(path);
                    largeUrlPath = prefx + rootPath + "/fimg/g/" + groupId + "/" +imageWidth + "x" + imageHeight + ".jpeg";
                    busAction.LargeImageUrl = largeUrlPath;
                };
                outputStream.Dispose();

                _bus.Publish<GroupCoverImageUpdatedAction>(busAction);

                ret.IsSucceed = true;
                ret.GroupId = grpId;
                // Disable browser cache via qparam
                ret.LargeImageUrl = largeUrlPath + "?v=" + DateTime.UtcNow.Millisecond.ToString();
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
    }
}
