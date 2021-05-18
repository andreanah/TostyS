using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class CreditCardCore
    {
        TiendaDeMujicaDBContext dBContext;
        public CreditCardCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<CreditCard> Get()
        {
            try
            {
                return (from cc in dBContext.CreditCard
                        select cc).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<CreditCard> Get(int id)
        {
            try
            {
                return (from cc in dBContext.CreditCard
                        where cc.Id == id
                        select cc).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(CreditCard creditCard)
        {
            try
            {
                bool validCreditCard = Validate(creditCard);
                if (validCreditCard)
                {
                    dBContext.Add(creditCard);
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

        public bool Validate(CreditCard creditCard)
        {
            try
            {
                if (string.IsNullOrEmpty(creditCard.DateBirth.ToString()) ||
                    string.IsNullOrEmpty(creditCard.CreditCardNumber) || creditCard.CreditCardNumber.Length > 16)
                    return false;

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(CreditCard creditCard, int id)
        {
            try
            {
                bool validCreditCard = Validate(creditCard);

                if (validCreditCard)
                {
                    bool existingCreditCard = dBContext.CreditCard.Any(creditCard => creditCard.Id == id);
                    if (existingCreditCard)
                    {
                        creditCard.Id = id;

                        dBContext.Update(creditCard);
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
                CreditCard creditCard = dBContext.CreditCard.FirstOrDefault(x => x.Id == id);
                if (creditCard != null)
                {
                    dBContext.Remove(creditCard);
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
    }
}
