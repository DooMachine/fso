using System;

namespace fso.EventCore
{
    public class UserRegisteredAction : BaseAction
    {
        public string UserId { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }

        public string UName { get; set; }
        
    }
}
