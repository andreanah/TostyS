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
    public class ShoppingCartController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;

        public ShoppingCartController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                ShoppingCartCore shoppingCartCore = new ShoppingCartCore(dbContext);
                return Ok(shoppingCartCore.Get());
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
                ShoppingCartCore shoppingCartCore = new ShoppingCartCore(dbContext);
                return Ok(shoppingCartCore.Get(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] ShoppingCart shoppingCart)
        {
            try
            {
                ShoppingCartCore shoppingCartCore = new ShoppingCartCore(dbContext);

                shoppingCartCore.Create(shoppingCart);
                return Ok("Added new shoppingCart successfully!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] ShoppingCart shoppingCart, [FromRoute] int id)
        {
            try
            {
                ShoppingCartCore shoppingCartCore = new ShoppingCartCore(dbContext);

                shoppingCartCore.Update(shoppingCart, id);
                return Ok("ShoppingCart successfully edited!");
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
                ShoppingCartCore shoppingCartCore = new ShoppingCartCore(dbContext);

                shoppingCartCore.Delete(id);
                return Ok("ShoppingCart successfully deleted!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
