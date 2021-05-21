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
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CreditCardController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;

        public CreditCardController(TiendaDeMujicaDBContext dbContext)
        {
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                CreditCardCore creaditCardCore = new CreditCardCore(dbContext);
                return Ok(creaditCardCore.Get());
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
                CreditCardCore creaditCardCore = new CreditCardCore(dbContext);
                return Ok(creaditCardCore.Get(id));
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
                CreditCardCore crediCardCore = new CreditCardCore(dbContext);
                return Ok(crediCardCore.GetAllOfUser(id));
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreditCard creditCard)
        {
            try
            {
                CreditCardCore creaditCardCore = new CreditCardCore(dbContext);

                creaditCardCore.Create(creditCard);
                return Ok("Added new credit card successfully!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] CreditCard creditCard, [FromRoute] int id)
        {
            try
            {
                CreditCardCore creaditCardCore = new CreditCardCore(dbContext);

                creaditCardCore.Update(creditCard, id);
                return Ok("Credit card successfully edited!");
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
                CreditCardCore creaditCardCore = new CreditCardCore(dbContext);

                creaditCardCore.Delete(id);
                return Ok("Credit card successfully deleted!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
