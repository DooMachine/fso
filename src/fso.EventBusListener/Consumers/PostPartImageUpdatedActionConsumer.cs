using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.PostPartActions;
using System;
using System.Linq;

namespace fso.EventBusListener.Consumers
{

    public class PostPartImageUpdatedActionConsumer : IConsume<PostPartImageUpdatedAction>
    {
        public void Consume(PostPartImageUpdatedAction message)
        {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    PostPart postPart = db.Set<PostPart>().FirstOrDefault(f=>f.Id == message.PostPartId);
                    AppMediaFile appFile = db.Set<AppMediaFile>().FirstOrDefault(f => f.PostPartId == message.PostPartId);
                    if (appFile==null)
                    {
                        appFile = new AppMediaFile()
                        {
                            FileExtension = message.FileExtension,
                            ImageDimension = message.Dimension,
                            SmallPath = message.SmallImageUrl,
                            ThumbPath = message.ThumbImageUrl,
                            ResizedPath = message.LargeImageUrl,
                            BlurLazyPath = message.LazyImageUrl,
                            PostPart = postPart,                            
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow
                        };
                        db.Set<AppMediaFile>().Add(appFile);
                    }
                    else
                    {
                        appFile.FileExtension = message.FileExtension;
                        appFile.BlurLazyPath = message.LazyImageUrl;
                        appFile.ImageDimension = message.Dimension;
                        appFile.SmallPath = message.SmallImageUrl;
                        appFile.ThumbPath = message.ThumbImageUrl;
                        appFile.ResizedPath = message.LargeImageUrl;
                        appFile.PostPart = postPart;
                        appFile.DateUtcModified = DateTime.UtcNow;
                        db.Set<AppMediaFile>().Update(appFile);
                    }
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("PostPart Update Image Activity Handled For PostPart {0} and Image {1}", message.PostPartId, message.ThumbImageUrl);
                    }
                    else
                    {
                        Console.WriteLine("PostPart Update Image Activity CANNOT Handled For PostPart {0} and Image {1}", message.PostPartId, message.ThumbImageUrl);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("PostPart Update Image Activity CANNOT Handled For PostPart {0} and Image {1}", message.PostPartId, message.ThumbImageUrl);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
