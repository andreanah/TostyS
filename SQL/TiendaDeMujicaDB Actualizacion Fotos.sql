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

Fecha de actualización: 2021-05-17
*/

USE [TiendaDeMujicaDB]
GO

ALTER TABLE Photos
DROP CONSTRAINT FK_PhotosProduct;   
GO

DROP TABLE Photos

ALTER TABLE Product
ADD URLImage VARCHAR(MAX) NOT NULL DEFAULT('')