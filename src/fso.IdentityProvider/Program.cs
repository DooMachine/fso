
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore;
using System.Threading.Tasks;

namespace fso.IdentityProvider
{
    public class Program
    {
        public static void Main(string[] args)
        {            
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>()
                .UseUrls("http://*:5000")
                .UseIISIntegration()
                .Build();
        
    }
}
