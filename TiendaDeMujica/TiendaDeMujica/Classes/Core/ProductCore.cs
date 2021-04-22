using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class ProductCore
    {
        TiendaDeMujicaDBContext dBContext;
        public ProductCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<Product> Get()
        {
            try
            {
                return (from p in dBContext.Product
                        where p.Active == true
                        select p).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Product> Get(int id)
        {
            try
            {
                return (from p in dBContext.Product
                        where p.Id == id && p.Active == true
                        select p).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(Product product)
        {
            try
            {
                bool validProduct = Validate(product);
                if (validProduct)
                {
                    dBContext.Add(product);
                    dBContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(Product product, int id)
        {
            try
            {
                bool validProduct = Validate(product);

                if (validProduct)
                {
                    bool existingProduct = dBContext.Product.Any(product => product.Id == id);
                    if (existingProduct)
                    {
                        product.Id = id;

                        dBContext.Attach(product);

                        dBContext.Entry(product).Property("Name").IsModified = true;
                        dBContext.Entry(product).Property("Price").IsModified = true;
                        dBContext.Entry(product).Property("Description").IsModified = true;

                        if (product.IdGenre != 0)
                            dBContext.Entry(product).Property("IdGenre").IsModified = true;

                        dBContext.SaveChanges();
                    }
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Disable(int id)
        {
            try
            {
                Product product = dBContext.Product.FirstOrDefault(x => x.Id == id);
                if (product != null)
                {
                    product.Active = false;
                    dBContext.Update(product);
                    dBContext.SaveChanges();
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Validate(Product product)
        {
            try
            {

                if (string.IsNullOrEmpty(product.Name) || float.IsNaN(product.Price))
                    return false;
                if (product.Name.Length > 50 || product.Description.Length > 255 || product.Price > 1000000)
                    return false;

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
