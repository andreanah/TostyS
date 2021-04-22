using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TiendaDeMujica.Models
{
    public class TiendaDeMujicaDBContext : IdentityDbContext<User>
    {
        //public DbSet<> { get; set; }
        public DbSet<Address> Address { get; set; }
        public DbSet<Artist> Artist { get; set; }
        public DbSet<ArtistProduct> ArtistProduct { get; set; }
        public DbSet<CreditCard> CreditCard { get; set; }
        public DbSet<Format> Format { get; set; }
        public DbSet<Genre> Genre { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<OrderProduct> OrderProduct { get; set; }
        public DbSet<Photos> Photos { get; set; }
        public DbSet<Product> Product { get; set; }
        public DbSet<ProductFormat> ProductFormat { get; set; }
        public DbSet<ShoppingCart> ShoppingCart { get; set; }
        public DbSet<User> User { get; set; }

        public TiendaDeMujicaDBContext()
        {
        }

        public TiendaDeMujicaDBContext(DbContextOptions<TiendaDeMujicaDBContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
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

                entity.Property(e => e.IdUser)
                    .HasMaxLength(450)
                    .IsRequired()
                    .HasColumnType("nvchar")
                    .IsUnicode(false);

                entity.HasOne(e => e.User)
                .WithMany(y => y.Address)
                .HasForeignKey(p => p.IdUser)
                .HasConstraintName("FK_AddressUser");

            });
            modelBuilder.Entity<Artist>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.StageName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsRequired();
                entity.Property(e => e.RealName)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsRequired();
                entity.Property(e => e.Description)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsRequired();
                entity.Property(e => e.Active)
                    .HasColumnType("bit")
                    .IsRequired()
                    .HasDefaultValue(1);
            });
            modelBuilder.Entity<ArtistProduct>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.IdArtist)
                    .IsRequired();

                entity.Property(e => e.IdProduct)
                    .IsRequired();

                entity.HasOne(e => e.Artist)
                    .WithMany(y => y.ArtistProduct)
                    .HasForeignKey(p => p.IdArtist)
                    .HasConstraintName("FK_ArtistProductArtist");

                entity.HasOne(e => e.Product)
                    .WithMany(y => y.ArtistProduct)
                    .HasForeignKey(p => p.IdProduct)
                    .HasConstraintName("FK_ArtistProductProduct");
            });
            modelBuilder.Entity<CreditCard>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.CreditCardNumber)
                    .HasMaxLength(16)
                    .IsRequired()
                    .IsUnicode(false);
                entity.Property(e => e.DateBirth)
                    .HasColumnType("date")
                    .IsRequired();

                entity.Property(e => e.IdUser)
                    .HasMaxLength(450)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(e => e.User)
                    .WithMany(y => y.CreditCard)
                    .HasForeignKey(p => p.IdUser)
                    .HasConstraintName("FK_CreditCardUser");

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
                entity.Property(e => e.Active)
                    .HasColumnType("bit")
                    .IsRequired()
                    .HasDefaultValue(1);
            });
            modelBuilder.Entity<Genre>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.GenreName)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsRequired();
                entity.Property(e => e.Active)
                    .HasColumnType("bit")
                    .IsRequired()
                    .HasDefaultValue(1);
            });
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Status)
                    .HasMaxLength(30)
                    .IsUnicode(false)
                    .IsRequired();
                entity.Property(e => e.Total)
                    .HasColumnType("decimal")
                    .IsRequired();
                entity.Property(e => e.Active)
                    .HasColumnType("bit")
                    .IsRequired()
                    .HasDefaultValue(1);

                entity.Property(e => e.IdAddress)
                    .IsRequired();
                entity.Property(e => e.IdUser)
                    .HasMaxLength(450)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(e => e.User)
                .WithMany(y => y.Order)
                .HasForeignKey(p => p.IdUser)
                .HasConstraintName("FK_OrderUser");

                entity.HasOne(e => e.Address)
                .WithMany(y => y.Order)
                .HasForeignKey(p => p.IdAddress)
                .HasConstraintName("FK_OrderAddress");
            });
            modelBuilder.Entity<OrderProduct>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Quantity)
                    .IsRequired();
                entity.Property(e => e.UnitPrice)
                    .HasColumnType("decimal")
                    .IsRequired();
                entity.Property(e => e.TotalPrice)
                    .HasColumnType("decimal")
                    .IsRequired();

                entity.Property(e => e.IdProduct)
                    .IsRequired();
                entity.Property(e => e.IdOrder)
                    .IsRequired();

                entity.HasOne(e => e.Product)
                .WithMany(y => y.OrderProduct)
                .HasForeignKey(p => p.IdProduct)
                .HasConstraintName("FK_OrderProductProduct");

                entity.HasOne(e => e.Order)
                .WithMany(y => y.OrderProduct)
                .HasForeignKey(p => p.IdOrder)
                .HasConstraintName("FK_OrderProductOrder");
            });
            modelBuilder.Entity<Photos>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Image)
                    .HasColumnType("image")
                    .IsRequired();

                entity.Property(e => e.IdProduct)
                    .IsRequired();

                entity.HasOne(e => e.Product)
                    .WithMany(y => y.Photos)
                    .HasForeignKey(p => p.IdProduct)
                    .HasConstraintName("FK_PhotosProduct");
            });
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsRequired();
                entity.Property(e => e.Price)
                    .HasColumnType("decimal")
                    .IsRequired();
                entity.Property(e => e.Description)
                    .IsRequired(false);
                entity.Property(e => e.Active)
                    .HasColumnType("bit")
                    .IsRequired()
                    .HasDefaultValue(1);

                entity.Property(e => e.IdGenre)
                    .IsRequired();

                entity.HasOne(e => e.Genre)
                    .WithMany(y => y.Product)
                    .HasForeignKey(p => p.IdGenre)
                    .HasConstraintName("FK_ProductGenre");
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
                    .HasForeignKey(p => p.IdProduct)
                    .HasConstraintName("FK_ProductFormatProduct");

                entity.HasOne(e => e.Format)
                    .WithMany(y => y.ProductFormat)
                    .HasForeignKey(p => p.IdFormat)
                    .HasConstraintName("FK_ProductFormatFormat");
            });
            modelBuilder.Entity<ShoppingCart>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Quantity)
                    .IsRequired();
                entity.Property(e => e.IdProduct)
                    .IsRequired();
                entity.Property(e => e.IdUser)
                    .HasMaxLength(450)
                    .IsRequired()
                    .IsUnicode(false);

                entity.HasOne(e => e.Product)
                    .WithMany(y => y.ShoppingCart)
                    .HasForeignKey(p => p.IdProduct)
                    .HasConstraintName("FK_ShoppingCartProduct");

                entity.HasOne(e => e.User)
                    .WithMany(y => y.ShoppingCart)
                    .HasForeignKey(p => p.IdUser)
                    .HasConstraintName("FK_ShoppingCartUser");
            });

            modelBuilder.Entity<User>(user =>
            {
                user.ToTable("AspNetUsers");
                user.HasKey(e => e.Id);

                user.Property(e => e.Name)
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .IsRequired();
                user.Property(e => e.Active)
                    .HasColumnType("bit")
                    .IsRequired()
                    .HasDefaultValue(1);
            });

            modelBuilder.Entity<IdentityRole<string>>(entity =>
            {
                entity.ToTable("AspNetRoles");
                entity.HasKey(e => e.Id);
            });
            modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
            {
                entity.ToTable("AspNetUserLogins");
                entity.HasKey("LoginProvider", "ProviderKey");
            });
            modelBuilder.Entity<IdentityRoleClaim<string>>(entity =>
            {
                entity.ToTable("AspNetRoleClaims");
                entity.HasKey(e => e.Id);
            });
            modelBuilder.Entity<IdentityUserRole<string>>(entity =>
            {
                entity.ToTable("AspNetUserRoles");
                entity.HasKey("UserId", "RoleId");
            });
            modelBuilder.Entity<IdentityUserToken<string>>(entity =>
            {
                entity.ToTable("AspNetUserTokens");
                entity.HasKey("UserId", "LoginProvider");
            });
            modelBuilder.Entity<IdentityUserClaim<string>>(entity =>
            {
                entity.ToTable("AspNetUserClaims");
                entity.HasKey(e => e.Id);
            });

        }
    }
}
