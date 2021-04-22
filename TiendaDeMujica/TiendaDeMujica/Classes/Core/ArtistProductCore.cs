using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class ArtistProductCore
    {
        TiendaDeMujicaDBContext dBContext;
        public ArtistProductCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<ArtistProduct> Get()
        {
            try
            {
                return (from ap in dBContext.ArtistProduct
                        select ap).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<ArtistProduct> Get(int id)
        {
            try
            {
                return (from ap in dBContext.ArtistProduct
                        where ap.Id == id
                        select ap).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(ArtistProduct artistProduct)
        {
            try
            {
                bool validArtistProduct = Validate(artistProduct);
                if (validArtistProduct)
                {
                    dBContext.Add(artistProduct);
                    dBContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Validate(ArtistProduct artistProduct)
        {
            try
            {
                if (string.IsNullOrEmpty(artistProduct.IdArtist.ToString()) || string.IsNullOrEmpty(artistProduct.IdProduct.ToString()))
                    return false;

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(ArtistProduct artistProduct, int id)
        {
            try
            {
                bool validArtistProduct = Validate(artistProduct);

                if (validArtistProduct)
                {
                    bool existingArtistProduct = dBContext.ArtistProduct.Any(artistProduct => artistProduct.Id == id);
                    if (existingArtistProduct)
                    {
                        artistProduct.Id = id;

                        dBContext.Update(artistProduct);
                        dBContext.SaveChanges();
                    }
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
