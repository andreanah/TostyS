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
    public class ArtistProductController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;

        public ArtistProductController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                ArtistProductCore artistProductCore = new ArtistProductCore(dbContext);
                return Ok(artistProductCore.Get());
            }
            catch (Exception e)
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
                ArtistProductCore artistProductCore = new ArtistProductCore(dbContext);
                return Ok(artistProductCore.Get(id));
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] ArtistProduct artistProduct)
        {
            try
            {
                ArtistProductCore artistProductCore = new ArtistProductCore(dbContext);

                artistProductCore.Create(artistProduct);
                return Ok("Added new artist-product successfully!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] ArtistProduct artistProduct, [FromRoute] int id)
        {
            try
            {
                ArtistProductCore artistProductCore = new ArtistProductCore(dbContext);

                artistProductCore.Update(artistProduct, id);
                return Ok("Artist-product successfully edited!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                ArtistProductCore artistProductCore = new ArtistProductCore(dbContext);

                artistProductCore.Delete(id);
                return Ok("Artist-product successfully deleted!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
