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
    public class OrderProductController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;

        public OrderProductController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
        }

        [Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                OrderProductCore orderProductCore = new OrderProductCore(dbContext);
                return Ok(orderProductCore.Get());
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult Get([FromRoute] int id)
        {
            try
            {
                OrderProductCore orderProductCore = new OrderProductCore(dbContext);
                return Ok(orderProductCore.Get(id));
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpPost]
        public IActionResult Create([FromBody] OrderProduct orderProduct)
        {
            try
            {
                OrderProductCore orderProductCore = new OrderProductCore(dbContext);

                orderProductCore.Create(orderProduct);
                return Ok("Added new orderProduct successfully!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles="Admin")]
        [HttpPut("{id}")]
        public IActionResult Update([FromBody] OrderProduct orderProduct, [FromRoute] int id)
        {
            try
            {
                OrderProductCore orderProductCore = new OrderProductCore(dbContext);

                orderProductCore.Update(orderProduct, id);
                return Ok("OrderProduct successfully edited!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            try
            {
                OrderProductCore orderProductCore = new OrderProductCore(dbContext);

                orderProductCore.Delete(id);
                return Ok("OrderProduct successfully deleted!");
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
