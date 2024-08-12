using Bootcamp_Domain.Models;
using Bootcamp_Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Bootcamp_Infrastructure.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDataContext _context;

        public ProductRepository(ApplicationDataContext context)
        {
            _context = context;
        }

        public async Task<bool> Add(Product product)
        {
            _context.Products.Add(product);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Delete(Guid id)
        {
            var product = await _context.Products.FindAsync(id);

            if (product == null)
            {
                return false;
            }

            _context.Products.Remove(product);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Product>> Get()
        {
            return await _context.Products.ToListAsync();
        }

        public async Task<Product> GetById(Guid id)
        {
            return await _context.Products.FindAsync(id);
        }

        public async Task<bool> Update(Guid id, Product request)
        {
            var product = await _context.Products.FindAsync(request.Id);

            if (product == null) return false;

            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.Stock = request.Stock;
            product.ImageUrl = request.ImageUrl;

            _context.Products.Update(product);
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
