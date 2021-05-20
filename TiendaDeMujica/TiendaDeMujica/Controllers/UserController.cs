using Microsoft.AspNetCore.Authentication.JwtBearer;
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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;

        public UserController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
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
                logger.Error(e); 
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetRole()
        {
            try
            {
                var currentUser = HttpContext.User;
                string id = "";
                UserCore userCore = new UserCore(dbContext);
                if (currentUser.HasClaim(c => c.Type == "IDUser"))
                {
                    id = currentUser.Claims.FirstOrDefault(c => c.Type == "IDUser").Value;
                }

                return Ok(userCore.GetRole(id));
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

       [Authorize]
        [HttpGet]
        public IActionResult Identity()
        {
            try
            {
                var currentUser = HttpContext.User;

                string id = "";

                if (currentUser.HasClaim(c => c.Type == "IDUser"))
                {
                    id = currentUser.Claims.FirstOrDefault(c => c.Type == "IDUser").Value;
                }

                UserCore userCore = new UserCore(dbContext);
                return Ok(userCore.Get(id));
            }
            catch (Exception e)
            {
                logger.Error(e); 
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
                logger.Error(e); 
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
                logger.Error(e); 
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
