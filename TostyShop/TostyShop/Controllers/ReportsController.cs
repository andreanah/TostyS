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
    [Authorize (Roles = "Admin")]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ReportsController : ControllerBase
    {
        private TiendaDeMujicaDBContext dbContext;
        Logger logger;
        public ReportsController(TiendaDeMujicaDBContext dbContext)
        {
            this.dbContext = dbContext;
            logger = NLogBuilder.ConfigureNLog("nlog.config").GetCurrentClassLogger();
        }

        [HttpGet]
        public IActionResult GetTopSellingProducts()
        {
            try
            {
                ReportsCore reportsCore = new ReportsCore(dbContext);
                return Ok(reportsCore.GetTopSellingProducts());
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
        [HttpGet]
        public IActionResult GetTopSellingGenres()
        {
            try
            {
                ReportsCore reportsCore = new ReportsCore(dbContext);
                return Ok(reportsCore.GetTopSellingGenres());
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
        [HttpGet]
        public IActionResult GetTopSellingArtists()
        {
            try
            {
                ReportsCore reportsCore = new ReportsCore(dbContext);
                return Ok(reportsCore.GetTopSellingArtists());
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
        [HttpGet]
        public IActionResult GetTopSellingFormats()
        {
            try
            {
                ReportsCore reportsCore = new ReportsCore(dbContext);
                return Ok(reportsCore.GetTopSellingFormats());
            }
            catch (Exception e)
            {
                logger.Error(e);
                return StatusCode((int)HttpStatusCode.InternalServerError, e.Message);
            }
        }
    }
}
