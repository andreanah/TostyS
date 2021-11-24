﻿using Microsoft.AspNetCore.Authorization;
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
using TiendaDeMujica.Models.ViewModels;

namespace TiendaDeMujica.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;

        public ProductController(TiendaDeMujicaDBContext dbContext)
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
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.Get());
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
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.Get(id));
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetProductsByGenre([FromRoute] int id)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.GetProductsByGenre(id));
            }
            catch (Exception e)
            {
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpGet("{id}")]
        public IActionResult GetProductArtistsFormats([FromRoute] int id)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.GetProductArtistsFormats(id));
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
        [HttpGet]
        public IActionResult GetWithGenre()
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);
                return Ok(productCore.GetWithGenre());
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize]
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public IActionResult CreateWithArtistFormat([FromBody] CreateWithArtistFormatModel product)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);

                productCore.CreateWithArtistFormat(product);
                return Ok("Added new product successfully!");
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public IActionResult UpdateWithArtistFormat([FromBody] CreateWithArtistFormatModel product, [FromRoute] int id)
        {
            try
            {
                ProductCore productCore = new ProductCore(dbContext);

                productCore.UpdateWithArtistFormat(product, id);
                return Ok("Product successfully edited!");
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }

        [Authorize(Roles = "Admin")]
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
                logger.Error(e); 
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
