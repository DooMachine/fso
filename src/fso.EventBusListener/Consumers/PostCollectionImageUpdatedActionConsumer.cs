using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore;
using System;
using System.Linq;

namespace fso.EventBusListener.Consumers
{

    public class PostCollectionImageUpdatedActionConsumer : IConsume<PostCollectionImageUpdatedAction>
    {
        public void Consume(PostCollectionImageUpdatedAction message)
        {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    PostCollection pcol = db.Set<PostCollection>().FirstOrDefault(f => f.Id == message.CollectionId);
                    AppMediaFile appFile = db.Set<AppMediaFile>().FirstOrDefault(f => f.PostCollectionId == message.CollectionId);
                    if (appFile == null)
                    {
                        appFile = new AppMediaFile()
                        {
                            FileExtension = message.FileExtension,
                            ImageDimension = message.Dimension,
                            SmallPath = message.SmallImageUrl,
                            ThumbPath = message.ThumbImageUrl,
                            BlurLazyPath = message.LazyImageUrl,
                            PostCollection = pcol,
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
                        appFile.PostCollection = pcol;
                        appFile.DateUtcModified = DateTime.UtcNow;
                        db.Set<AppMediaFile>().Update(appFile);
                    }
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("PostCollection Update Image Activity Handled For PostCollection {0} and Image {1}", message.CollectionId, message.ThumbImageUrl);
                    }
                    else
                    {
                        Console.WriteLine("PostCollection Update Image Activity CANNOT Handled For PostCollection {0} and Image {1}", message.CollectionId, message.ThumbImageUrl);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("PostCollection Update Image Activity CANNOT Handled For PostCollection {0} and Image {1}", message.CollectionId, message.ThumbImageUrl);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
