

using System;
using System.Collections.Generic;

namespace fso.Core.Domains.MMEntities
{
    public class UserReview : BaseMMEntity, IEquatable<UserReview> 
    {
        public virtual UserInfo UserInfo { get; set; }
        public string UserInfoId { get; set; }

        public virtual Review Review { get; set; }
        public int ReviewId { get; set; }

        public LikeStatus LikeStatus { get; set; }


        public override bool Equals(object obj)
        {
            return Equals(obj as UserReview);
        }

        public bool Equals(UserReview other)
        {
            return other != null &&
                   UserInfoId == other.UserInfoId &&
                   ReviewId == other.ReviewId;
        }

        public override int GetHashCode()
        {
            var hashCode = 473200403;
            hashCode = hashCode * -1521134295 + EqualityComparer<string>.Default.GetHashCode(UserInfoId);
            hashCode = hashCode * -1521134295 + ReviewId.GetHashCode();
            return hashCode;
        }

        public static bool operator ==(UserReview review1, UserReview review2)
        {
            return EqualityComparer<UserReview>.Default.Equals(review1, review2);
        }

        public static bool operator !=(UserReview review1, UserReview review2)
        {
            return !(review1 == review2);
        }
    }

    public enum LikeStatus
    {
        Like,
        Dislike,
        None
    }
}
