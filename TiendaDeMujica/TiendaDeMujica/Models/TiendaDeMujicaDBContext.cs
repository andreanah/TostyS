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
            modelBuilder.Entity<CreditCard>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.CreditCardNumber)
                .HasMaxLength(16)
                .IsRequired()
                .IsUnicode(false);
                entity.Property(e => e.DateBirth)
                .HasColumnType("DateTime")
                .IsRequired();

                entity.HasOne(e => e.Username)
                .WithMany(y => y.CreditCard)
                .HasForeignKey("FK_CreditCardUser");

            });

            modelBuilder.Entity<Address>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Street)
                .HasMaxLength(20)
                .IsRequired()
                .IsUnicode(false);
                entity.Property(e => e.CP)
                .HasMaxLength(10)
                .IsRequired()
                .IsUnicode(false);
                entity.Property(e => e.City)
                .HasMaxLength(20)
                .IsRequired()
                .IsUnicode(false);
                entity.Property(e => e.Country)
                .HasMaxLength(20)
                .IsRequired()
                .IsUnicode(false);
                entity.Property(e => e.Suburb)
                .HasMaxLength(20)
                .IsRequired()
                .IsUnicode(false);
               

                entity.HasOne(e => e.Username)
                .WithOne(y => y.Address)
                .HasForeignKey("FK_AddressUser");

            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Status)
                .HasMaxLength(30)
                .IsRequired()
                .IsUnicode(false);
                entity.Property(e => e.Total)
                .HasColumnType("decimal")
                .IsRequired();
                

                entity.HasOne(e => e.Username)
                .WithOne(y => y.Order)
                .HasForeignKey("FK_OrderUser");

                object p = entity.HasOne(e => e.Order)
                .WithMany(y => y.IdAddress)
                .HasForeignKey("FK_OrderAddress");


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
