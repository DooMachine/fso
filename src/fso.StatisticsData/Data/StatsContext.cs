using fso.Core;
using fso.Core.Domains;
using fso.StatisticsData.Domains;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace fso.StatisticsData.Data
{
    public class StatsContext : DbContext, IEntityContext
    {
        private static bool _databaseInitialized = false;
        private IDbContextTransaction _transaction;
        public DbSet<AbuseReport> AbuseReports { get; set; }
        public DbSet<UserStatic> UserStatics { get; set; }
        public DbSet<GroupStatic> GroupStatics { get; set; }
        public DbSet<PostStatic> PostStatics { get; set; }
        public DbSet<ReviewStatic> ReviewStatics { get; set; }
        public DbSet<CommentStatic> CommentStatics { get; set; }
        public StatsContext()
        {

        }

        public StatsContext(DbContextOptions options) : base(options)
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

            modelBuilder.Entity<AbuseReport>()
                .HasOne(p => p.Post)
                .WithMany(p => p.AbuseReports)
                .HasForeignKey(p => p.PostStatId)
                .IsRequired(false);

            modelBuilder.Entity<AbuseReport>()
                .HasOne(p => p.Comment)
                .WithMany(p => p.AbuseReports)
                .HasForeignKey(p => p.CommentStatId)
                .IsRequired(false);

            modelBuilder.Entity<AbuseReport>()
                .HasOne(p => p.Review)
                .WithMany(p => p.AbuseReports)
                .HasForeignKey(p => p.ReviewStatId)
                .IsRequired(false);

            modelBuilder.Entity<AbuseReport>()
                .HasOne(p => p.Group)
                .WithMany(p => p.AbuseReports)
                .HasForeignKey(p => p.GroupStatId)
                .IsRequired(false);

            modelBuilder.Entity<AbuseReport>()
                .HasOne(p => p.User)
                .WithMany(p => p.AbuseReports)
                .HasForeignKey(p => p.UserStatId)
                .IsRequired(false);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // get the configuration from the app settings
            var config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            // define the database to use
            optionsBuilder.UseSqlServer(config.GetConnectionString("StatsConnection"));
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
        public Task<int> SaveChangesAsync()
        {
            return SaveChangesAsync();
        }
    }
}
