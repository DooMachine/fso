using fso.Core.Data;
using fso.Core.Services;
using fso.Services;
using fso.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using fso.Data.EntityRepositories;
using fso.DataExtensions.DataServices;
using Microsoft.Extensions.Caching.Distributed;
using fso.Caching;
using fso.Core.Caching;
using fso.Caching.CachingServices;
using System;
using System.Linq;

namespace fso.Bootstrapper
{
    public class WebBoot
    {        
        public static void RegisterServices(IServiceCollection services, IConfiguration Configuration)
        {
            // DbContext
            services.AddDbContext<FsoContext>(options=> {
            
            });
            services.AddScoped<IEntityContext,FsoContext>();
            services.AddScoped<IUnitOfWork, UnitOfWork>(p => new UnitOfWork(p.GetRequiredService<IEntityContext>()));
            // Generic Repository / CURRENTLY NOT USING / MIGHT NEED IT IN ADMIN - CRUD OPERATIONS
            services.AddScoped(typeof(IRepository<>), typeof(EntityRepository<>));
            services.AddScoped(typeof(IService<>), typeof(Service<>));

            // ---- DATA SERVICES ---- //
            services.AddScoped<IFeedDataService, FeedDataService>();
            services.AddScoped<IPostDataService, PostDataService>();
            services.AddScoped<IPostActionService, PostActionService>();
            services.AddScoped<IGroupDataService, GroupDataService>();
            services.AddScoped<IGroupActionService, GroupActionService>();
            services.AddScoped<IUserActivityActionService, UserActivityActionService>();
            services.AddScoped<IUserActivityDataService, UserActivityDataService>();
            services.AddScoped<IUserInfoDataService, UserInfoDataService>();
            services.AddScoped<IReviewDataService, ReviewDataService>();
            services.AddScoped<IPostLikeDataService, PostLikeDataService>();
            services.AddScoped<IReviewActionService, ReviewActionService>();
            services.AddScoped<ICommentDataService, CommentDataService>();
            services.AddScoped<ICommentActionService, CommentActionService>();
            services.AddScoped<ITrendingDataService, TrendingDataService>();
            services.AddScoped<IUserLikesDataService, UserLikesDataService>();
            services.AddScoped<IProfileSettingsDataService, ProfileSettingsDataService>();
            services.AddScoped<IPostPartService, PostPartService>();
            services.AddScoped<IPostCollectionActionService, PostCollectionActionService>();
            services.AddScoped<IPostCollectionDataService, PostCollectionDataService>();
            services.AddScoped<IExploreDataService, ExploreDataService>();
            // ----- CACHE ----- //
            string isdev = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
            if(isdev =="Development"){
                services.AddDistributedRedisCache(options=>{
                options.InstanceName = "mainapistore";
                options.Configuration = @"192.168.1.67:6379";
            });
            }else{
                services.AddDistributedRedisCache(options=>{
                options.InstanceName = "mainapistore";
                options.Configuration = @"redis";
            });
            }
            
            services.AddScoped<ICacheProvider, CacheProvider>(p => new CacheProvider(p.GetRequiredService<IDistributedCache>()));
            // Cache Services
            services.AddScoped<IPostCacheService, PostCacheService>();
            services.AddScoped<IGroupCacheService, GroupCacheService>();
            services.AddScoped<IReviewCacheService, ReviewCacheService>();
            services.AddScoped<IUserLikeCacheService, UserLikeCacheService>();
            services.AddScoped<IUserInfoCacheService, UserInfoCacheService>();
            services.AddScoped<IUserInterestCacheService, UserInterestCacheService>();
            services.AddScoped<IUserFollowCacheService, UserFollowCacheService>();
            services.AddScoped<ICommentCacheService, CommentCacheService>();
            services.AddScoped<ITrendingCacheService, TrendingCacheService>();
            services.AddScoped<IFeedCacheService, FeedCacheService>();
            services.AddScoped<ICommonCacheService, CommonCacheService>();
            services.AddScoped<IExploreCacheService, ExploreCacheService>();
        }
    }
}
