using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using TiendaDeMujica.Classes.Core;
using TiendaDeMujica.Models;
using TiendaDeMujica.Models.ViewModels;

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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPost]
        public IActionResult ShoppingCartToOrder([FromBody] UserAndAddressModel userAndAddress)
        {
            try
            {
                ShoppingCartCore shoppingCartCore = new ShoppingCartCore(dbContext);

                shoppingCartCore.ShoppingCartToOrder(userAndAddress.IdUser, userAndAddress.IdAddress);
                return Ok("ShoppingCart successfully passed to order!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
