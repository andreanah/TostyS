/*

Equipo 4

Integrantes:

1662578 Ligia Samara Diaz Hirashi 
1803707 Abraham Reyes Muñiz
1800066 Edgar Alejandro Niño Sanchez
1803204 Andrea Nahomi Rosas Sanchez

QUERY #1

Descripción:

Creación de la base de datos [TiendaDeMujicaDB]

Creación de Tablas [User][Format][Genre][Artist][Product][ProductFormat][ShoppingCart][ArtistProduct][Photos][Orders][Adress][CreditCards][OrderProducts]

Fecha de creación: 2021-02-01

*/
CREATE DATABASE TiendaDeMujicaDB;
GO

USE TiendaDeMujicaDB;
GO

IF OBJECT_ID('dbo.[User]', 'U') IS NOT NULL
	DROP TABLE dbo.[User];
GO
CREATE TABLE [User](
	Username VARCHAR(15) NOT NULL,
	[Name] VARCHAR(50) NOT NULL,
	[Password] VARCHAR(15) NOT NULL,
	Email VARCHAR(30) NOT NULL,
	PhoneNumber VARCHAR(10) NULL,
	Active BIT NOT NULL,

	PRIMARY KEY(Username),
);
GO

IF OBJECT_ID('dbo.[Format]', 'U') IS NOT NULL
	DROP TABLE dbo.[Format];
GO
CREATE TABLE [Format](
	Id INT NOT NULL IDENTITY(1,1),
	TypeCode VARCHAR(3) NOT NULL,
	[Type] VARCHAR(15) NOT NULL,
	
	PRIMARY KEY(Id),
);
GO

IF OBJECT_ID('dbo.Genre', 'U') IS NOT NULL
	DROP TABLE dbo.Genre;
GO
CREATE TABLE Genre(
	Id INT NOT NULL IDENTITY(1,1),
	GenreName VARCHAR(30) NOT NULL,
	
	PRIMARY KEY(Id),
);
GO

IF OBJECT_ID('dbo.Artist', 'U') IS NOT NULL
	DROP TABLE dbo.Artist;
GO
CREATE TABLE Artist (
	Id INT NOT NULL IDENTITY(1,1),
	StageName VARCHAR(50) NOT NULL,
	RealName VARCHAR(50) NOT NULL,
	[Description] VARCHAR(50) NOT NULL,
	Active BIT NOT NULL,

	PRIMARY KEY(Id),
);
GO

IF OBJECT_ID('dbo.Product', 'U') IS NOT NULL
	DROP TABLE dbo.Product;
GO
CREATE TABLE Product(
	Id INT NOT NULL IDENTITY(1,1),
	[Name] VARCHAR(50) NOT NULL,
	Price DECIMAL NOT NULL,
	[Description] VARCHAR(MAX) NULL,
	Active BIT NOT NULL,

	IdGenre INT NOT NULL,

	CONSTRAINT FK_ProductGenre
	FOREIGN KEY (IdGenre) REFERENCES Genre(Id),

	PRIMARY KEY(Id),
);
GO

IF OBJECT_ID('dbo.ProductFormat', 'U') IS NOT NULL
	DROP TABLE dbo.ProductFormat;
GO
CREATE TABLE ProductFormat(
	Id INT NOT NULL IDENTITY(1,1),

	IdProduct INT NOT NULL,
	IdFormat INT NOT NULL,

	CONSTRAINT FK_ProductFormatProduct
	FOREIGN KEY(IdProduct) REFERENCES Product,

	CONSTRAINT FK_ProductFormatFormat
	FOREIGN KEY(IdFormat) REFERENCES [Format],

	PRIMARY KEY(Id),
);
GO

IF OBJECT_ID('dbo.ShoppingCart', 'U') IS NOT NULL
	DROP TABLE dbo.ShoppingCart;
