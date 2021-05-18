using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class FormatCore
    {
        TiendaDeMujicaDBContext dBContext;
        public FormatCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }
        public List<Format> Get()
        {
            try
            {
                return (from f in dBContext.Format
                        where f.Active == true
                        select f).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Format> Get(int id)
        {
            try
            {
                return (from f in dBContext.Format
                        where f.Active == true && f.Id == id
                        select f).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(Format format)
        {
            try
            {
                bool validFormat = Validate(format);
                if (validFormat)
                {
                    dBContext.Add(format);
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

        public bool Validate(Format format)
        {
            try
            {
                if (string.IsNullOrEmpty(format.TypeCode) || format.TypeCode.Length > 3 ||
                    string.IsNullOrEmpty(format.Type) || format.Type.Length > 15)
                    return false;

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(Format format, int id)
        {
            try
            {
                bool validFormat = Validate(format);

                if (validFormat)
                {
                    bool existingFormat = dBContext.Format.Any(format => format.Id == id);
                    if (existingFormat)
                    {
                        format.Id = id;
                        format.Active = true;

                        dBContext.Update(format);
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
                Format format = dBContext.Format.FirstOrDefault(x => x.Id == id && x.Active);
                if (format != null)
                {
                    format.Active = false;
                    dBContext.Update(format);
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
