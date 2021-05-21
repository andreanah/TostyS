using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

namespace TiendaDeMujica.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AddressController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;
        public AddressController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
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
                logger.Error(e);
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetAllOfUser([FromRoute] string id)
        {
            try
            {
                AddressCore addressCore = new AddressCore(dbContext);
                return Ok(addressCore.GetAllOfUser(id));
            }
            catch (Exception e)
            {
                logger.Error(e);
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
                logger.Error(e); 
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Disable([FromRoute] int id)
        {
            try
            {
                AddressCore addressCore= new AddressCore(dbContext);

                addressCore.Disable(id);
                return Ok("Address successfully deleted!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
