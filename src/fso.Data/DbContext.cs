using fso.Core;
using fso.Data.EntityMappings;
using fso.Data.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System;

namespace fso.Data
{
    public class FsoContext : DbContext, IEntityContext
    {
        private IDbContextTransaction _transaction;
        private static readonly object Lock = new object();
        private static bool _databaseInitialized = false;

        public FsoContext()
        {
        }
        public FsoContext(DbContextOptions options) : base(options)
        {
            if (!_databaseInitialized)
            {
                bool isMigrated = !Database.GetPendingMigrations().Any();
                // TODO HANDLE MIGRATION RUNTIME
                if ((this.GetService<IDatabaseCreator>() as RelationalDatabaseCreator).Exists())
                {                    
                    DbInitializer di = new DbInitializer(this);
                    di.Initialize();
                    _databaseInitialized = true;
                }
                if (!isMigrated)
                {
                    Database.Migrate();
                    _databaseInitialized = true;
                }
            }

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.AddConfiguration(new UserActivityMap());
            modelBuilder.AddConfiguration(new PostCollectionMap());
            modelBuilder.AddConfiguration(new ImageMap());
            modelBuilder.AddConfiguration(new PostMap());
            modelBuilder.AddConfiguration(new CommentLikeMap());
            modelBuilder.AddConfiguration(new PostPartMap());
            modelBuilder.AddConfiguration(new CommentMap());
            modelBuilder.AddConfiguration(new UserInfoMap());
            modelBuilder.AddConfiguration(new FollowInfoMap());
            modelBuilder.AddConfiguration(new ReviewMap());
            modelBuilder.AddConfiguration(new GroupMap());
            modelBuilder.AddConfiguration(new GroupUserMap());
            modelBuilder.AddConfiguration(new GroupPostMap());
            modelBuilder.AddConfiguration(new UserReviewLikeMap());
            modelBuilder.AddConfiguration(new UserPostLikeMap());
            modelBuilder.AddConfiguration(new GroupRelationMap());
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
            optionsBuilder
                .UseSqlServer(config.GetConnectionString("DefaultConnection"),
                    x =>
                    {
                        x.MigrationsAssembly("fso.Data");
                    });
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
        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();

            UpdateUpdatedProperty<BaseEntity>();

            return base.SaveChanges();
        }
        private void UpdateUpdatedProperty<T>() where T : BaseEntity
        {
            var modifiedSourceInfo =
                ChangeTracker.Entries<T>()
                    .Where(e => e.State == EntityState.Modified);
            var addedSourceInfo =
                ChangeTracker.Entries<T>()
                    .Where(e => e.State == EntityState.Added);

            foreach (var entry in modifiedSourceInfo)
            {
                entry.Property("DateUtcModified").CurrentValue = DateTime.UtcNow;
            }
            foreach (var entry in addedSourceInfo)
            {
                entry.Property("DateUtcAdd").CurrentValue = DateTime.UtcNow;
            }
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
        public EntityEntry GetDbEntityEntrySafely<TEntity>(TEntity entity) where TEntity : BaseEntity
        {
            var dbEntityEntry = Entry(entity);
            if (dbEntityEntry.State == EntityState.Detached)
            {
                Set<TEntity>().Attach(entity);
            }
            return dbEntityEntry;
        }
        public EntityEntry GetChildDbEntityEntrySafely<TEntity>(TEntity entity) where TEntity : class
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
