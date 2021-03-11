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
            modelBuilder.Entity<Artist>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.StageName).HasMaxLength(50)
                .IsUnicode(false)
                .IsRequired();

                entity.Property(e => e.RealName).HasMaxLength(50)
                .IsUnicode(false)
                .IsRequired();

                entity.Property(e => e.Description).HasMaxLength(50)
                .IsUnicode(false)
                .IsRequired();

                entity.Property(e => e.Active).HasColumnType("bit")
                .IsRequired();
            });

            modelBuilder.Entity<ArtistProduct>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.IdArtist).IsRequired();

                entity.Property(e => e.IdProduct).IsRequired();

                entity.HasOne(e => e.Artist)
                .WithMany(y => y.ArtistProduct)
                .HasForeignKey("FK_ArtistProductArtist");

                entity.HasOne(e => e.Product)
               .WithMany(y => y.ArtistProduct)
               .HasForeignKey("FK_ArtistProductProduct");
            });

            modelBuilder.Entity<Photos>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.IdProduct).IsRequired();

                entity.Property(e => e.Image).IsRequired();

                entity.HasOne(e => e.Product)
               .WithMany(y => y.Photos)
               .HasForeignKey("FK_PhotosProduct");
            });

            //});

            modelBuilder.Entity<Genre>(entity =>
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


            });


        }

       

    }
}
