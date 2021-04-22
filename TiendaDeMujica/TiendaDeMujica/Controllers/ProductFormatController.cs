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
    [Route("api/[controller]")]
    [ApiController]
    public class ProductFormatController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;

        public ProductFormatController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                ProductFormatCore productFormatCore = new ProductFormatCore(dbContext);
                return Ok(productFormatCore.Get());
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
                ProductFormatCore productFormatCore = new ProductFormatCore(dbContext);
                return Ok(productFormatCore.Get(id));
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPost]
        public IActionResult Create([FromBody] ProductFormat productFormat)
        {
            try
            {
                ProductFormatCore productFormatCore = new ProductFormatCore(dbContext);

                productFormatCore.Create(productFormat);
                return Ok("Added new product-format successfully!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromBody] ProductFormat productFormat, [FromRoute] int id)
        {
            try
            {
                ProductFormatCore productFormatCore = new ProductFormatCore(dbContext);

                productFormatCore.Update(productFormat, id);
                return Ok("Product-format successfully edited!");
            }
            catch (Exception e)
            {
                return StatusCode((int)HttpStatusCode.InternalServerError, e);
            }
        }
    }
}
