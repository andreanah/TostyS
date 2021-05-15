using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TiendaDeMujica.Classes.Core;
using TiendaDeMujica.Models;

namespace TiendaDeMujica.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;

        public AddressController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                AddressCore addressCore = new AddressCore(dbContext);
                return Ok(addressCore.Get());
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] int id)
        {
            try
            {
                AddressCore addressCore = new AddressCore(dbContext);
                return Ok(addressCore.Get(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Address address)
        {
            try
            {
                AddressCore addressCore = new AddressCore(dbContext);

                addressCore.Create(address);
                return Ok("Added new address successfully!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] Address address, [FromRoute] int id)
        {
            try
            {
                AddressCore addressCore = new AddressCore(dbContext);

                addressCore.Update(address, id);
                return Ok("Address successfully edited!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                AddressCore addressCore= new AddressCore(dbContext);

                addressCore.Delete(id);
                return Ok("Address successfully deleted!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
