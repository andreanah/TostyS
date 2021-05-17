using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

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
