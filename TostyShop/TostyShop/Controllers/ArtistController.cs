using Microsoft.AspNetCore.Authorization;
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
    public class ArtistController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;

        public ArtistController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                ArtistCore artistCore = new ArtistCore(dbContext);
                return Ok(artistCore.Get());
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] int id)
        {
            try
            {
                ArtistCore artistCore = new ArtistCore(dbContext);
                return Ok(artistCore.Get(id));
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult Create([FromBody] Artist artist)
        {
            try
            {
                ArtistCore artistCore = new ArtistCore(dbContext);

                artistCore.Create(artist);
                return Ok("Added new artist successfully!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult Update([FromBody] Artist artist, [FromRoute] int id)
        {
            try
            {
                ArtistCore artistCore = new ArtistCore(dbContext);

                artistCore.Update(artist, id);
                return Ok("Artist successfully edited!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Disable([FromRoute] int id)
        {
            try
            {
                ArtistCore artistCore = new ArtistCore(dbContext);

                artistCore.Disable(id);
                return Ok("Artist successfully disabled!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
