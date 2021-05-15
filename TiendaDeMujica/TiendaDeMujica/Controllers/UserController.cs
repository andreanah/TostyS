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
    public class UserController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;

        public UserController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                UserCore userCore = new UserCore(dbContext);
                return Ok(userCore.Get());
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] string id)
        {
            try
            {
                UserCore userCore = new UserCore(dbContext);
                return Ok(userCore.Get(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetShoppingCartUser([FromRoute] string id)
        {
            try
            {
                UserCore userCore = new UserCore(dbContext);
                return Ok(userCore.GetShoppingCartUser(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] User user, [FromRoute] string id)
        {
            try
            {
                UserCore userCore = new UserCore(dbContext);

                userCore.Update(user, id);
                return Ok("User successfully edited!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Disable([FromRoute] string id)
        {
            try
            {
                UserCore userCore = new UserCore(dbContext);

                userCore.Disable(id);
                return Ok("User successfully disabled!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
