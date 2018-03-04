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
                .UseUrls("http://localhost:7100", "http://192.168.1.67:7100")
                .UseKestrel(options =>
                {
                    options.AddServerHeader = false;
                })
                .Build();
    }
}
