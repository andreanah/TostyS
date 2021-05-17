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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct([FromRoute] int id)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.GetProduct(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet]
        public IActionResult GetProduct()
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.GetProduct());
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetProductFormats([FromRoute] int id)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.GetProductFormats(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
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
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
