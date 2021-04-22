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
    public class CreditCardController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;

        public CreditCardController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                CreditCardCore creaditCardCore = new CreditCardCore(dbContext);
                return Ok(creaditCardCore.Get());
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
                CreditCardCore creaditCardCore = new CreditCardCore(dbContext);
                return Ok(creaditCardCore.Get(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
