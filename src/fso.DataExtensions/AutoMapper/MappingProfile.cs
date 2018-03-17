using AutoMapper;
using fso.Core.Domains;
using fso.DataExtensions.Models.GroupReturnModels;
using fso.DataExtensions.Models.GroupReturnModels.GroupIndex;
using fso.DataExtensions.Models;
using System.Linq;

namespace fso.DataExtensions.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {            
            CreateMap<Group, InterestCard>()
                .ForMember(p => p.FollowerCount, opt => opt.MapFrom(src => src.UsersFollowing.Count))
                .ForMember(p => p.ProfileImage, opt => opt.MapFrom(src => src.ProfileImage.ThumbPath))
                .ForMember(p => p.CoverImage, opt => opt.MapFrom(src => src.CoverImage.ThumbPath));

            CreateMap<Post, PostCard>()
                .ForMember(p => p.PostParts, opt => opt.MapFrom(src => src.PostParts))
                .ForMember(p => p.AuthorInfo, opt => opt.MapFrom(src => src.UserInfo));

            CreateMap<Post, PostActivityEntity>()
                .ForMember(p => p.AuthorInfo, opt => opt.MapFrom(src => src.UserInfo))
                .ForMember(p => p.PostParts, opt => opt.MapFrom(src => src.PostParts))
                .ForMember(p => p.ReviewCount, opt => opt.MapFrom(src => src.Reviews.Count))
                .ForMember(p => p.CollectionInfo, opt => opt.MapFrom(src => src.Collection))
                .ForMember(d => d.IsCurrentUserLiked, opt => opt.ResolveUsing(
                   (src, dst, arg3, context) => src.LikedUsers.Any(p => p.UserInfoId == (string)context.Options.Items["appUserId"])
                ));

            CreateMap<UserInfo, BaseUserInfoDisplay>()
                .ForMember(p => p.ProfileImage, opt => opt.MapFrom(src => src.ProfilePicture.SmallPath))
                .ForMember(p => p.Name, opt => opt.MapFrom(src => src.FullName))
                .ForMember(p => p.AppUserId, opt => opt.MapFrom(src => src.AppUserId));

            CreateMap<PostPart, PostPartDisplay>()
               .ForMember(p => p.Title, opt => opt.MapFrom(src => src.Title))
               .ForMember(p => p.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(p => p.Description, opt => opt.MapFrom(src => src.Description));
        }
    }
}