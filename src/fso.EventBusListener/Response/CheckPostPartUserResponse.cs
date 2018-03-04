using fso.Core.Domains;
using fso.Data;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fso.EventBusListener.Response
{
    public class ResponseActions
    {
        public ResponseActions()
        {

        }
        public bool IsUserOwnerPostpart(string currUserId, int postpartId)
        {
            using (FsoContext db = new FsoContext())
            {
                var pp = db.Set<PostPart>().Select(p => new { Post = p.Post, p.Id }).FirstOrDefault(p => p.Id == postpartId);
                if (pp == null)
                {
                    return false;
                }
                return pp.Post.UserInfoId == currUserId;
            }
        }
        public bool IsUserOwnerPostCollection(string currUserId, int postCollectionId)
        {
            using (FsoContext db = new FsoContext())
            {
                var pp = db.Set<PostCollection>().FirstOrDefault(p => p.Id == postCollectionId).UserInfoId;
                if (pp == null)
                {
                    return false;
                }
                return pp == currUserId;
            }
        }
    }
}
