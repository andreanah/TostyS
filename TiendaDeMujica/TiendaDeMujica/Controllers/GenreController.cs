using Microsoft.AspNetCore.Mvc;
using NLog;
using NLog.Web;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TiendaDeMujica.Classes.Core;
using TiendaDeMujica.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TiendaDeMujica.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class GenreController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;

        public GenreController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                GenreCore genreCore = new GenreCore(dbContext);
                return Ok(genreCore.Get());
            }
            catch(Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] int id)
        {
            try
            {
                GenreCore genreCore = new GenreCore(dbContext);
                return Ok(genreCore.Get(id));
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Genre genre)
        {
            try
            {
                GenreCore genreCore = new GenreCore(dbContext);
                /*Genre genre = new Genre
                {
                    GenreName = "Acid Jazz"
                };*/

                genreCore.Create(genre);
                return Ok("Added new genre successfully!");
            }
            catch(Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] Genre genre, [FromRoute] int id)
        {
            try
            {
                GenreCore genreCore = new GenreCore(dbContext);

                genreCore.Update(genre, id);
                return Ok("Genre successfully edited!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Disable([FromRoute] int id)
        {
            try
            {
                GenreCore genreCore = new GenreCore(dbContext);

                genreCore.Disable(id);
                return Ok("Genre successfully disabled!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
