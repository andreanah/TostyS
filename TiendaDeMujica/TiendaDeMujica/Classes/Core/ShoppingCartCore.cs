using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class ShoppingCartCore
    {
        TiendaDeMujicaDBContext dBContext;
        public ShoppingCartCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<ShoppingCart> Get()
        {
            try
            {
                return (from sc in dBContext.ShoppingCart
                        select sc).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ShoppingCart> Get(int id)
        {
            try
            {
                return (from sc in dBContext.ShoppingCart
                        where sc.Id == id
                        select sc).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(ShoppingCart shoppingCart)
        {
            try
            {
                bool validShoppingCart = Validate(shoppingCart);
                if (validShoppingCart || shoppingCart.IdProduct != 0 || shoppingCart.IdUser !=null)
                {
                    dBContext.Add(shoppingCart);
                    dBContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(ShoppingCart shoppingCart, int id)
        {
            try
            {
                bool validShoppingCart = Validate(shoppingCart);

                if (validShoppingCart)
                {
                    bool existingShoppingCart = dBContext.ShoppingCart.Any(shoppingCart => shoppingCart.Id == id);
                    if (existingShoppingCart)
                    {
                        shoppingCart.Id = id;

                        dBContext.Entry(shoppingCart).Property("Quantity").IsModified = true;

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
                ShoppingCart shoppingCart = dBContext.ShoppingCart.FirstOrDefault(x => x.Id == id);
                if (shoppingCart != null)
                {
                    dBContext.ShoppingCart.Remove(shoppingCart);
                    dBContext.SaveChanges();
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Validate(ShoppingCart shoppingCart)
        {
            try
            {
                if (shoppingCart.Quantity <= 0)
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

