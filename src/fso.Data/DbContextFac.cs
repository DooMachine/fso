

using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;

namespace fso.Data
{
    public class FsoContextFactory : IDesignTimeDbContextFactory<FsoContext>
    {
       
        public FsoContext CreateDbContext(string[] args)
        {
            var environmentName = 
            Environment.GetEnvironmentVariable(
            "ASPNETCORE_ENVIRONMENT");

            var basePath = AppContext.BaseDirectory;

            return Create(basePath, environmentName);
        }

        private FsoContext Create(string basePath, string environmentName)
        {
            var builder = new Microsoft.Extensions.Configuration.ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile("dbsettings.json")
            .AddJsonFile($"dbsettings.{environmentName}.json", true)
            .AddEnvironmentVariables();
            var mysqlServer = Environment.GetEnvironmentVariable("MYSQL_BRIDGE_IP");
            var config = builder.Build();
            var connstr = config.GetConnectionString("DefaultConnection").Replace("mysqldb",mysqlServer);

            if (String.IsNullOrWhiteSpace(connstr) == true)
            {
                throw new InvalidOperationException(
                "Could not find a connection string named 'DefaultConnection'.");
            }
            else
            {
                return Create(connstr);
            }
        }
        private FsoContext Create(string connectionString)
        {
            if (string.IsNullOrEmpty(connectionString))
            throw new ArgumentException(
            $"{nameof(connectionString)} is null or empty.",
            nameof(connectionString));

            var optionsBuilder = new DbContextOptionsBuilder<FsoContext>();                

            optionsBuilder.UseMySql(connectionString);

            return new FsoContext(optionsBuilder.Options);
        }
    }
}
