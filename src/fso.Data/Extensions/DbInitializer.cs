using fso.Core.Domains;
using fso.Core.Domains.Helpers.Enum;
using fso.Core.Domains.MMEntities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fso.Data.Extensions
{

    public class DbInitializer : IDbInitializer
    {
        private readonly FsoContext _context;
        string[] postPartTitles = new string[6] { "Polo Ayakkabı","Mango Çanta","Kırmızı Şapka","Slim Fit Ceket"," nahui","n!'^!+##130--!ææ" };
        public DbInitializer(
            FsoContext context
            )
        {
            _context = context;
        }
        public void Initialize()
        {
            _context.Database.Migrate();
            // If database seeded
            if (_context.Set<Group>().Any())
            {
                return;
            }
            Random rnd = new Random();
            AppMediaFile feasionImage = new AppMediaFile()
            {
                DateUtcAdd = DateTime.UtcNow,
                DateUtcModified = DateTime.UtcNow,
                FileExtension = "jpg",
                ImageDimension = "1",
                Path = "https://picsum.photos/1600/1600/",
                ResizedPath = "https://picsum.photos/600/600/",
                SmallPath = "https://picsum.photos/60/60/",
                ThumbPath = "https://picsum.photos/200/200/",
                IsSoftDeleted = false
            };
            _context.Set<AppMediaFile>().Add(feasionImage);
            for (int j = 0; j < 19; j++)
            {
                Group gr = new Group
                {
                    DateUtcAdd = DateTime.UtcNow,
                    DateUtcModified = DateTime.UtcNow,
                    ColorAlpha = "#afac2d",
                    UrlKey = "Name" + j.ToString(),
                    PopularityLevel = new List<Popularity>(),
                    Name = "Name",
                    UsersFollowing = new List<UserGroup>(),
                    Posts = new List<GroupPost>(),
                    Description="This is the test group of feasion",
                    CoverImage = new AppMediaFile()
                    {
                        DateUtcAdd = DateTime.Now,
                        DateUtcModified = DateTime.Now,
                        Path = "/examplevideo/FurTrends.mp4",
                        ThumbPath = "/examplevideo/FurTrends.mp4",
                        SmallPath = "/examplevideo/FurTrends.mp4",
                        ResizedPath = "/examplevideo/FurTrends.mp4",
                        FileExtension=".mp4"
                    },
                    ProfileImage = new AppMediaFile()
                    {
                        DateUtcAdd = DateTime.Now,
                        DateUtcModified = DateTime.Now,
                        Path = "https://picsum.photos/600/600/",
                        ThumbPath = "https://picsum.photos/400/400/",
                        SmallPath = "https://picsum.photos/100/100/",
                        ResizedPath = "https://picsum.photos/400/400/",
                        FileExtension=".jpg",
                    }


                };
                gr.PopularityLevel.Add(new Popularity()
                {
                    DateUtcAdd = DateTime.UtcNow,
                    DateUtcModified = DateTime.UtcNow,
                    IsSoftDeleted = false,
                    CultureCode = "WW",
                    OnTrendingEndUtcTime = DateTime.Now.AddYears(1),
                    OnTrendingStartUtcTime = DateTime.Now.AddYears(-1),
                    PopularityLevel = rnd.Next(1001) % 100,
                    GroupId = gr.Id,
                });
                _context.Set<Group>().Add(gr);
                for (int i = 0; i < 32; i++)
                {
                    Post pst = new Post()
                    {
                        DateUtcAdd = DateTime.UtcNow,
                        DateUtcModified = DateTime.UtcNow,
                        DateUtcPublished = new DateTime(2011, 9, 5, 12, 12, 12, kind: DateTimeKind.Utc),
                        Description = "DescPorst",
                        Rating = (i*13)%100,                        
                        IsSoftDeleted=false,
                        PrivacyStatus = (PrivacyStatus)(i%2),
                        Popularity = new List<Popularity>(),
                        Title =" My wedding dress! and Phoaorah Make Up! "+i.ToString()+j.ToString(),
                        PostParts = new List<PostPart>()
                        {
                            new PostPart
                            {
                                Description="PostPart 1",
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                Image = new AppMediaFile()
                                {
                                    DateUtcAdd = DateTime.Now,
                                    DateUtcModified = DateTime.Now,
                                    Path = "https://picsum.photos/600/1200?image="+i.ToString(),
                                    ThumbPath = "https://picsum.photos/400/800?image="+i.ToString(),
                                    ResizedPath = "https://picsum.photos/200/400?image="+i.ToString(),
                                    SmallPath = "https://picsum.photos/80/80?image="+i.ToString(),
                                    ImageDimension="0.5",
                                },
                                Title=postPartTitles[(i*j+DateTime.Now.DayOfYear)%6]
                            },
                            new PostPart
                            {
                                Description="PostPart 15",
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                Image = new AppMediaFile()
                                {
                                    DateUtcAdd = DateTime.Now,
                                    DateUtcModified = DateTime.Now,
                                    Path = "https://picsum.photos/900/1200?image="+(i+j+2).ToString(),
                                    ThumbPath = "https://picsum.photos/600/800?image="+(i+j+2).ToString(),
                                    ResizedPath = "https://picsum.photos/300/400?image="+(i+j+2).ToString(),
                                    SmallPath = "https://picsum.photos/80/80?image="+(i+j+2).ToString(),
                                    ImageDimension="0.75",
                                },
                                Title=postPartTitles[(i*j+DateTime.Now.DayOfYear)%6]
                            },
                            new PostPart
                            {
                                Description="PostPart 15",
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                Image = new AppMediaFile()
                                {
                                    DateUtcAdd = DateTime.Now,
                                    DateUtcModified = DateTime.Now,
                                    Path = "https://picsum.photos/900/1200?image="+(i+j+3).ToString(),
                                    ThumbPath = "https://picsum.photos/600/800?image="+(i+j+3).ToString(),
                                    ResizedPath = "https://picsum.photos/300/400?image="+(i+j+3).ToString(),
                                    SmallPath = "https://picsum.photos/80/80?image="+(i+j+3).ToString(),
                                    ImageDimension="0.75",
                                },
                                Title=postPartTitles[(i*j+DateTime.Now.DayOfYear)%6]
                            },
                            new PostPart
                            {
                                Description="PostPart 2 Debug",
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                Image = new AppMediaFile()
                                {
                                    DateUtcAdd = DateTime.Now,
                                    DateUtcModified = DateTime.Now,
                                    Path = "https://picsum.photos/1800/1200?image="+(i+j+1).ToString(),
                                    ResizedPath = "https://picsum.photos/1600/800?image="+(i+j+1).ToString(),
                                    ThumbPath = "https://picsum.photos/1000/400?image="+(i+j+1).ToString(),
                                    SmallPath = "https://picsum.photos/180/80?image="+(i+j+1).ToString(),
                                    ImageDimension="2.5",
                                },
                                Title=postPartTitles[(i*j+DateTime.Now.Second)%6]
                            },
                            new PostPart
                            {
                                Description="PostPart 3 Debug",
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                Image = new AppMediaFile()
                                {
                                    DateUtcAdd = DateTime.Now,
                                    DateUtcModified = DateTime.Now,
                                    Path = "https://picsum.photos/800/1200?image="+(i+j+2).ToString(),
                                    ResizedPath = "https://picsum.photos/600/800?image="+(i+j+2).ToString(),
                                    ThumbPath = "https://picsum.photos/300/400?image="+(i+j+2).ToString(),
                                    SmallPath = "https://picsum.photos/80/80?image="+(i+j+2).ToString(),
                                    ImageDimension="0.75",
                                },
                                Title=postPartTitles[(i*j+DateTime.Now.Millisecond)%6]
                            }
                        },
                        UserInfo = new UserInfo
                        {
                            AppUserId = "Try Profile" + i.ToString() + j.ToString() + i.ToString(),
                            UName = "Try Profile" + i.ToString() + j.ToString() + i.ToString(),
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow,
                            Name = "Okan Mustafa",
                            Surname = "Aslankan",
                            ProfilePicture = new AppMediaFile()
                            {
                                DateUtcAdd = DateTime.Now,
                                DateUtcModified = DateTime.Now,
                                Path = "https://picsum.photos/600/1200/",
                                ThumbPath = "https://picsum.photos/400/800/",
                                SmallPath = "https://picsum.photos/200/400/",
                                ResizedPath = "https://picsum.photos/80/80/",
                                ImageDimension = "0.5",
                            }
                        },
                        Reviews = new List<Review>()
                        {
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2013,9,5,12,12,12,kind:DateTimeKind.Utc),
                                
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser",
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                SmallPath = "https://picsum.photos/200/400/",
                                                ResizedPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"
                                        
                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug q User 3"+i.ToString()+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                SmallPath = "https://picsum.photos/200/400/",
                                                ResizedPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings"
                                    }
                                },
                                Content="I liked your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User",
                                    DateUtcModified=DateTime.UtcNow,
                                    DateUtcAdd=DateTime.UtcNow,        
                                    UName = "UserName"+i.ToString(),
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        SmallPath = "https://picsum.photos/200/400/",
                                        ResizedPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+i.ToString()+j.ToString()+i.ToString()+j.ToString()+i.ToString(),
                                }
                                
                            },
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2013,9,5,12,12,12,kind:DateTimeKind.Utc),
                                
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser",
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                SmallPath = "https://picsum.photos/200/400/",
                                                ResizedPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"

                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug q User 3"+i.ToString()+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                SmallPath = "https://picsum.photos/200/400/",
                                                ResizedPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings"
                                    }
                                },
                                Content="I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User",
                                    DateUtcModified=DateTime.UtcNow,
                                    UName = "davai_cyka"+i.ToString(),
                                    DateUtcAdd=DateTime.UtcNow,
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        SmallPath = "https://picsum.photos/200/400/",
                                        ResizedPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+i.ToString()+j.ToString()+i.ToString()+j.ToString()+i.ToString(),
                                }

                            },
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2013,9,5,12,12,12,kind:DateTimeKind.Utc),
                                
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser",
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"

                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug q User 3"+i.ToString()+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings"
                                    }
                                },
                                Content="I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User",
                                    DateUtcModified=DateTime.UtcNow,
                                    UName = "hellooky"+i.ToString()+j.ToString(),
                                    DateUtcAdd=DateTime.UtcNow,
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        ResizedPath = "https://picsum.photos/200/400/",
                                        SmallPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+i.ToString()+j.ToString()+i.ToString()+j.ToString()+i.ToString(),
                                }

                            },
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2013,9,5,12,12,12,kind:DateTimeKind.Utc),
                                
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser",
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"

                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug q User 3"+i.ToString()+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings"
                                    }
                                },
                                Content="I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User",
                                    DateUtcModified=DateTime.UtcNow,
                                    UName = "hellooky"+i.ToString()+j.ToString(),
                                    DateUtcAdd=DateTime.UtcNow,
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        ResizedPath = "https://picsum.photos/200/400/",
                                        SmallPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+i.ToString()+j.ToString()+i.ToString()+j.ToString()+i.ToString(),
                                }

                            },
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2013,9,5,12,12,12,kind:DateTimeKind.Utc),
                                
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser",
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"

                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug q User 3"+i.ToString()+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings"
                                    }
                                },
                                Content="I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User",
                                    DateUtcModified=DateTime.UtcNow,
                                    UName = "hellooky"+i.ToString()+j.ToString(),
                                    DateUtcAdd=DateTime.UtcNow,
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        ResizedPath = "https://picsum.photos/200/400/",
                                        SmallPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+i.ToString()+j.ToString()+i.ToString()+j.ToString()+i.ToString(),
                                }

                            },
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2013,9,5,12,12,12,kind:DateTimeKind.Utc),
                                
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser",
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"

                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug q User 3"+i.ToString()+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings"
                                    }
                                },
                                Content="I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User",
                                    DateUtcModified=DateTime.UtcNow,
                                    UName = "hellooky"+i.ToString()+j.ToString(),
                                    DateUtcAdd=DateTime.UtcNow,
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        ResizedPath = "https://picsum.photos/200/400/",
                                        SmallPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+i.ToString()+j.ToString()+i.ToString()+j.ToString()+i.ToString(),
                                }

                            },
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2013,9,5,12,12,12,kind:DateTimeKind.Utc),
                                
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser",
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"

                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug q User 3"+i.ToString()+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings"
                                    }
                                },
                                Content="I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User",
                                    DateUtcModified=DateTime.UtcNow,
                                    UName = "hellooky"+i.ToString()+j.ToString(),
                                    DateUtcAdd=DateTime.UtcNow,
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        ResizedPath = "https://picsum.photos/200/400/",
                                        SmallPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+i.ToString()+j.ToString()+i.ToString()+j.ToString()+i.ToString(),
                                }

                            },
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2013,9,5,12,12,12,kind:DateTimeKind.Utc),
                                
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser",
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"

                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug q User 3"+i.ToString()+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                ResizedPath = "https://picsum.photos/200/400/",
                                                SmallPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings"
                                    }
                                },
                                Content="I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!! I liked daw da da daw da da da d ada d ad ad a da da da da d ad ad ad ada d ad ad a your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User",
                                    DateUtcModified=DateTime.UtcNow,
                                    UName = "hellooky"+i.ToString()+j.ToString(),
                                    DateUtcAdd=DateTime.UtcNow,
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        ResizedPath = "https://picsum.photos/200/400/",
                                        SmallPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+i.ToString()+j.ToString()+i.ToString()+j.ToString()+i.ToString(),
                                }

                            },
                            new Review()
                            {
                                DateUtcAdd=DateTime.UtcNow,
                                DateUtcModified=DateTime.UtcNow,
                                DateUtcPublished = new DateTime(2017,9,5,12,12,12,kind:DateTimeKind.Utc),
                                Comments= new List<Comment>()
                                {
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            AppUserId="DebugCommentUser"+i.ToString()+j.ToString()+i.ToString(),
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            Name="Debug Name",
                                            Surname="Surname",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                SmallPath = "https://picsum.photos/200/400/",
                                                ResizedPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings"

                                    },
                                    new Comment()
                                    {
                                        DateUtcModified=DateTime.UtcNow,
                                        DateUtcAdd=DateTime.UtcNow,
                                        Author=new UserInfo()
                                        {
                                            DateUtcAdd=DateTime.UtcNow,
                                            DateUtcModified=DateTime.UtcNow,
                                            AppUserId="Debug Comment User 3"+j.ToString()+i.ToString(),
                                            Name="Debug Name 3",
                                            Surname="Surname 3",
                                            Status="Debug User Status",
                                            ProfilePicture= new AppMediaFile()
                                            {
                                                DateUtcAdd = DateTime.Now,
                                                DateUtcModified = DateTime.Now,
                                                Path = "https://picsum.photos/600/1200/",
                                                ThumbPath = "https://picsum.photos/400/800/",
                                                SmallPath = "https://picsum.photos/200/400/",
                                                ResizedPath = "https://picsum.photos/80/80/",
                                                ImageDimension = "0.5",
                                            },
                                        },
                                        Content="This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings. This is a debug comment and I like you shirt. It is very good with your rings",
                                        
                                    }
                                },
                                Content="I liked your <hat>hat. It is the best hat I've ever seen. Also you <shirt>shirt is very promising with new trends!!",
                                
                                UserInfo = new UserInfo()
                                {
                                    Name="Review User"+j.ToString(),
                                    DateUtcModified=DateTime.UtcNow,
                                    UName = "hellooky"+i.ToString()+j.ToString(),
                                    DateUtcAdd=DateTime.UtcNow,
                                    ProfilePicture= new AppMediaFile()
                                    {
                                        DateUtcAdd = DateTime.Now,
                                        DateUtcModified = DateTime.Now,
                                        Path = "https://picsum.photos/600/1200/",
                                        ThumbPath = "https://picsum.photos/400/800/",
                                        SmallPath = "https://picsum.photos/200/400/",
                                        ResizedPath = "https://picsum.photos/80/80/",
                                        ImageDimension = "0.5",
                                    },
                                    Surname="Sur",
                                    AppUserId="DebugReviewUser"+j.ToString()+j.ToString()+i.ToString(),
                                }

                            }
                        },
                        Content = "Post Content Content",
                        Groups = new List<GroupPost>(),
                    };
                    pst.Groups.Add(new GroupPost
                    {
                        Group = gr,
                        Post = pst,
                        GroupId = gr.Id,
                        PostPopularityLevel = rnd.Next(1001) % 100,
                        PostId = pst.Id
                    });
                    pst.Popularity.Add(new Popularity()
                    {
                        DateUtcAdd = DateTime.UtcNow,
                        DateUtcModified = DateTime.UtcNow,
                        IsSoftDeleted = false,
                        CultureCode = "WW",
                        OnTrendingEndUtcTime = DateTime.Now.AddYears(1),
                        OnTrendingStartUtcTime = DateTime.Now.AddYears(-1),
                        PopularityLevel = rnd.Next(1001) % 100,
                        PostId = pst.Id,
                    });
                    _context.Set<Post>().Add(pst);
                }
            }

            UserInfo uInfo = new UserInfo()
            {
                AppUserId = "TestUserId",
                DateUtcAdd = DateTime.UtcNow,
                DateUtcModified = DateTime.UtcNow,
                Name = "Test Name",
                IsSoftDeleted = false,                
                AlphaColor = "#6A1B9A",
                ProfilePicture = new AppMediaFile()
                {
                    DateUtcAdd = DateTime.Now,
                    DateUtcModified = DateTime.Now,
                    Path = "https://picsum.photos/1200/1200/",
                    ThumbPath = "https://picsum.photos/400/400/",
                    SmallPath = "https://picsum.photos/120/120",
                    ResizedPath = "https://picsum.photos/80/80/",
                    ImageDimension = "1",
                },
                Surname = "TestSurname",
                Status= "Dünyanın en güzel karısıyam. Var mı..",
                Collections = new List<PostCollection>(),          
                Posts = new List<Post>(),
                FollowSetting = UserFollowSetting.Confirm_All,                
                UName = "testUsername",                
            };
            _context.Set<UserInfo>().Add(uInfo);
            _context.SaveChanges();

        }
    }
}
