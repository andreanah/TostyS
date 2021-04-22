using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Lib;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class UserCore
    {
        TiendaDeMujicaDBContext dBContext;
        public UserCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<User> Get()
        {
            try
            {
                return (from u in dBContext.User
                        where u.Active == true
                        select u).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<User> Get(string id)
        {
            try
            {
                return (from u in dBContext.User
                        where u.Id == id && u.Active == true
                        select u).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(User user, string id)
        {
            try
            {
                bool validUser = Validate(user);

                if (validUser)
                {
                    bool existingUser = dBContext.User.Any(user => user.Id == id);
                    if (existingUser)
                    {
                        user.Id = id;

                        dBContext.Attach(user);

                        if (user.Email!=null)
                        {
                            user.NormalizedEmail = user.Email.ToUpper();
                            dBContext.Entry(user).Property("Email").IsModified = true;
                            dBContext.Entry(user).Property("NormalizedEmail").IsModified = true;
                        }

                        if (user.Name != null)
                        {
                            dBContext.Entry(user).Property("Name").IsModified = true;
                        }

                        if (user.UserName != null)
                        {
                            user.NormalizedUserName = user.UserName.ToUpper();
                            dBContext.Entry(user).Property("UserName").IsModified = true;
                            dBContext.Entry(user).Property("NormalizedUserName").IsModified = true;
                        }                        

                        dBContext.SaveChanges();
                    }
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Disable(string id)
        {
            try
            {
                User user = dBContext.User.FirstOrDefault(x => x.Id == id);
                if (user != null)
                {
                    user.Active = false;
                    dBContext.Update(user);
                    dBContext.SaveChanges();
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Validate(User user)
        {
            try
            {
                if (!string.IsNullOrEmpty(user.UserName))
                {
                    if (user.UserName.Length > 20)
                        return false;
                }

                if (!string.IsNullOrEmpty(user.Name))
                {
                    if (user.Name.Length > 50)
                        return false;
                }

                if (!string.IsNullOrEmpty(user.Email))
                {
                    if (user.Email.Length > 40)
                        return false;

                    Validate validator = new Validate();
                    if(!validator.IsValidEmail(user.Email))
                    {
                        return false;
                    }
                }

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
