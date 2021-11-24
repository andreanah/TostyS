/*

Equipo 4

Integrantes:

1662578 Ligia Samara Diaz Hirashi 
1803707 Abraham Reyes Muñiz
1800066 Edgar Alejandro Niño Sanchez
1803204 Andrea Nahomi Rosas Sanchez

QUERY #3

Descripción:

- Se elimino la tabla [Photos] de la base de datos.

- Se agrego la columna Photos a la tabla [Product].

- Se agrego el Rol Admin

- Se creo un Admin default

- Se agrego active en address

- Se agrego una relación de ShoppingCart a Format

- Se agrego una relación de OrdeProduct a Format

- Se agrego estado a Address

Fecha de actualización: 2021-05-20
*/

USE TostyShop;
GO

ALTER TABLE Photos
DROP CONSTRAINT FK_PhotosProduct;   
GO

ALTER TABLE ShoppingCart
ADD IdFormat INT NOT NULL

ALTER TABLE ShoppingCart
ADD CONSTRAINT FK_ShoppingCartFormat
	FOREIGN KEY (IdFormat) REFERENCES [Format](Id);   
GO

ALTER TABLE OrderProduct
ADD IdFormat INT NOT NULL

ALTER TABLE OrderProduct
ADD CONSTRAINT FK_OrderProductFormat
	FOREIGN KEY (IdFormat) REFERENCES [Format](Id);   
GO

DROP TABLE Photos

ALTER TABLE Product
ADD URLImage VARCHAR(MAX) NOT NULL DEFAULT('')

ALTER TABLE Address
ADD State VARCHAR(20) NOT NULL DEFAULT('')

ALTER TABLE [Address]
ADD Active BIT NOT NULL DEFAULT(1)

INSERT INTO [dbo].[AspNetRoles]([Id],[Name],[NormalizedName],[ConcurrencyStamp])
VALUES(N'743d57e6-4d3b-4744-ae66-c35194f3da65',N'Admin',N'ADMIN',
N'44fb1774-1992-4f36-9fbe-5853aca3becc')
GO

INSERT [dbo].[AspNetUsers] ([Id], [AccessFailedCount], [ConcurrencyStamp], 
[Email], [EmailConfirmed], [LockoutEnabled], [LockoutEnd], [NormalizedEmail], 
[NormalizedUserName], [PasswordHash], [PhoneNumber], [PhoneNumberConfirmed], 
[SecurityStamp], [TwoFactorEnabled], [UserName], [Name], [Active]) VALUES 
(N'0633e088-30a6-444f-9603-70d7c26748ef', 0, 
N'16892ed8-e827-4014-a2b9-a2328dd82976', N'admin@hotmail.com', 0, 1, NULL, 
N'ADMIN@HOTMAIL.COM', N'ADMIN1', 
N'AQAAAAEAACcQAAAAEAt39M+M+2p0rP/uVzoeplyCD/qq/QbBQQnDB5Hp+Knk1FQUFVJip1z+0RrVqCXmBQ==', 
N'1111111111', 0, N'RNJIKHKHAFWCYLKWAHGV27FVKYMHL3LQ', 0, N'admin1', N'admin1',1)
GO

INSERT INTO [dbo].[AspNetUserRoles]([UserId],[RoleId])
     VALUES(N'0633e088-30a6-444f-9603-70d7c26748ef', N'743d57e6-4d3b-4744-ae66-c35194f3da65')
GO
