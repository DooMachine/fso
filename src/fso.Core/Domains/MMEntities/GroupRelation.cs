

namespace fso.Core.Domains.MMEntities
{
    public class GroupRelation : BaseMMEntity
    {
        
        public int ParentGroupId { get; set; }
        public int ChildGroupId { get; set; }
        public virtual Group Parent { get; set; }
        public virtual Group Child { get; set; }

        /// <summary>
        /// (0-100) (50) means parent coverage = child coverage 0 means child dominates -100 means Parent Collapsing child
        /// </summary>
        public int? DominateValue { get; set; }
    }
}
