using fso.Core.Domains.Helpers;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace fso.Core.Data
{
    public interface IRepository<TEntity> : IDisposable where TEntity : BaseEntity
    {
        List<TEntity> GetAll();
        PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, params Expression<Func<TEntity, object>>[] includeProperties);
        PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, OrderBy orderBy = OrderBy.Ascending, params Expression<Func<TEntity, object>>[] includeProperties);
        PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, params Expression<Func<TEntity, object>>[] includeProperties);
        List<TEntity> GetAllIncluding(params Expression<Func<TEntity, object>>[] includeProperties);
        TEntity GetSingle(int id);
        TEntity GetSingleIncluding(int id, params Expression<Func<TEntity, object>>[] includeProperties);
        List<TEntity> FindBy(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties);
        TEntity SingleBy(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties);
        PaginatedList<TEntity> GetAllBy(int pageIndex, int pageSize, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, Expression<Func<TEntity, object>> keySelector, params Expression<Func<TEntity, object>>[] includeProperties);
        void Insert(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        Task<List<TEntity>> GetAllAsync();
        Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, params Expression<Func<TEntity, object>>[] includeProperties);
        Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, OrderBy orderBy = OrderBy.Ascending, params Expression<Func<TEntity, object>>[] includeProperties);
        Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, params Expression<Func<TEntity, object>>[] includeProperties);
        Task<List<TEntity>> GetAllIncludingAsync(params Expression<Func<TEntity, object>>[] includeProperties);
        Task<TEntity> GetSingleAsync(int id);
        Task<TEntity> GetSingleIncludingAsync(int id, params Expression<Func<TEntity, object>>[] includeProperties);
        Task<List<TEntity>> FindByAsync(Expression<Func<TEntity, bool>> predicate);
    }
}
