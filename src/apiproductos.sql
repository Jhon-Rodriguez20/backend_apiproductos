SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `producto` (
  `idProducto` varchar(50) NOT NULL,
  `nombreProducto` varchar(50) NOT NULL,
  `precio` varchar(50) NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `urlImagen` varchar(150) NOT NULL,
  `idUsuario` varchar(50) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `producto` (`idProducto`, `nombreProducto`, `precio`, `descripcion`, `urlImagen`, `idUsuario`, `fecha`) VALUES
('6fab2409-c6fc-4c8a-a6af-1ad628d81600', 'Express.js', '50000', 'Framework express', '1716744754519-express.jpg', 'f9031e26-7085-4423-a08d-fe2b6af707f8', '2024-05-26'),
('8c8de7e7-3323-4d29-8686-8b1df64f8626', 'React Vite', '5000', 'React moderno', '1716744715344-react+vite.png', 'f9031e26-7085-4423-a08d-fe2b6af707f8', '2024-05-26'),
('c32dc5a7-a609-4f0b-aeed-f1a71ce23115', 'MySQL', '5000', 'Base de datos relacional', '1716744787108-mysql.png', 'f9031e26-7085-4423-a08d-fe2b6af707f8', '2024-05-26');

CREATE TABLE `usuario` (
  `idUsuario` varchar(50) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `celular` varchar(50) NOT NULL,
  `passwordEncp` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `usuario` (`idUsuario`, `nombre`, `celular`, `passwordEncp`) VALUES
('f9031e26-7085-4423-a08d-fe2b6af707f8', 'John Doe', '12345', '$2b$10$w6edKkN83wMnDU1s8ZddnObVL3wveOb7.S8or7V0tk9nQfA2LjTMG');

ALTER TABLE `producto`
  ADD PRIMARY KEY (`idProducto`),
  ADD KEY `producto_ibfk_2` (`idUsuario`);

ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

ALTER TABLE `producto`
  ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;