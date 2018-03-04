using fso.Core;
using fso.NotificationData.Domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace fso.NotificationData.Data
{
    public class NotificationContext : DbContext, IEntityContext
    {
        private static bool _databaseInitialized = false;
        private IDbContextTransaction _transaction;
        public DbSet<Notification> Notification { get; set; }
        public NotificationContext()
        {

        }

        public NotificationContext(DbContextOptions options) : base(options)
        {
            if (!_databaseInitialized)
            {
                // TODO HANDLE MIGRATION AND SEED RUNTIME
                if (!(this.GetService<IDatabaseCreator>() as RelationalDatabaseCreator).Exists())
                {
                    Database.EnsureCreated();
                    _databaseInitialized = true;
                }
                else if (this.Database.GetPendingMigrations().Any())
                {
                    Database.EnsureDeleted();
                    Database.EnsureCreated();
                    _databaseInitialized = true;
                }
            }
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // get the configuration from the app settings
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            // define the database to use
            optionsBuilder.UseSqlServer(config.GetConnectionString("NotificationConnection"));
        }
        public DbSet<TEntity> SetChild<TEntity>() where TEntity : class
        {
            return base.Set<TEntity>();
        }

        public new DbSet<TEntity> Set<TEntity>() where TEntity : BaseEntity
        {
            return base.Set<TEntity>();
        }

        public void SetAsAdded<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            UpdateEntityState(entity, EntityState.Added);
        }
        public void SetChildAsAdded<TEntity>(TEntity entity) where TEntity : class
        {
            UpdateChildEntityState(entity, EntityState.Added);
        }

        public void SetAsModified<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            UpdateEntityState(entity, EntityState.Modified);
        }
        public void SetChildAsModified<TEntity>(TEntity entity) where TEntity : class
        {
            UpdateChildEntityState(entity, EntityState.Modified);
        }
        public void SetAsDeleted<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            UpdateEntityState(entity, EntityState.Deleted);
        }
        public void SetChildAsDeleted<TEntity>(TEntity entity) where TEntity : class
        {
            UpdateChildEntityState(entity, EntityState.Deleted);
        }
        public void BeginTransaction()
        {
            if (this.Database.GetDbConnection().State == ConnectionState.Open)
            {
                return;
            }
            this.Database.OpenConnection();
            _transaction = this.Database.BeginTransaction();
        }

        public int Commit()
        {
            var saveChanges = SaveChanges();
            _transaction.Commit();
            return saveChanges;
        }

        public void Rollback()
        {
            _transaction.Rollback();
        }

        public Task<int> CommitAsync()
        {
            var saveChangesAsync = SaveChangesAsync();
            _transaction.Commit();
            return saveChangesAsync;
        }

        private void UpdateEntityState<TEntity>(TEntity entity, EntityState entityState) where TEntity : BaseEntity
        {
            var dbEntityEntry = GetDbEntityEntrySafely(entity);
            dbEntityEntry.State = entityState;
        }
        private void UpdateChildEntityState<TEntity>(TEntity entity, EntityState entityState) where TEntity : class
        {
            var dbEntityEntry = GetChildDbEntityEntrySafely(entity);
            dbEntityEntry.State = entityState;
        }
        private EntityEntry GetDbEntityEntrySafely<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            var dbEntityEntry = Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                Set<TEntity>().Attach(entity);
            }
            return dbEntityEntry;
        }
        private EntityEntry GetChildDbEntityEntrySafely<TEntity>(TEntity entity) where TEntity : class
        {
            var dbEntityEntry = Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                SetChild<TEntity>().Attach(entity);
            }
            return dbEntityEntry;
        }

        public Task<int> SaveChangesAsync()
        {
            return SaveChangesAsync();
        }
    }
}
