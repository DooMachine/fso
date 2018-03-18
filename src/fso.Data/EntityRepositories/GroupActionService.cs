using fso.Core.Domains;
using fso.Core.Domains.MMEntities;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace fso.Data.EntityRepositories
{
    public class GroupActionService : IGroupActionService
    {
        private readonly IEntityContext _context;
        public GroupActionService(
            IEntityContext context
            )
        {
            _context = context;
        }
        public AddGroupReturn AddGroup(AddGroupParameters model)
        {
            AddGroupReturn ret = new AddGroupReturn();
            ret.IsActionSucceed = false;
            bool urlKeyExist = _context.Set<Group>().Any(p => p.UrlKey == model.UrlKey);
            if (urlKeyExist)
            {
                ret.Errors.Add("1", "Url key exist!");
                return ret;
            }
            
            Group group = new Group()
            {
                DateUtcAdd = DateTime.UtcNow,
                DateUtcModified = DateTime.UtcNow,
                Description = model.Description,
                Name = model.Name,
                UrlKey = model.UrlKey,
                About = model.About,
                ColorAlpha = model.ColorAlpha,
            };
            if(model.ParentInterestId.HasValue){
                group.Childs = new List<GroupRelation>();
                group.Childs.Append(new GroupRelation(){
                    ParentGroupId = model.ParentInterestId.Value,
                    Child = group,
                    DominateValue = 80
                });
            }
            _context.Set<Group>().Add(group);
            if (_context.SaveChanges()>0)
            {
                ret.IsActionSucceed = true;
                ret.Group = group;
                return ret;
            }
            ret.IsActionSucceed = false;
            return ret;
        }
        public DeleteGroupReturn DeleteGroup(GroupIdParameters req)
        {
            DeleteGroupReturn ret = new DeleteGroupReturn();
            ret.IsActionSucceed = false;
            Group group = _context.Set<Group>().FirstOrDefault(p => p.Id == req.GroupId);
            foreach (GroupRelation child in group.Childs)
            {
                child.IsSoftDeleted = true;
                _context.SetChildAsModified(child);
            }
            _context.Set<Group>().Add(group);
            if (_context.SaveChanges()>0)
            {
                ret.IsActionSucceed = true;
                ret.Group = group;
                return ret;
            }
            ret.IsActionSucceed = false;
            return ret;
        }
    }
}
