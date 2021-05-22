using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;
using TiendaDeMujica.Models.ViewModels;

namespace TiendaDeMujica.Classes.Core
{
    public class OrderCore
    {
        TiendaDeMujicaDBContext dBContext;
        public OrderCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<Order> Get()
        {
            try
            {
                return (from o in dBContext.Order
                        where o.Active == true
                        select o).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Order> Get(int id)
        {
            try
            {
                return (from o in dBContext.Order
                        where o.Id == id && o.Active == true
                        select o).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Order> GetAllOfUser(string id)
        {
            try
            {
                return (from o in dBContext.Order
                        where o.IdUser == id && o.Active == true
                        select o).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<OrderViewModel> GetOrderOrderProducts(string id)
        {
            try
            {
                var query = (from o in dBContext.Order
                             join a in dBContext.Address on o.IdAddress equals a.Id
                             join op in dBContext.OrderProduct on o.Id equals op.IdOrder
                             join f in dBContext.Format on op.IdFormat equals f.Id
                             join p in dBContext.Product on op.IdProduct equals p.Id
                             where o.IdUser == id && o.Active == true
                             select new
                             {
                                 Order = o,
                                 Format = f,
                                 Address = a,
                                 OrderProduct = op,
                                 Product = p,
                             }).ToList();

                List<OrderViewModel> orderViewModel = (query.GroupBy(x => (x.Order, x.Address)).Select(x => new OrderViewModel
                {
                    Order = x.Key.Order,
                    Address = x.Key.Address,

                    OrderProducts = x.Select(y => new OrderProductViewModel
                    {
                        OrderProduct = y.OrderProduct,
                        Format = y.Format,
                        Product = y.Product
                    }).ToList()
                }).ToList());

                return orderViewModel;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(Order order)
        {
            try
            {
                bool validOrder = Validate(order);
                if (validOrder)
                {
                    dBContext.Add(order);
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

        public void Update(Order order, int id)
        {
            try
            {
                bool validOrder = Validate(order);

                if (validOrder)
                {
                    bool existingOrder = dBContext.Order.Any(order => order.Id == id);
                    if (existingOrder)
                    {
                        order.Id = id;

                        dBContext.Attach(order);

                        dBContext.Entry(order).Property("Total").IsModified = true;
                        dBContext.Entry(order).Property("Status").IsModified = true;

                        if (order.IdAddress != 0)
                            dBContext.Entry(order).Property("IdAddress").IsModified = true;

                        if (order.IdUser != null)
                            dBContext.Entry(order).Property("IdUser").IsModified = true;

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

        public void OrderConfirm(int id)
        {
            try
            {
                bool existingOrder = dBContext.Order.Any(order => order.Id == id);
                if (existingOrder)
                {
                    Order order = dBContext.Order.FirstOrDefault(x => x.Id == id);

                    order.Status = "Finalizado";
                    
                    dBContext.Attach(order);

                    dBContext.Entry(order).Property("Status").IsModified = true;

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

        public void Disable(int id)
        {
            try
            {
                Order order = dBContext.Order.FirstOrDefault(x => x.Id == id);
                if (order != null)
                {
                    order.Active = false;
                    dBContext.Update(order);
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

        public bool Validate(Order order)
        {
            try
            {

                if (float.IsNaN(order.Total) || string.IsNullOrEmpty(order.Status))
                    return false;
                if (order.Status.Length > 30)
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
