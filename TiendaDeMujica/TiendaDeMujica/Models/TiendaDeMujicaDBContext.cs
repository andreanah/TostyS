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
        public DbSet<Artist> Artist { get; set; }
        public DbSet<ArtistProduct> ArtistProduct { get; set; }
        public DbSet<Photos> Photos { get; set; }

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

        }

       

    }
}
