using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Classes.Core
{
    public class GenreCore
    {
        TiendaDeMujicaDBContext dBContext;
        public GenreCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<Genre> Get()
        {
            try
            {
                return (from g in dBContext.Genre
                        where g.Active == true
                        select g).ToList();
            }
            catch(Exception e)
            {
                throw e;
            }
        }

        public List<Genre> Get(int id)
        {
            try
            {
                return (from g in dBContext.Genre
                        where g.Active == true && g.Id == id
                        select g).ToList();
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Create(Genre genre)
        {
            try
            {
                bool validGenre = Validate(genre);
                if (validGenre)
                {
                    dBContext.Add(genre);
                    dBContext.SaveChanges();
                }
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public bool Validate(Genre genre)
        {
            try
            {
                if(string.IsNullOrEmpty(genre.GenreName) || genre.GenreName.Length > 30)
                    return false;

                return true;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public void Update(Genre genre, int id)
        {
            try
            {
                bool validGenre = Validate(genre);

                if (validGenre)
                {
                    bool existingGenre = dBContext.Genre.Any(genre => genre.Id == id);
                    if (existingGenre)
                    {
                        genre.Id = id;
                        genre.Active = true;
                        //Genre genredb = dBContext.Genre.First(genre => genre.Id == id);
                        //genredb.GenreName = genre.GenreName;

                        dBContext.Update(genre);
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
                //bool existingGenre = dBContext.Genre.Any(genre => genre.Id == id); //Y activo
                Genre genre = dBContext.Genre.FirstOrDefault(x => x.Id == id && x.Active);
                if (genre != null)
                { 
                    genre.Active = false;
                    dBContext.Update(genre);
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
