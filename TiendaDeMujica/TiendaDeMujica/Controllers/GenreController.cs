using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TiendaDeMujica.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;

        public GenreController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        // GET: api/genre/get
        [HttpGet]
        public IEnumerable<Genre> GetAll()
        {
            List<Genre> genres = dbContext.Genre.ToList();

            //LINQ
            //List<Genre> genres = dbContext.Genre.Where(Genre => Genre.Active == true).ToList();

            return genres;
        }

        // GET api/<GenreController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }
/*
        // POST api/<GenreController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<GenreController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GenreController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
*/
    }
}
