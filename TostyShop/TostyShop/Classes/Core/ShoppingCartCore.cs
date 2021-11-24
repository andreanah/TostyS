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
                    ShoppingCart shoppingCartGet = dBContext.ShoppingCart.FirstOrDefault(x => x.IdProduct == shoppingCart.IdProduct && x.IdFormat == shoppingCart.IdFormat);
                    if (shoppingCartGet == null)
                    {
                        dBContext.Add(shoppingCart);
                        dBContext.SaveChanges();
                    }
                    else
                    {
                        shoppingCartGet.Quantity = shoppingCart.Quantity;

                        dBContext.Attach(shoppingCartGet);

                        dBContext.Entry(shoppingCartGet).Property("Quantity").IsModified = true;

                        dBContext.SaveChanges();
                    }
                       
                }
                else
                {
                    throw new Exception("Enter the data correctly");
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
                bool existingUser = dBContext.User.Any(user => user.Id == idUser);
                bool existingAddress = dBContext.Address.Any(user => user.Id == idAddress);

                if (existingAddress && existingUser)
                {

                    List<ShoppingCartProductsModel> shoppingCartProducts = (
                        from sc in dBContext.ShoppingCart
                        join p in dBContext.Product on sc.IdProduct equals p.Id
                        where sc.IdUser == idUser
                        select new ShoppingCartProductsModel
                        {
                            IdShoppingCart = sc.Id,
                            IdProduct = p.Id,
                            IdFormat = sc.IdFormat,
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
                        Status = "Confirmar entregar"
                    };

                    dBContext.Add(order);
                    dBContext.SaveChanges();

                    foreach (var scp in shoppingCartProducts)
                    {
                        OrderProduct orderProduct = new OrderProduct
                        {
                            IdProduct = scp.IdProduct,
                            IdOrder = order.Id,
                            IdFormat = scp.IdFormat,
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
                else
                {
                    throw new Exception("Enter a valid id");
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

                        dBContext.Attach(shoppingCart);

                        dBContext.Entry(shoppingCart).Property("Quantity").IsModified = true;
                        dBContext.Entry(shoppingCart).Property("IdFormat").IsModified = true;

                        dBContext.SaveChanges();
                    }
                    else
                    {
                        throw new Exception("Enter a valid id");
                    }
                }
                else
                {
                    throw new Exception("Enter the data correctly");
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
                else
                {
                    throw new Exception("Enter a valid id");
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

