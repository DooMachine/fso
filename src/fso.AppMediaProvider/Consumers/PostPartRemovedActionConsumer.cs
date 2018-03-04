using EasyNetQ.AutoSubscribe;
using fso.AppMediaProvider.Settings;
using fso.EventCore.PostPartActions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace fso.AppMediaProvider.Consumers
{
    
    //public class PostPartRemovedActionConsumer : IConsume<PostPartRemovedAction>
    //{
    //    public void Consume(PostPartRemovedAction message)
    //    {
    //        try
    //        {                
    //            char ch = '/';
    //            if (!string.IsNullOrEmpty(message.LargeUrl))
    //            {
    //                string[] afterSlash = message.LargeUrl.Split(ch, StringSplitOptions.RemoveEmptyEntries);
    //                string lastPart = afterSlash[afterSlash.Length - 1];
    //                var path = Path.Combine(rootFolder, "fimg\\pp\\" + message.PostPartId + "\\" + lastPart);
    //                if (File.Exists(path))
    //                {
    //                    File.Delete(path);
    //                }
    //            }
    //            if (!string.IsNullOrEmpty(message.ThumbUrl))
    //            {
    //                string[] afterSlash = message.ThumbUrl.Split(ch, StringSplitOptions.RemoveEmptyEntries);
    //                string lastPart = afterSlash[afterSlash.Length - 1];
    //                var path = Path.Combine(rootFolder, "fimg\\pp\\" + message.PostPartId + "\\" + lastPart);
    //                if (File.Exists(path))
    //                {
    //                    File.Delete(path);
    //                }
    //            }
    //            if (!string.IsNullOrEmpty(message.SmallUrl))
    //            {
    //                string[] afterSlash = message.SmallUrl.Split(ch, StringSplitOptions.RemoveEmptyEntries);
    //                string lastPart = afterSlash[afterSlash.Length - 1];
    //                var path = Path.Combine(rootFolder, "fimg\\pp\\" + message.PostPartId + "\\" + lastPart);
    //                if (File.Exists(path))
    //                {
    //                    File.Delete(path);
    //                }
    //            }
    //            Console.WriteLine("PostPart Remove Image Activity CANNOT Handled For PostPart {0} and Images {0} {1} {2}", message.PostPartId, message.SmallUrl, message.ThumbUrl,message.LargeUrl);
    //        }
    //        catch (Exception ex)
    //        {
    //            Console.WriteLine("PostPart Remove Image Activity CANNOT Handled For PostPart {0} and Image", message.PostPartId);
    //            Console.WriteLine(ex.Message);
    //            if (ex.InnerException != null)
    //            {
    //                Console.WriteLine(ex.InnerException.Message);
    //            }
    //        }
    //
    //    }
    //}
}
