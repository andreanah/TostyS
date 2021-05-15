using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;
using TiendaDeMujica.Models.ViewModels;

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
                if (validShoppingCart || shoppingCart.IdProduct != 0 || shoppingCart.IdUser != null)
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

        public void ShoppingCartToOrder(string idUser, int idAddress)
        {
            try
            {
                List<ShoppingCartProductsModel> shoppingCartProducts = (
                    from sc in dBContext.ShoppingCart
                    join p in dBContext.Product on sc.IdProduct equals p.Id
                    where sc.IdUser == idUser
                    select new ShoppingCartProductsModel
                    {
                        IdShoppingCart = sc.Id,
                        IdProduct = p.Id,
                        Price = p.Price,
                        Quantity = sc.Quantity,
                    }
                    ).ToList();

                float total = 0;

                foreach (var scp in shoppingCartProducts)
                {
                    total += scp.Price * scp.Quantity;
                }

                Order order = new Order
                {
                    IdAddress = idAddress,
                    IdUser = idUser,
                    Total = total,
                    Active = true,
                    Status = "Finalizado"
                };

                dBContext.Add(order);
                dBContext.SaveChanges();

                foreach (var scp in shoppingCartProducts)
                {
                    OrderProduct orderProduct = new OrderProduct
                    {
                        IdProduct = scp.IdProduct,
                        IdOrder = order.Id,
                        Quantity = scp.Quantity,
                        TotalPrice = scp.Quantity * scp.Price,
                        UnitPrice = scp.Price
                    };

                    ShoppingCart shoppingCartAux = dBContext.ShoppingCart.FirstOrDefault(x => x.Id == scp.IdShoppingCart);

                    dBContext.ShoppingCart.Remove(shoppingCartAux);
                    dBContext.Add(orderProduct);
                }

                dBContext.SaveChanges();

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
                }else
                {
                    throw 
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

