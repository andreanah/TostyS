using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class TiendaDeMujicaDBContext : DbContext
    {
        //public DbSet<> { get; set; }
        public DbSet<Format> Format { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<ProductFormat> ProductFormat { get; set; }

        public TiendaDeMujicaDBContext()
        { 
        }

        public TiendaDeMujicaDBContext(DbContextOptions<TiendaDeMujicaDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //modelBuilder.Entity<>(entity =>
            //{

            //});

            modelBuilder.Entity<Genre>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.GenreName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsRequired();
            });

            modelBuilder.Entity<Format>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.TypeCode)
                    .HasMaxLength(3)
                    .IsRequired();
                entity.Property(e => e.Type)
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .IsRequired();
            });

            modelBuilder.Entity<ProductFormat>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.IdProduct)
                    .IsRequired();
                entity.Property(e => e.IdFormat)
                    .IsRequired();

                entity.HasOne(e => e.Product)
                    .WithMany(y => y.ProductFormat)
                    .HasForeignKey("FK_ProductFormatProduct");

                entity.HasOne(e => e.Format)
                    .WithMany(y => y.ProductFormat)
                    .HasForeignKey("FK_ProductFormatFormat");
            });
        }
    }
}
