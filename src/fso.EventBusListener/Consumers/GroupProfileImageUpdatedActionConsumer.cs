using EasyNetQ.AutoSubscribe;
using fso.Core.Domains;
using fso.Data;
using fso.EventCore.GroupActions;
using System;
using System.Linq;

namespace fso.EventBusListener.Consumers
{
    public class GroupProfileImageUpdatedActionConsumer : IConsume<GroupProfileImageUpdatedAction>
    {
        public void Consume(GroupProfileImageUpdatedAction message)
        {
            try
            {
                using (FsoContext db = new FsoContext())
                {
                    Group updatedGroup = db.Set<Group>().FirstOrDefault(p => p.Id == message.GroupId);
                    if (updatedGroup == null)
                    {
                        Console.WriteLine("Group Update Profile Image Activity Handled For Group {0} and Image {1}", message.GroupId, message.ThumbImageUrl);
                        return;
                    }
                    AppMediaFile appFile = db.Set<AppMediaFile>().FirstOrDefault(f => f.ProfileGroupId == message.GroupId);
                    if (appFile == null)
                    {
                        appFile = new AppMediaFile()
                        {
                            FileExtension = message.FileExtension,
                            ImageDimension = message.Dimension,
                            SmallPath = message.SmallImageUrl,
                            ThumbPath = message.ThumbImageUrl,
                            ProfileGroup = updatedGroup,
                            DateUtcAdd = DateTime.UtcNow,
                            DateUtcModified = DateTime.UtcNow
                        };
                        db.Set<AppMediaFile>().Add(appFile);
                    }
                    else
                    {
                        appFile.FileExtension = message.FileExtension;
                        appFile.ImageDimension = message.Dimension;
                        appFile.SmallPath = message.SmallImageUrl;
                        appFile.ThumbPath = message.ThumbImageUrl;
                        appFile.ProfileGroup = updatedGroup;
                        appFile.DateUtcModified = DateTime.UtcNow;

                        db.Set<AppMediaFile>().Update(appFile);
                    }
                    int z = db.SaveChanges();
                    if (z > 0)
                    {
                        Console.WriteLine("Group Update Profile Image Activity Handled For Group {0} and Image {1}", message.GroupId, message.ThumbImageUrl);
                    }
                    else
                    {
                        Console.WriteLine("Group Update Profile Image Activity CANNOT Handled For Group {0} and Image {1}", message.GroupId, message.ThumbImageUrl);
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Group Update Profile Image  Activity CANNOT Handled For Group {0} and Image {1}", message.GroupId, message.ThumbImageUrl);
                Console.WriteLine(ex.Message);
                if (ex.InnerException != null)
                {
                    Console.WriteLine(ex.InnerException.Message);
                }
            }

        }
    }
}
