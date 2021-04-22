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
    public class OrderProductController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;

        public OrderProductController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

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
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
