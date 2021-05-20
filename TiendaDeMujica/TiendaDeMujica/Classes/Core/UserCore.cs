using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Lib;
using TiendaDeMujica.Models;
using TiendaDeMujica.Models.ViewModels;

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

        public string GetRole(string id)
        {
            try
            {
                string query = (from u in dBContext.User
                        join iur in dBContext.IdentityUserRole on u.Id equals iur.UserId
                        join r in dBContext.IdentityRole on iur.RoleId equals r.Id
                        where u.Id == id && u.Active == true
                        select r.Name).FirstOrDefault();

                string role = (!string.IsNullOrEmpty(query)) ? query : "User";

                return role;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public GetShoppingCartModel GetShoppingCartUser(string id)
        {
            try
            {
                var query = (from u in dBContext.User
                             join sc in dBContext.ShoppingCart on u.Id equals sc.IdUser
                             join p in dBContext.Product on sc.IdProduct equals p.Id
                             where u.Id == id && u.Active == true
                             select new
                             {
                                 IdUser = u.Id,
                                 UserName = u.UserName,
                                 IdShoppingCart = sc.Id,
                                 Quantity = sc.Quantity,
                                 Product = p,
                             }).ToList();

                GetShoppingCartModel shoppingCartModel = query.GroupBy(x => (x.IdUser,x.UserName)).Select(x => new GetShoppingCartModel
                {
                    IdUser = x.Key.IdUser,
                    UserName = x.Key.UserName,
                    ShoppingCart = x.Select(y => new ProductCartModel
                    {
                        IdShoppingCart = y.IdShoppingCart,
                        Quantity = y.Quantity,
                        Product = y.Product
                    }).ToList()
                }).First();
                return shoppingCartModel;
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

                        if (user.Email != null)
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
                    if (!validator.IsValidEmail(user.Email))
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
