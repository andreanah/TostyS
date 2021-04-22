/*

Equipo 4

Integrantes:

1662578 Ligia Samara Diaz Hirashi 
1803707 Abraham Reyes Muñiz
1800066 Edgar Alejandro Niño Sanchez
1803204 Andrea Nahomi Rosas Sanchez

QUERY #2

Descripción:

-Se borro la tabla User por ASPNetUsers

-Se agrego las tablas [AspNetRoleClaims][AspNetRoles][AspNetUserClaims][AspNetUserLogins][AspNetUserRoles][AspNetUsers][AspNetUserTokens]

-Foreign Keys corregidos en [ShoppingCart][Address][Order][CreditCard] se cambio User a ASPNetUsers y el nombre de las variables Username por IdUser

-Se agregaron las columnas Quantity, TotalPrice y UnitPrice

-Se agregaron las columnas Active a Format, Order y Genre

-Se le agrego el constraint default al campo Active de Product y Artist

-Se agrego cantidad a ShoppingCart

Fecha de actualización: 2021-04-21
*/

USE [TiendaDeMujicaDB]
GO

/***************************
TABLAS ASPNET
****************************/

/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 27/03/2021 11:05:23 a. m. ******/

SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.[AspNetRoleClaims]', 'U') IS NOT NULL
	DROP TABLE dbo.[AspNetRoleClaims];
GO
CREATE TABLE [dbo].[AspNetRoleClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 27/03/2021 11:05:23 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.[AspNetRoles]', 'U') IS NOT NULL
	DROP TABLE dbo.[AspNetRoles];
GO
CREATE TABLE [dbo].[AspNetRoles](
	[Id] [nvarchar](450) NOT NULL,
	[Name] [nvarchar](256) NULL,
	[NormalizedName] [nvarchar](256) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetRoles] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 27/03/2021 11:05:23 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.[AspNetUserClaims]', 'U') IS NOT NULL
	DROP TABLE dbo.[AspNetUserClaims];
GO
CREATE TABLE [dbo].[AspNetUserClaims](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UserId] [nvarchar](450) NOT NULL,
	[ClaimType] [nvarchar](max) NULL,
	[ClaimValue] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserClaims] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 27/03/2021 11:05:23 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.[AspNetUserLogins]', 'U') IS NOT NULL
	DROP TABLE dbo.[AspNetUserLogins];
