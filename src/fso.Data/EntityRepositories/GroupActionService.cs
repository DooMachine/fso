using fso.Core.Domains;
using fso.DataExtensions.DataServices;
using fso.DataExtensions.Models.GroupReturnModels.GroupAdd;
using System;
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
