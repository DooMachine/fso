using fso.Core;
using fso.Core.Data;
using fso.Core.Domains.Helpers;
using fso.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace fso.Services
{
    public class Service<TEntity> : IService<TEntity> where TEntity : BaseEntity
    {
        public IUnitOfWork UnitOfWork { get; private set; }
        private readonly IRepository<TEntity> _repository;
        private bool _disposed;

        public Service(IUnitOfWork unitOfWork)
        {
            UnitOfWork = unitOfWork;
            _repository = UnitOfWork.Repository<TEntity>();
        }

        public List<TEntity> GetAll()
        {
            return _repository.GetAll();
        }
        public PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, params Expression<Func<TEntity,object>>[] includeProperties)
        {
            return _repository.GetAll(pageIndex, pageSize,includeProperties);
        }

        public PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, OrderBy orderBy = OrderBy.Ascending, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return _repository.GetAll(pageIndex, pageSize, keySelector, orderBy,includeProperties);
        }

        public PaginatedList<TEntity> GetAll(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return _repository.GetAll(pageIndex, pageSize, keySelector, predicate, orderBy, includeProperties);
        }

        public TEntity GetById(int id)
        {
            return _repository.GetSingle(id);
        }
        public PaginatedList<TEntity> GetAllBy(int pageIndex, int pageSize, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, Expression<Func<TEntity, object>> keySelector, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return _repository.GetAllBy(pageIndex, pageSize, predicate,orderBy,keySelector, includeProperties);
        }
        public TEntity SingleBy(Expression<Func<TEntity, bool>> predicate, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return _repository.SingleBy(predicate,includeProperties);
        }
        public void Add(TEntity entity)
        {
            _repository.Insert(entity);
            UnitOfWork.SaveChanges();
        }

        public void Update(TEntity entity)
        {
            _repository.Update(entity);
            UnitOfWork.SaveChanges();
        }

        public void Delete(TEntity entity)
        {
            _repository.Delete(entity);
            UnitOfWork.SaveChanges();
        }

        public Task<List<TEntity>> GetAllAsync()
        {
            return _repository.GetAllAsync();
        }

        public Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return _repository.GetAllAsync(pageIndex, pageSize, includeProperties);
        }

        public Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, OrderBy orderBy = OrderBy.Ascending, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return _repository.GetAllAsync(pageIndex, pageSize, keySelector, orderBy,includeProperties);
        }

        public Task<PaginatedList<TEntity>> GetAllAsync(int pageIndex, int pageSize, Expression<Func<TEntity, object>> keySelector, Expression<Func<TEntity, bool>> predicate, OrderBy orderBy, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return _repository.GetAllAsync(pageIndex, pageSize, keySelector, predicate, orderBy, includeProperties);
        }

        public Task<TEntity> GetByIdAsync(int id)
        {
            return _repository.GetSingleAsync(id);
        }

        public Task AddAsync(TEntity entity)
        {
            _repository.Insert(entity);
            return UnitOfWork.SaveChangesAsync();
        }

        public Task UpdateAsync(TEntity entity)
        {
            _repository.Update(entity);
            return UnitOfWork.SaveChangesAsync();
        }

        public Task DeleteAsync(TEntity entity)
        {
            _repository.Delete(entity);
            return UnitOfWork.SaveChangesAsync();
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed && disposing)
            {
                UnitOfWork.Dispose();
            }
            _disposed = true;
        }

    }
}