GO
CREATE TABLE [dbo].[AspNetUserLogins](
	[LoginProvider] [nvarchar](128) NOT NULL,
	[ProviderKey] [nvarchar](128) NOT NULL,
	[ProviderDisplayName] [nvarchar](max) NULL,
	[UserId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserLogins] PRIMARY KEY CLUSTERED 
(
	[LoginProvider] ASC,
	[ProviderKey] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 27/03/2021 11:05:23 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.[AspNetUserRoles]', 'U') IS NOT NULL
	DROP TABLE dbo.[AspNetUserRoles];
GO
CREATE TABLE [dbo].[AspNetUserRoles](
	[UserId] [nvarchar](450) NOT NULL,
	[RoleId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_AspNetUserRoles] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 27/03/2021 11:05:23 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

IF OBJECT_ID('dbo.[AspNetUsers]', 'U') IS NOT NULL
	DROP TABLE dbo.[AspNetUsers];
GO
CREATE TABLE [dbo].[AspNetUsers](
	[Id] [nvarchar](450) NOT NULL,
	[UserName] [nvarchar](256) NULL,
	[NormalizedUserName] [nvarchar](256) NULL,
	[Email] [nvarchar](256) NULL,
	[NormalizedEmail] [nvarchar](256) NULL,
	[EmailConfirmed] [bit] NOT NULL,
	[PasswordHash] [nvarchar](max) NULL,
	[SecurityStamp] [nvarchar](max) NULL,
	[ConcurrencyStamp] [nvarchar](max) NULL,
	[PhoneNumber] [nvarchar](max) NULL,
	[PhoneNumberConfirmed] [bit] NOT NULL,
	[TwoFactorEnabled] [bit] NOT NULL,
	[LockoutEnd] [datetimeoffset](7) NULL,
	[LockoutEnabled] [bit] NOT NULL,
	[AccessFailedCount] [int] NOT NULL,
	[Name] VARCHAR(50) NOT NULL,
	[Active] BIT NOT NULL DEFAULT(1),
 CONSTRAINT [PK_AspNetUsers] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 27/03/2021 11:05:23 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
IF OBJECT_ID('dbo.[AspNetUserTokens]', 'U') IS NOT NULL
	DROP TABLE dbo.[AspNetUsers];
GO
CREATE TABLE [dbo].[AspNetUserTokens](
	[UserId] [nvarchar](450) NOT NULL,
	[LoginProvider] [nvarchar](128) NOT NULL,
	[Name] [nvarchar](128) NOT NULL,
	[Value] [nvarchar](max) NULL,
 CONSTRAINT [PK_AspNetUserTokens] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC,
	[LoginProvider] ASC,
	[Name] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[AspNetRoles] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[AspNetUsers] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
GO

/***************************
TABLAS Base de Datos
****************************/

ALTER TABLE ShoppingCart 
DROP CONSTRAINT FK_ShoppingCartUser;   
GO

ALTER TABLE ShoppingCart 
DROP CONSTRAINT FK_ShoppingCartProduct;   
GO

ALTER TABLE [Address] 
DROP CONSTRAINT FK_AddressUser;   
GO

ALTER TABLE CreditCard 
DROP CONSTRAINT FK_CreditCardUser;   
GO

ALTER TABLE [Order] 
DROP CONSTRAINT FK_OrderUser;   
GO

ALTER TABLE [Order] 
DROP CONSTRAINT FK_OrderAddress;   
GO

ALTER TABLE OrderProduct
DROP CONSTRAINT FK_OrderProductOrder;   
GO

DROP TABLE [User];

DROP TABLE ShoppingCart;
DROP TABLE [Address];
DROP TABLE CreditCard;
DROP TABLE [Order];

GO

IF OBJECT_ID('dbo.ShoppingCart', 'U') IS NOT NULL
	DROP TABLE dbo.ShoppingCart;
GO
CREATE TABLE ShoppingCart(
	Id INT NOT NULL IDENTITY(1,1),

	IdProduct INT NOT NULL,
	[IdUser] [nvarchar](450) NOT NULL,

	CONSTRAINT FK_ShoppingCartProduct
	FOREIGN KEY (IdProduct) REFERENCES Product(Id),

	CONSTRAINT FK_ShoppingCartUser
	FOREIGN KEY (IdUser) REFERENCES [AspNetUsers](Id),

	PRIMARY KEY(Id),
);
GO

IF OBJECT_ID('dbo.[Address]', 'U') IS NOT NULL
	DROP TABLE dbo.[Address];
GO
CREATE TABLE [Address](
	Id INT NOT NULL IDENTITY(1,1),
	Street VARCHAR(20) NOT NULL,
	CP VARCHAR(10) NOT NULL,
	City VARCHAR(20) NOT NULL,
	Country VARCHAR(20) NOT NULL,
	Suburb VARCHAR(20) NOT NULL,
	
	[IdUser] [nvarchar](450) NOT NULL,

	CONSTRAINT FK_AddressUser
	FOREIGN KEY (IdUser) REFERENCES [AspNetUsers](Id),
	
	PRIMARY KEY (Id),
);
GO

IF OBJECT_ID('dbo.[Order]', 'U') IS NOT NULL
	DROP TABLE dbo.[Order];
GO
CREATE TABLE [Order](
	Id INT NOT NULL IDENTITY(1,1),
	Total DECIMAL(10,2) NOT NULL,
	[Status] VARCHAR(30)NOT NULL,
	Active BIT NOT NULL DEFAULT(1),

	IdAddress INT NOT NULL,
	[IdUser] [nvarchar](450) NOT NULL,
	
	CONSTRAINT FK_OrderUser
	FOREIGN KEY (IdUser) REFERENCES [AspNetUsers](Id),
	
	CONSTRAINT FK_OrderAddress
	FOREIGN KEY (IdAddress) REFERENCES [Address](Id),
	
	PRIMARY KEY (Id),
); 
GO

IF OBJECT_ID('dbo.CreditCard', 'U') IS NOT NULL
	DROP TABLE dbo.CreditCard;
GO
CREATE TABLE CreditCard(
	Id INT NOT NULL IDENTITY(1,1),
	DateBirth DATE NOT NULL,
	CreditCardNumber VARCHAR(16) NOT NULL,

	[IdUser] [nvarchar](450) NOT NULL,

	CONSTRAINT FK_CreditCardUser
	FOREIGN KEY (IdUser) REFERENCES [AspNetUsers](Id),

	PRIMARY KEY (Id)
); 
GO

ALTER TABLE [Format]
ADD Active BIT NOT NULL DEFAULT(1)

ALTER TABLE Genre
ADD Active BIT NOT NULL DEFAULT(1)

ALTER TABLE Artist 
ADD DEFAULT(1) FOR Active;

ALTER TABLE Product 
ADD DEFAULT(1) FOR Active;

ALTER TABLE [OrderProduct]
ADD CONSTRAINT FK_OrderProductOrder
FOREIGN KEY (IdOrder) REFERENCES [Order](Id)
GO

ALTER TABLE [OrderProduct]
ADD Quantity INT NOT NULL

ALTER TABLE [OrderProduct]
ADD UnitPrice DECIMAL(10,2) NOT NULL

ALTER TABLE [OrderProduct]
ADD TotalPrice DECIMAL(10,2) NOT NULL

ALTER TABLE ShoppingCart
ADD Quantity INT NOT NULL
