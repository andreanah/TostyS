using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class ArtistCore
    {
        TiendaDeMujicaDBContext dBContext;
        public ArtistCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<Artist> Get()
        {
            try
            {
                return (from a in dBContext.Artist
                        where a.Active == true
                        select a).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public List<Artist> Get(int id)
        {
            try
            {
                return (from a in dBContext.Artist
                        where a.Active == true && a.Id == id
                        select a).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(Artist artist)
        {
            try
            {
                bool validArtist = Validate(artist);
                if (validArtist)
                {
                    dBContext.Add(artist);
                    dBContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Validate(Artist artist)
        {
            try
            {
                if (string.IsNullOrEmpty(artist.StageName) || artist.StageName.Length > 50 ||
                    string.IsNullOrEmpty(artist.RealName) || artist.RealName.Length > 50 ||
                    string.IsNullOrEmpty(artist.Description) || artist.Description.Length > 50)
                    return false;

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(Artist artist, int id)
        {
            try
            {
                bool validArtist = Validate(artist);

                if (validArtist)
                {
                    bool existingArtist = dBContext.Artist.Any(artist => artist.Id == id);
                    if (existingArtist)
                    {
                        artist.Id = id;
                        artist.Active = true;

                        dBContext.Update(artist);
                        dBContext.SaveChanges();
                    }
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
                Artist artist = dBContext.Artist.FirstOrDefault(x => x.Id == id && x.Active);
                if (artist != null)
                {
                    artist.Active = false;
                    dBContext.Update(artist);
                    dBContext.SaveChanges();
                }

            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
