using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class ProductFormatCore
    {
        TiendaDeMujicaDBContext dBContext;
        public ProductFormatCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<ProductFormat> Get()
        {
            try
            {
                return (from pf in dBContext.ProductFormat
                        select pf).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ProductFormat> Get(int id)
        {
            try
            {
                return (from pf in dBContext.ProductFormat
                        where pf.Id == id
                        select pf).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(ProductFormat productFormat)
        {
            try
            {
                bool validProductFormat = Validate(productFormat);
                if (validProductFormat)
                {
                    dBContext.Add(productFormat);
                    dBContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Validate(ProductFormat productFormat)
        {
            try
            {
                if (string.IsNullOrEmpty(productFormat.IdProduct.ToString()) || string.IsNullOrEmpty(productFormat.IdFormat.ToString()))
                    return false;

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(ProductFormat productFormat, int id)
        {
            try
            {
                bool validProductFormat = Validate(productFormat);

                if (validProductFormat)
                {
                    bool existingProductFormat = dBContext.ProductFormat.Any(productFormat => productFormat.Id == id);
                    if (existingProductFormat)
                    {
                        productFormat.Id = id;

                        dBContext.Update(productFormat);
                        dBContext.SaveChanges();
                    }
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Delete(int id)
        {
            try
            {
                ProductFormat productFormat = dBContext.ProductFormat.FirstOrDefault(x => x.Id == id);
                if (productFormat != null)
                {
                    dBContext.ProductFormat.Remove(productFormat);
                    dBContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
