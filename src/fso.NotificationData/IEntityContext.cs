using fso.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace fso.NotificationData
{
    public interface IEntityContext : IDisposable
    {
        DbSet<TEntity> SetChild<TEntity>() where TEntity : class;
        DbSet<TEntity> Set<TEntity>() where TEntity : BaseEntity;
        void SetAsAdded<TEntity>(TEntity entity) where TEntity : BaseEntity;
        void SetChildAsAdded<TEntity>(TEntity entity) where TEntity : class;
        void SetAsModified<TEntity>(TEntity entity) where TEntity : BaseEntity;
        void SetChildAsModified<TEntity>(TEntity entity) where TEntity : class;
        void SetAsDeleted<TEntity>(TEntity entity) where TEntity : BaseEntity;
        void SetChildAsDeleted<TEntity>(TEntity entity) where TEntity : class;
        int SaveChanges();
        Task<int> SaveChangesAsync();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
        void BeginTransaction();
        int Commit();
        void Rollback();
        Task<int> CommitAsync();
    }
}
