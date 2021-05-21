using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class AddressCore
    {
        TiendaDeMujicaDBContext dBContext;
        public AddressCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<Address> Get()
        {
            try
            {
                return (from a in dBContext.Address
                        where a.Active
                        select a).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Address> Get(int id)
        {
            try
            {
                return (from a in dBContext.Address
                        where a.Id == id && a.Active
                        select a).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Address> GetAllOfUser(string id)
        {
            try
            {
                return (from a in dBContext.Address
                        where a.Active && a.IdUser == id
                        select a).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(Address address)
        {
            try
            {
                bool validAddress = Validate(address);
                if (validAddress)
                {
                    dBContext.Add(address);
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

        public void Update(Address address, int id)
        {
            try
            {
                bool validAddress = Validate(address);

                if (validAddress)
                {
                    bool existingAddress = dBContext.Address.Any(address => address.Id == id);
                    if (existingAddress)
                    {
                        address.Id = id;

                        dBContext.Update(address);
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
                Address address = dBContext.Address.FirstOrDefault(x => x.Id == id);
                if (address != null)
                {
                    address.Active = false;
                    dBContext.Update(address);
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

        public bool Validate(Address address)
        {
            try
            {
                if (string.IsNullOrEmpty(address.Street) || string.IsNullOrEmpty(address.City) || string.IsNullOrEmpty(address.CP) || string.IsNullOrEmpty(address.Country) || string.IsNullOrEmpty(address.Suburb) || string.IsNullOrEmpty(address.IdUser))
                    return false;
                if (address.Street.Length > 20 || address.City.Length > 20 || address.Country.Length > 20 || address.Suburb.Length > 20 || address.CP.Length > 10)
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
