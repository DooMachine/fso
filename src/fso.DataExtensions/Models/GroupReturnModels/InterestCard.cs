

using System;
using System.Collections.Generic;

namespace fso.DataExtensions.Models
{
    public class InterestCard : IEquatable<InterestCard>
    {
        public InterestCard()
        {

        }
        public int Id { get; set; }

        public string Name { get; set; }

        public string ProfileImage { get; set; }

        public string UrlKey { get; set; }

        public string CoverImage { get; set; }

        public string AlphaColor { get; set; }

        public int FollowerCount { get; set; }

        public bool IsCurrentUserFollowing { get; set; }

        public override bool Equals(object obj)
        {
            return Equals(obj as InterestCard);
        }

        public bool Equals(InterestCard other)
        {
            return other != null &&
                   Id == other.Id;
        }

        public override int GetHashCode()
        {
            return 2108858624 + Id.GetHashCode();
        }

        public static bool operator ==(InterestCard card1, InterestCard card2)
        {
            return EqualityComparer<InterestCard>.Default.Equals(card1, card2);
        }

        public static bool operator !=(InterestCard card1, InterestCard card2)
        {
            return !(card1 == card2);
        }
    }
}
