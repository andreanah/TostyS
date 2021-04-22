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
    public class ProductController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;

        public ProductController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.Get());
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
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.Get(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] Product product)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);

                productCore.Create(product);
                return Ok("Added new product successfully!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] Product product, [FromRoute] int id)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);

                productCore.Update(product, id);
                return Ok("Product successfully edited!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Disable([FromRoute] int id)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);

                productCore.Disable(id);
                return Ok("Product successfully disabled!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