GO
CREATE TABLE ShoppingCart(
	Id INT NOT NULL IDENTITY(1,1),

	IdProduct INT NOT NULL,
	Username VARCHAR(15) NOT NULL,

	CONSTRAINT FK_ShoppingCartProduct
	FOREIGN KEY (IdProduct) REFERENCES Product(Id),

	CONSTRAINT FK_ShoppingCartUser
	FOREIGN KEY (Username) REFERENCES [User](Username),

	PRIMARY KEY(Id),
);
GO

IF OBJECT_ID('dbo.ArtistProduct', 'U') IS NOT NULL
	DROP TABLE dbo.ArtistProduct;
GO
CREATE TABLE ArtistProduct (
	Id INT NOT NULL IDENTITY(1,1),

	IdArtist INT NOT NULL,
	IdProduct INT NOT NULL,
	
	CONSTRAINT FK_ArtistProductArtist
	FOREIGN KEY(IdArtist) REFERENCES Artist(Id),

	CONSTRAINT FK_ArtistProductProduct
	FOREIGN KEY(IdProduct) REFERENCES Product(Id),

	PRIMARY KEY(Id)
);
GO

IF OBJECT_ID('dbo.Photos', 'U') IS NOT NULL
	DROP TABLE dbo.Photos;
GO
CREATE TABLE Photos(
	Id INT NOT NULL IDENTITY(1,1),
	[Image] VARBINARY(MAX) NOT NULL,

	IdProduct INT NOT NULL,

	CONSTRAINT FK_PhotosProduct
	FOREIGN KEY(IdProduct) REFERENCES Product(Id),

	PRIMARY KEY(Id),
);
GO

IF OBJECT_ID('dbo.[Address]', 'U') IS NOT NULL
	DROP TABLE dbo.[Address];
GO
CREATE TABLE [Address](
	Id INT NOT NULL,
	Street VARCHAR(20) NOT NULL,
	CP VARCHAR(10) NOT NULL,
	City VARCHAR(20) NOT NULL,
	Country VARCHAR(20) NOT NULL,
	Suburb VARCHAR(20) NOT NULL,
	
	Username VARCHAR(15) NOT NULL,

	CONSTRAINT FK_AddressUser
	FOREIGN KEY (Username) REFERENCES [User](Username),
	
	PRIMARY KEY (Id),
);
GO

IF OBJECT_ID('dbo.[Order]', 'U') IS NOT NULL
	DROP TABLE dbo.[Order];
GO
CREATE TABLE [Order](
	Id INT NOT NULL,
	Total DECIMAL NOT NULL,
	[Status] VARCHAR(30)NOT NULL,
	
	IdAddress INT NOT NULL,
	Username VARCHAR(15) NOT NULL,
	
	CONSTRAINT FK_OrderUser
	FOREIGN KEY (Username) REFERENCES [User](Username),
	
	CONSTRAINT FK_OrderAddress
	FOREIGN KEY (IdAddress) REFERENCES [Address](Id),
	
	PRIMARY KEY (Id),
); 
GO

IF OBJECT_ID('dbo.OrderProduct', 'U') IS NOT NULL
	DROP TABLE dbo.OrderProduct;
GO
CREATE TABLE OrderProduct(
	Id INT NOT NULL,
	
	IdProduct INT NOT NULL,
	IdOrder INT NOT NULL,
	
	CONSTRAINT FK_OrderProductProduct
	FOREIGN KEY (IdProduct) REFERENCES Product(Id),
	
	CONSTRAINT FK_OrderProductOrder
	FOREIGN KEY (IdOrder) REFERENCES [Order](Id),
	
	PRIMARY KEY (Id),
); 
GO

IF OBJECT_ID('dbo.CreditCard', 'U') IS NOT NULL
	DROP TABLE dbo.CreditCard;
GO
CREATE TABLE CreditCard(
	Id INT NOT NULL,
	DateBirth DATE NOT NULL,
	CreditCardNumber VARCHAR(16) NOT NULL,

	Username VARCHAR(15) NOT NULL,

	CONSTRAINT FK_CreditCardUser
	FOREIGN KEY (Username) REFERENCES [User](Username),

	PRIMARY KEY (Id)
); 
GO