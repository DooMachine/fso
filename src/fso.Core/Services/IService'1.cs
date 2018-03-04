using fso.Core.Domains.Helpers;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace fso.Core.Services
{
    public interface IService<TEntity> : IService where TEntity : BaseEntity
    {
        List<TEntity> GetAll();
        PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, params Expression<Func<TEntity, object>>[] includeProperties);
        PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, OrderBy orderBy = OrderBy.Ascending, params Expression<Func<TEntity, object>>[] includeProperties);
        PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, params Expression<Func<TEntity, object>>[] includeProperties);
        TEntity GetById(int id);
        PaginatedList<TEntity> GetAllBy(int pageIndex, int pageSize, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, Expression<Func<TEntity, object>> keySelector, params Expression<Func<TEntity, object>>[] includeProperties);
        TEntity SingleBy(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties);
        void Add(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        Task<List<TEntity>> GetAllAsync();
        Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, params Expression<Func<TEntity, object>>[] includeProperties);
        Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, OrderBy orderBy = OrderBy.Ascending, params Expression<Func<TEntity, object>>[] includeProperties);
        Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, params Expression<Func<TEntity, object>>[] includeProperties);
        Task<TEntity> GetByIdAsync(int id);
        Task AddAsync(TEntity entity);
        Task UpdateAsync(TEntity entity);
        Task DeleteAsync(TEntity entity);

    }
}
