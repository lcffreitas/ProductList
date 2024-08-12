using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bootcamp_Domain.Models
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> Get();
        Task<Product> GetById(Guid id);
        Task<bool> Add(Product product);
        Task<bool> Update(Guid id, Product product);
        Task<bool> Delete(Guid id);
    }
}
