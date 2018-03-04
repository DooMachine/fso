
using System.ComponentModel.DataAnnotations;

namespace fso.Core.Domains
{
    public class AppMediaFile : BaseEntity
    {
        [StringLength(1024)]
        public string Path { get; set; }
        /// <summary>
        /// Probably going to use as data:image (base64) for lazy load purpose.
        /// </summary>
        [StringLength(1024)]
        public string SmallPath { get; set; }
        [StringLength(1024)]
        public string ThumbPath { get; set; }
        [StringLength(1024)]
        public string ResizedPath { get; set; }
        [StringLength(1024)]
        public string BlurLazyPath { get; set; }
        [StringLength(16)]
        public string FileExtension { get; set; }
        [StringLength(16)]
        public string ImageDimension { get; set; }
        
        public virtual UserInfo UserInfo { get; set; }
        public string UserInfoId { get; set; }

        public virtual PostPart PostPart { get; set; }
        public int? PostPartId { get; set; }

        
        public virtual Group CoverGroup { get; set; }
        public int? CoverGroupId { get; set; }

        public virtual Group ProfileGroup { get; set; }
        public int? ProfileGroupId { get; set; }

        public virtual PostCollection PostCollection { get; set; }
        public int? PostCollectionId { get; set; }

        public bool IsVideo { get => FileExtension == "mp4" || FileExtension == "webm"; }
        public bool IsGif { get => FileExtension == "gif"; }
        public bool IsImage { get => FileExtension == "jpg" || FileExtension == "jpeg"; }
    }
}
