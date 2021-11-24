using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class OrderProductCore
    {
        TiendaDeMujicaDBContext dBContext;
        public OrderProductCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<OrderProduct> Get()
        {
            try
            {
                return (from op in dBContext.OrderProduct
                        select op).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<OrderProduct> Get(int id)
        {
            try
            {
                return (from op in dBContext.OrderProduct
                        where op.Id == id
                        select op).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(OrderProduct orderProduct)
        {
            try
            {
                bool validOrderProduct = Validate(orderProduct);
                if (validOrderProduct || orderProduct.IdProduct!=0)
                {
                    Product product = dBContext.Product.FirstOrDefault(x => x.Id == orderProduct.IdProduct);
                    orderProduct.UnitPrice = product.Price;
                    orderProduct.TotalPrice = product.Price * orderProduct.Quantity;
                    dBContext.Add(orderProduct);
                    dBContext.SaveChanges();
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

        public void Update(OrderProduct orderProduct, int id)
        {
            try
            {
                bool validOrderProduct = Validate(orderProduct);

                if (validOrderProduct)
                {
                    bool existingOrderProduct = dBContext.OrderProduct.Any(orderProduct => orderProduct.Id == id);
                    if (existingOrderProduct)
                    {
                        orderProduct.Id = id;

                        OrderProduct orderP = dBContext.OrderProduct.Single(x => x.Id == id);

                        dBContext.Entry(orderP).State = EntityState.Detached;

                        orderProduct.TotalPrice = orderProduct.Quantity * orderP.UnitPrice;
                        dBContext.Attach(orderProduct);
                        dBContext.Entry(orderProduct).Property("Quantity").IsModified = true;
                        dBContext.Entry(orderProduct).Property("TotalPrice").IsModified = true;

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
                OrderProduct orderProduct = dBContext.OrderProduct.FirstOrDefault(x => x.Id == id);
                if (orderProduct != null)
                {
                    dBContext.OrderProduct.Remove(orderProduct);
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

        public bool Validate(OrderProduct orderProduct)
        {
            try
            {
                if (orderProduct.Quantity <= 0)
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

