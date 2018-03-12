using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace fso.AppMediaProvider
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
                .UseUrls("http://*:7100")
                .UseKestrel(options =>
                {
                    options.AddServerHeader = false;
                })
                .Build();
    }
}
