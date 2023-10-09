-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 18, 2023 at 09:58 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `id` int(11) NOT NULL,
  `billingAddress` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `shippingAddress` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `zipcode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `billingAddress`, `city`, `country`, `shippingAddress`, `state`, `zipcode`) VALUES
(1, '1F, Parbangla, Maheshtala, Kolkata - 700140.', 'Kolkata', 'India', 'Flat-2, West Jagtala, Maheshtala, Kolkata - 700141.', 'West Bengal', '700140');

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `city`, `email`, `gender`, `name`, `password`, `phone`) VALUES
(1, 'Kolkata', 'admin1@gmail.com', 'Female', 'Admin One', 'de5090839402b1ddabc6c6246ea0ac6d2cdcceb296c1dac9eb5e604972bfa1ce', '8777497607'),
(2, 'Kolkata', 'admin2@gmail.com', 'Male', 'Admin Two', '373b16d57fb173759f6ff98e7dc87d42d4d2959147f5d935606c95fbd4bf9648', '9830458769');

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `description`, `name`, `status`) VALUES
(1, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'No Nasties', b'1'),
(2, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Satva', b'1'),
(3, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Padook', b'0'),
(4, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Anokhi', b'1'),
(5, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Doodleage', b'1'),
(6, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'B-Lavel', b'1'),
(7, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Upasana', b'0'),
(8, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Liva', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

CREATE TABLE `carts` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `customerId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `description`, `name`, `status`) VALUES
(1, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Men', b'1'),
(2, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Women', b'1'),
(3, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Kids', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `city`, `email`, `gender`, `name`, `password`, `phone`, `status`) VALUES
(1, 'Kolkata', 'customer1@gmail.com', 'Male', 'Customer One', '5f304347f3488cd1071d3ad0a0e052b629f69e914df55999c2c373163df00916', '8777492507', b'0'),
(2, 'Kolkata', 'customer2@gmail.com', 'Female', 'Customer Two', 'e635293c508dffc3dcb55785616e7baa8ace2ba7e236ba439673aff50fc96f0d', '9836650886', b'1'),
(3, 'Kolkata', 'customer3@gmail.com', 'Male', 'Customer Three', '09bcd52067e7d750ceca030ea1f0473da2491241125d275beb121e0ec918ff85', '9830234577', b'1');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetails`
--

CREATE TABLE `orderdetails` (
  `id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `orderId` int(11) DEFAULT NULL,
  `productId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orderdetails`
--

INSERT INTO `orderdetails` (`id`, `quantity`, `orderId`, `productId`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `orderDate` datetime DEFAULT NULL,
  `addressId` int(11) DEFAULT NULL,
  `customerId` int(11) DEFAULT NULL,
  `paymentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderDate`, `addressId`, `customerId`, `paymentId`) VALUES
(1, '2023-08-18 13:03:52', 1, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `amount` double DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `customerId` int(11) NOT NULL,
  `orderId` varchar(255) DEFAULT NULL,
  `paymentId` varchar(255) DEFAULT NULL,
  `transactionTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `amount`, `currency`, `customerId`, `orderId`, `paymentId`, `transactionTime`) VALUES
(1, 5400, 'INR', 2, 'order_MRRyVL0UEmCDi8', 'pay_MRRymSd8W6oAI2', '2023-08-18 13:03:52');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `price` int(11) NOT NULL,
  `brandId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `sellerId` int(11) DEFAULT NULL,
  `subcategoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `description`, `name`, `photo`, `price`, `brandId`, `categoryId`, `sellerId`, `subcategoryId`) VALUES
(1, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text', 'Women Multicolor Floral Printed Blazer', 'bc7c4dae19714cf78adcdafef40d5169.jpg', 2200, 6, 2, 1, 5),
(2, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.', 'Men Slim Fit Round Neck Black & Grey T-Shirt', 'b9f5e43c0bf14beda827d18603abb24b.jpg', 1500, 1, 1, 1, 2),
(3, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.', 'Women Embroidery Green Kurti', '99fa1b928c034812ae67a41d404678f7.jpg', 1400, 4, 2, 1, 4),
(4, 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text.', 'Men Regular Fit Printed Sky Colour Button Down Collar Casual Shirt', '185323ca872f47a89b766b99f6d26bdc.jpg', 1600, 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `status` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sellers`
--

INSERT INTO `sellers` (`id`, `city`, `email`, `gender`, `name`, `password`, `phone`, `status`) VALUES
(1, 'Kolkata', 'seller1@gmail.com', 'Male', 'Seller One', '0da491caf61359ca5e4be08de4d17b7f0ef3c94587041a39ecf845da949b4bd8', '9830957666', b'1'),
(2, 'Mumbai', 'seller2@gmail.com', 'Female', 'Seller Two', '098d2c83a82e72a34092489ba64ffa29af31ad02e478a59437dda8f4d59f95b0', '9830467789', b'0');

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` int(11) NOT NULL,
  `slideImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `slideImage`) VALUES
(1, '11727c1a9ac849e19a403fd0313cdca9.jpg'),
(2, 'e3de4710397b474aa1df056aa6c2de72.jpg'),
(3, 'b000589fdd804dc78d45c9b4c1b54197.jpg'),
(5, '9ed5aed042cf425dbcd1d084a6085dae.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `status` bit(1) NOT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `description`, `name`, `status`, `categoryId`) VALUES
(1, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'Shirts', b'1', 1),
(2, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.', 'T-Shirts', b'1', 1),
(3, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout', 'Suits & Blazers', b'0', 1),
(4, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout', 'Kurtis', b'1', 2),
(5, 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout', 'Women Blazers', b'1', 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKkmmj5xhd9wwovmii271x88uj5` (`customerId`),
  ADD KEY `FK65qfuycpluhksgu32cvcbnaxu` (`productId`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKeuygnry1m2rbsg09rgb8lyl3b` (`orderId`),
  ADD KEY `FK2w2qtb1sucxrh05nk4tp03i51` (`productId`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKnw6bmp615nevm688nucae3yan` (`addressId`),
  ADD KEY `FK1bpj2iini89gbon333nm7tvht` (`customerId`),
  ADD KEY `FK3uouvmvg4j5yov27idsmpw468` (`paymentId`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKh5l4pix4d0mc61aibdt3gj898` (`brandId`),
  ADD KEY `FKej2ob3ifydf846t2a2tntna4e` (`categoryId`),
  ADD KEY `FKhqli1rrx2ak44gxrv0hcg50gl` (`sellerId`),
  ADD KEY `FKhvx7cn4u8glga693hpx068j9b` (`subcategoryId`);

--
-- Indexes for table `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKfgskkanw9ylpaw69jhiy4de3u` (`categoryId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `orderdetails`
--
ALTER TABLE `orderdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `FK65qfuycpluhksgu32cvcbnaxu` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FKkmmj5xhd9wwovmii271x88uj5` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`);

--
-- Constraints for table `orderdetails`
--
ALTER TABLE `orderdetails`
  ADD CONSTRAINT `FK2w2qtb1sucxrh05nk4tp03i51` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `FKeuygnry1m2rbsg09rgb8lyl3b` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK1bpj2iini89gbon333nm7tvht` FOREIGN KEY (`customerId`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `FK3uouvmvg4j5yov27idsmpw468` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`),
  ADD CONSTRAINT `FKnw6bmp615nevm688nucae3yan` FOREIGN KEY (`addressId`) REFERENCES `addresses` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FKej2ob3ifydf846t2a2tntna4e` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `FKh5l4pix4d0mc61aibdt3gj898` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`),
  ADD CONSTRAINT `FKhqli1rrx2ak44gxrv0hcg50gl` FOREIGN KEY (`sellerId`) REFERENCES `sellers` (`id`),
  ADD CONSTRAINT `FKhvx7cn4u8glga693hpx068j9b` FOREIGN KEY (`subcategoryId`) REFERENCES `subcategories` (`id`);

--
-- Constraints for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD CONSTRAINT `FKfgskkanw9ylpaw69jhiy4de3u` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
