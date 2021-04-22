using Microsoft.AspNetCore.Mvc;
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

        public ArtistProductController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                ArtistProductCore artistProductCore = new ArtistProductCore(dbContext);
                return Ok(artistProductCore.Get());
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
