using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TiendaDeMujica.Models;
using TiendaDeMujica.Models.ViewModels;

namespace TiendaDeMujica.Classes.Core
{
    public class ReportsCore
    {
        TiendaDeMujicaDBContext dBContext;
        public ReportsCore(TiendaDeMujicaDBContext dBContext)
        {
            this.dBContext = dBContext;
        }

        public List<TopSellingProductModel> GetTopSellingProducts()
        {
            try
            {
                var query = (from p in dBContext.Product
                        join op in dBContext.OrderProduct on p.Id equals op.IdProduct
                        select new
                        {
                            Product = p,
                            OrderProduct = op,
                        }).ToList();

                List<TopSellingProductModel> topSellingProductModel = query.GroupBy(x => (x.Product.Id, x.Product.Name))
                    .Select(x => new TopSellingProductModel
                    {
                        IdProduct = x.Key.Id,
                        ProductName = x.Key.Name,
                        TotalPrice = x.Sum(x=>x.OrderProduct.TotalPrice),
                        Quantity = x.Sum(x=>x.OrderProduct.Quantity),
                    }).OrderByDescending(x=>x.TotalPrice).ToList();

                return topSellingProductModel;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<TopSellingGenreModel> GetTopSellingGenres()
        {
            try
            {
                var query = (from g in dBContext.Genre
                             join p in dBContext.Product on g.Id equals p.IdGenre
                             join op in dBContext.OrderProduct on p.Id equals op.IdProduct
                             select new
                             {
                                 Product = p,
                                 OrderProduct = op,
                                 Genre = g,
                             }).ToList();

                List<TopSellingGenreModel> topSellingGenreModel = query.GroupBy(x => (x.Genre.Id, x.Genre.GenreName))
                    .Select(x => new TopSellingGenreModel
                    {
                        IdGenre = x.Key.Id,
                        GenreName = x.Key.GenreName,
                        TotalPrice = x.Sum(x => x.OrderProduct.TotalPrice),
                        Quantity = x.Sum(x => x.OrderProduct.Quantity),
                    }).OrderByDescending(x => x.TotalPrice).ToList();

                return topSellingGenreModel;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<TopSellingArtistModel> GetTopSellingArtists()
        {
            try
            {
                var query = (from p in dBContext.Product
                             join ap in dBContext.ArtistProduct on p.Id equals ap.IdProduct
                             join a in dBContext.Artist on ap.IdArtist equals a.Id
                             join op in dBContext.OrderProduct on p.Id equals op.IdProduct
                             select new
                             {
                                 Product = p,
                                 OrderProduct = op,
                                 Artist = a,
                             }).ToList();

                List<TopSellingArtistModel> topSellingArtists = query.GroupBy(x => (x.Artist.Id, x.Artist.StageName))
                    .Select(x => new TopSellingArtistModel
                    {
                        IdArtist = x.Key.Id,
                        ArtistName = x.Key.StageName,
                        TotalPrice = x.Sum(x => x.OrderProduct.TotalPrice),
                        Quantity = x.Sum(x => x.OrderProduct.Quantity),
                    }).OrderByDescending(x => x.TotalPrice).ToList();

                return topSellingArtists;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
        public List<TopSellingFormatModel> GetTopSellingFormats()
        {
            try
            {
                var query = (from p in dBContext.Product
                             join pf in dBContext.ProductFormat on p.Id equals pf.IdProduct 
                             join f in dBContext.Format on pf.IdFormat equals f.Id
                             join op in dBContext.OrderProduct on new { IdProduct = p.Id, IdFormat = f.Id } equals new { IdProduct = op.IdProduct, IdFormat = op.IdFormat }
                             select new
                             {
                                 Product = p,
                                 OrderProduct = op,
                                 Format = f,
                                 ProductFormat = pf
                             }).ToList();

                List<TopSellingFormatModel> topSellingFormats = query.GroupBy(x => (x.Format.Id, x.Format.Type))
                    .Select(x => new TopSellingFormatModel
                    {
                        IdFormat = x.Key.Id,
                        FormatName = x.Key.Type,
                        TotalPrice = x.Sum(x => x.OrderProduct.TotalPrice),
                        Quantity = x.Sum(x => x.OrderProduct.Quantity),
                    }).OrderByDescending(x => x.TotalPrice).ToList();

                return topSellingFormats;
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
