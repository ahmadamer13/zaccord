-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 24, 2023 at 12:33 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `3d`
--

-- --------------------------------------------------------

--
-- Stand-in structure for view `a`
-- (See below for the actual view)
--
CREATE TABLE `a` (
`id` int(11)
,`img_url` varchar(255)
,`title` varchar(255)
,`description` varchar(1024)
,`rvas` varchar(255)
,`fvas` varchar(255)
,`infill` varchar(255)
,`size` varchar(255)
,`date_added` datetime
);

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `title` varchar(1024) CHARACTER SET utf8mb4 NOT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `categories` varchar(1024) CHARACTER SET utf8mb4 NOT NULL,
  `content_path` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `summary` varchar(512) CHARACTER SET utf8mb4 NOT NULL,
  `img_url` varchar(255) NOT NULL,
  `last_update` datetime NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `author`, `categories`, `content_path`, `summary`, `img_url`, `last_update`, `date`) VALUES
(6, 'Is it worth investing in a 3D printer?', 'Frankli Mark', '3D Print, Technology, 3D Printer', 'Verice_print', 'The technology of 3D printing and the plans and ideas that are implemented with it are huge, but it is not for everyone to buy a 3D printer. \ R \ na most people just buy a printer, a filament and think they can print anything from now on, but when something fails.', 'VERERIE_BOR.JPG', '2022-02-28 19:19:08', '2022-02-18 07:18:17'),
(7, 'Which one is stronger? Resin vs filament', 'Frankli Mark', '3D Print, Technology, Materials, Such Resin, Filament', 'resinvsfila_print', 'The most commonly discussed topics are related to the quality, material cost of printed models and the printing time of each technologies. \ R \ nz may also need to print an object that requires certain special structural properties, such as tensile strength and impact resistance, were printed with a filament. \ r \ n', 'fdmsla1.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(8, 'The 3D print and past', 'Frankli Mark', '3D printing, technologies, history, additive manufacturing, subtracting, formative manufacturing', 'concept', '3D printing is an additive technology used to manufacture parts. The "additive \" is that there is no block or mold to produce physical objects, but simply stacks layers of materials on each other. Typically, it has fast, low setup costs and capable of creating more complex geometries than \ "conventional \" technologies, with an increasingly expanding list of materials. It is widely used in the mechanical industry, especially for prototypes and easy', 'additiv.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(9, 'What exactly is FDM 3D printing?', 'Frankli Mark', '3D Print, FDM, Fiber, FFF', 'fdm_print', 'You can find the basics of Fused Deposition Modeling, also known as FDM 3D printing. Find out why this 3D printing technology is so affordable and why it is a great choice for quick, cheap prototypes. Dive in FDM materials as well as the benefits and disadvantages of the user.', 'fdm_printer.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(10, 'What is SLA 3D printing?', 'Frankli Mark', '3D Print, SLA, Stereolithography', 'sla_print', 'Find out the basics of stereolytography, also known as SLA 3D printing, and find out why this type of 3D printing technology is so popular and cost effective, find out the operation and parameters of SLA printing, and discover the size of this type of 3D printing for your parts, models or projects.', 'sla_print.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(15, 'The role of layer height in 3D printing', 'Frankli Mark', '3D printing, technology, 3D printer, layer height, surface', 'fosterness', 'The layer height of the 3D printing is a simple setting that affects the print speed and the detail of the model you want to print, affecting its durability, trapping and spectacle. \ r \ nmi and why \ r \ na layer height is exactly what it sounds: the exact height of each layer of the 3D printer or hardened plastic. This setting is set through a slicing program and has much more effect on final printing than we would think first. Properly', 'Layer5.jpg', '2022-02-28 19:19:08', '2022-02-18 07:18:17'),
(16, 'Best Pages to Search Low-Poly Models', 'Frankli Mark', '3D Print, Online, Models, Low-Poly', 'slowpoly', 'Before we start the list of the best low-poly 3D model sources, let's see what the low-poly really means. \ R \ na na \ "poly" Poly \ "comes from the word polygon. The polygon is a 2D shape of straight lines and angles. If you place multiple polygons side by side, you can create a recognizable 3D shape. \ R \ n', 'LowPolyrabbit.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(17, 'The 3D printed lithophane', 'Frankli Mark', '3D printing, technologies, lithophane, pictures', 'lithopan', 'Lithophane is a very special artwork from the past. It has a rich history and has developed over many years. \ R \ na has a magical effect due to its unique way. Lithophane is usually compared to a curved or straight rectangle with a thin material with a thin material, which contain plenty of details. These details are revealed only when the light illuminates on the back of the material and shows the image it forms. \ R \ n', 'lithofan1.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(18, 'Is the Plag really biodegradable?', 'Frankli Mark', '3D Print, Biology, Ecology, Plane', 'pla_bomlas', 'The most popular 3D printing material, PLA, is said to be biologically degraded. known as Polytic Acid known as PLO PLOP Armodic plastic and the best utilized 3D printing fiber. The most popular material for FDM 3D printing, PLA is known for its ease', 'Bio1.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(19, 'Best modeling software for beginners', 'Frankli Mark', '3D Print, Modeling, Software', 'Softwrek_ to start', '3D modeling requires a lot of practice, but over time anyone can learn. 3D modeling can result in a scary-steep learning curve, and the start of the developed CAD software commonly used to create digital objects can completely confuse completely beginners. The most famous tools, such as Sketchup or Blender, are confronted with an intimidation toolbar and unknown control schemes that can force anyone's hands to defeat.', 'softborito.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(20, 'PL VS ABS VS PETG: Which one is best?', 'Frankli Mark', '3D Print, Filaments, Pla, Petg, Abs', 'plaabspetg', 'PLA, ABS and PETG are the most popular and easiest filaments. But just because they are easily access', 'pvpvafila.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(21, 'To make 3D printed templates', 'Frankli Mark', '3D printing, technologies, template, painting', 'templates', 'Templates are unique forms of art that are used for everything from warning boards to your favorite T -shirt. Whether it is made industrially or tailored to the body with drags and laser cutters, there is a new method of making template: 3D printing.', 'stencil2.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(22, 'To create 3D printed molds', 'Frankli Mark', '3D printing, molding, serial production, Mold', 'mold', 'These are great for mass production, standardization of plans and expanding the repertoire, what you can do for yourself. First of all, we need to distinguish between two types of object making to illustrate how the printing of 3D molds differs from the usual 3D printing projects. The main difference lies in how we get to the final object.', 'Mold4.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(23, 'Benefits and challenges of 3D printing during prototype production', 'Little Peter', '3D printing, prototype, advantages, disadvantages', 'A_3D_Print_elonyei_es_kihivasai', '3D printing, also known as additive production, has revolutionized prototype production in recent years. It allows you to quickly and cost -effective physical prototypes, allowing businesses to test and develop their plans faster than ever before.', 'proto_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(24, '3D Print in Medicine: From Surgery Aids to Prostheses', 'Little Peter', '3D printing, medicine, industry', '3D_Print_az_Oed', '3D printing has made significant progress in the medical industry in recent years, where there are many applications from surgical aids to prostheses. It offers a number of benefits, including customization, cost -effectiveness and speed, making it an increasingly popular choice for a wide range of medical applications.', 'Medicine_bor.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(25, 'The environmental impact of 3D printing', 'Little Peter', '3D printing, environment, ecology', 'A_3D_PRESS_HALL', '3D printing, also known as additive manufacturing, can revolutionize the way to produce products by offering benefits such as customization, cost -effectiveness and speed.', 'environment_bor.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(26, 'The Future of 3D Print: Forecasts and Opportunities', 'Little Peter', '3D Printing, Technologies, Future, Development', 'A_3D_PRESSTATAS_JOVOE', '3D printing, also known as additive production, has come a long journey since the beginning of the 1980s. You have the opportunity to revolutionize the way to produce products by offering benefits such as customization, cost -effectiveness and speed.', 'jovo_bor.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(27, 'Ethics of 3D Print: Intellectual Property and Accessibility', 'Little Peter', '3D printing, ethics, intellectual property', 'A_3D_Print_etikaya', 'In parallel with the continuous development of 3D printing technology, it is important to consider the ethical aspects of the technology. In this post, we review two key ethical considerations related to 3D printing: intellectual ownership and accessibility.', 'ethika_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(28, '3D Print in the Fashion Industry: From Prototypes to End Products', 'Little Peter', '3D printing, prototype, fashion', '3D_Printed_A_Fashion', '3D printing, also known as additive production, can revolutionize the fashion industry. It offers a number of benefits, including the possibility of personalized and complex samples, the possibility of reducing waste and emissions, and accelerating the manufacturing process.', 'fashion_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(29, '3D Print in the construction industry: From prototype production to 3D printed houses', 'Little Peter', '3D printing, construction, houses', '3D_Print_az_epito', '3D printing, also known as additive production, can revolutionize the construction industry. It has many benefits, including the possibility of producing personalized and complex plans, the possibility of reducing waste and emissions, and the ability to accelerate the construction process.', 'epites_bor.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(30, 'Economics of 3D Print: The cost-benefit analysis', 'Little Peter', '3D printing, economics, cost, benefit', 'A_3D_PRESSAPTASAGANA', '3D printing, also known as additive manufacturing, can revolutionize the way in which products are designed and manufactured. It has many benefits, including the production of customized and complex designs, the possibility of reducing waste and emissions, and the ability to accelerate the manufacturing process.', 'Farmer_bor.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(31, '3D Print in the world of art: From sculptures to functional art', 'Little Peter', '3D Printing, Art, Statue, Painting', '3D_Print_a_muvázet_vilaga', '3D printing has revolutionized the art world in recent years, allowing artists to create complex sculptures and functional objects with unprecedented accuracy and detail.', 'mueset_bor.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(32, '3D Print in the entertainment electronics industry: From prototype to final components', 'Little Peter', '3D printing, electronics, serial production, industry', '3D_Printed_a_correctronic_electronics', 'The consumer electronics industry has always been an engine to introduce and develop new technologies, and 3D printing is no exception. In recent years, 3D printing has become an increasingly valuable tool for consumer electronics companies, from the production of prototypes and testing new products to the production of final components and even complete devices.', 'electronics_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(33, '3D Print in the furniture industry: From prototypes to end products', 'Little Peter', '3D printing, furniture industry, prototype', '3D_Printed_a_butor industry', 'The use of 3D printing technology in the furniture industry in recent years. Initially, 3D printing used primarily to develop prototypes and concepts is now used to manufacture end products for furniture market. This technology offers many benefits for furniture designers and manufacturers, including the opportunity to create complex forms quickly and easy, customer customers, and the possibility of producing products on -demand.', 'Butor_bor.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(34, '3D Print in the Sports Industry: From customized equipment to customized clothing', 'Little Peter', '3D printing, sports industry, customization, individual', '3D_Printed_A_SPORT industry', 'The sports industry has always been at the forefront of using new technologies and techniques to improve performance and enhance the sports experience. In recent years, 3D printing has appeared as a promising technology that can revolutionize the sports industry.', 'Sport_bor.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(35, 'Benefits of 3D printing for small businesses and startups', 'Little Peter', '3D Print, Business, Startup, Benefits', 'A_3D_Print_elonyei_a_kisvalacies_es_a_startupok_szamara', 'In recent years, 3D printing has appeared as a promising technology that can revolutionize many industries. For small businesses and start -ups, 3D printing can have many benefits that can help them success and grow.', 'startup_bor.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(36, '3D Print in the packaging industry: From prototypes to end products', 'Little Peter', '3D printing, packaging industry, sustainability', '3D_Printed_A_PROVAGOLOO', '3D printing in many industries revolutionizes the way in which products are designed and manufactured, and the packaging industry is no exception. 3D printing, from prototype production of new packaging plans to final products, plays an increasingly important role in the packaging industry.', 'package_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17');

-- --------------------------------------------------------

--
-- Table structure for table `colors`
--

CREATE TABLE `colors` (
  `id` int(11) NOT NULL,
  `color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `material` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `images` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `info` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hex_color` varchar(255) NOT NULL,
  `in_stock` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `colors`
--

INSERT INTO `colors` (`id`, `color`, `material`, `images`, `info`, `hex_color`, `in_stock`) VALUES
(1, 'White', 'plain', 'pla_feher.jpg', 'Standard color', 'ffffff', 1),
(2, 'Light gray', 'plain', 'pla_vilagossurke.jpg', 'Well -printable', 'D3D3D3', 1),
(4, 'Ratio', 'plain', 'pla_arany.jpg', 'Well -printable', 'FFD700', 1),
(5, 'Brown', 'plain', 'pla_barna.jpg', 'Well -printable', '964B00', 0),
(6, 'Silver', 'plain', 'pla_ezust.jpg', 'Well -printable', 'C0C0C0', 1),
(7, 'Black', 'plain', 'pla_fekete.jpg', 'Standard color', '000000', 1),
(8, 'Glow', 'plain', 'pla_glow.jpg', 'Phosphorescent', '90EE90', 1),
(9, 'Purple', 'plain', 'pla_lila.jpg', 'Well -printable', '800080', 0),
(10, 'Orange', 'plain', 'pla_narancsarga.jpg', 'Well -printable', 'FFA500', 1),
(11, 'Neon orange', 'plain', 'pla_neonnarancsarga.jpg', 'Lively, bright', 'FF5F1F', 1),
(12, 'Neon yellow', 'plain', 'pla_neonsvarga.jpg', 'Lively, bright', 'FFF01F', 0),
(13, 'Neon green', 'plain', 'pla_neonzold.jpg', 'Lively, bright', '39ff14', 1),
(14, 'Pastel blue', 'plain', 'PLA_PASTELKEK.JPG', 'Matte effect', 'A7C7E7', 0),
(15, 'Pastel pink', 'plain', 'PLA_PASTELROGRO', 'Matte effect', 'F8C8DC', 0),
(16, 'Pastel green', 'plain', 'PLA_PASTELZOLD.JPG', 'Matte effect', 'C1E1C1', 1),
(17, 'Pink', 'plain', 'pla_pink.jpg', 'Well -printable', 'ffc0cb', 0),
(18, 'Red', 'plain', 'pla_piros.jpg', 'Well -printable', 'FF0000', 1),
(19, 'Yellow', 'plain', 'pla_arga.jpg', 'Well -printable', 'FFFF00', 1),
(20, 'Dark blue', 'plain', 'pla_sotetkek.jpg', 'Well -printable', '00008b', 1),
(21, 'Dark gray', 'plain', 'pla_sotetszurke.jpg', 'Well -printable', 'A9a9a9', 1),
(22, 'Dark green', 'plain', 'pla_sotetzold.jpg', 'Well -printable', '013220', 0),
(23, 'Blue', 'plain', 'pla_vilagoskek.jpg', 'Well -printable', '0089ff', 1),
(25, 'Light green', 'plain', 'pla_vilagosold.jpg', 'Well -printable', '90EE90', 1),
(26, 'Transparent', 'petg', 'petg_atlatszo.jpg', 'Glass -like effect', 'ffffff', 1),
(27, 'Transparent blue', 'petg', 'petg_atlatesk.jpg', 'Glass -like effect', 'Add8e6', 1),
(28, 'Transparent red', 'petg', 'petg_atlatsopiros.jpg', 'Glass -like effect', 'FF0000', 0),
(29, 'Transparent yellow', 'petg', 'petg_atlatszosarga.jpg', 'Glass -like effect', 'FFFF00', 1),
(30, 'Transparent green', 'petg', 'petg_atlatszózózsóz.jpg', 'Glass -like effect', '90EE90', 0),
(31, 'Bronze', 'petg', 'petg_bronz.jpg', 'Well -printable', 'CD7F32', 0),
(32, 'Silver', 'petg', 'petg_ezust.jpg', 'Well -printable', 'C0C0C0', 1),
(33, 'White', 'petg', 'petg_feher.jpg', 'Standard color', 'ffffff', 0),
(34, 'Black', 'petg', 'petg_fekete.jpg', 'Standard color', '000000', 1),
(35, 'Neon orange', 'petg', 'Petg_neonnarancsarga.jpg', 'Lively, bright', 'FF5F1F', 1),
(36, 'Neon yellow', 'petg', 'petg_neonsvarga.jpg', 'Lively, bright', 'FFF01F', 1),
(37, 'Red', 'petg', 'petg_piros.jpg', 'Well -printable', 'FF0000', 1),
(38, 'Dark blue', 'petg', 'petg_sotetkek.jpg', 'Well -printable', '00008b', 0),
(39, 'Dark gray', 'petg', 'petg_sotetszurke.jpg', 'Well -printable', 'A9a9a9', 1),
(40, 'Light blue', 'petg', 'petg_vilagoskek.jpg', 'Well -printable', 'Add8e6', 1),
(41, 'White', 'abs', '3djakeabs-Feher-241207-hu.jpg', 'Standard color', 'ffffff', 1),
(42, 'Black', 'abs', '3djake-niceabs-Fekete-241217-hu.jpg', 'Standard color', '000000', 1),
(43, 'Yellow', 'abs', '3djake-niceabs-scarga-241177-hu.jpg', 'Well -printable', 'FFFF00', 1),
(44, 'Silver', 'abs', '3djakeabs-ezuest-241157-hu.jpg', 'Standard color', 'C0C0C0', 0),
(45, 'Dark gray', 'abs', '3djakeabs-soetszuerke-241127-hu.jpg', 'Standard color', 'A9a9a9', 1),
(46, 'Dark blue', 'abs', '3djakeabs-soetkes-241137-hu.jpg', 'Well -printable', '00008b', 1),
(47, 'Bronze', 'abs', '3djakeabs-bronz-241147-hu.jpg', 'Well -printable', 'CD7F32', 1),
(48, 'Green', 'abs', '3djakeabs-zoeld-241187-hu.jpg', 'Well -printable', '00ff00', 1),
(49, 'Orange', 'abs', '3djake-niceabs-Narancarga-241167-hu.jpg', 'Well -printable', 'FFA500', 0),
(50, 'Red', 'abs', '3djake-niceabs-red-241197-hu.jpg', 'Well -printable', 'FF0000', 1),
(51, 'Light gray', 'abs', '3djake-niceabs-vilagossuerke-241117-hu.jpg', 'Well -printable', 'D3D3D3', 1),
(52, 'White', 'TPU (HARD - A95)', '3djake-tpu-a95-Feher-284855-hu.jpg', 'Standard color', 'ffffff', 1),
(53, 'Black', 'TPU (HARD - A95)', '3djake-tpu-a95-Fekete-284865-hu.jpg', 'Standard color', '000000', 1),
(54, 'Transparent', 'TPU (HARD - A95)', '3djake-tpu-a95-atlatszo-284845-hu.jpg', 'Glass -like effect', 'ffffff', 1),
(55, 'Silver', 'TPU (HARD - A95)', '3djake-tpu-a95-ezuest-284875-hu.jpg', 'Standard color', 'C0C0C0', 0),
(56, 'Dark gray', 'TPU (HARD - A95)', '3djake-tpu-a95-soetszuerke-284905-hu.jpg', 'Standard color', 'A9a9a9', 1),
(57, 'Dark blue', 'TPU (HARD - A95)', '3DJAE-TPU-A95-SOETETK-284895-HU.JPG', 'Well -printable', '00008b', 1),
(58, 'Light blue', 'TPU (HARD - A95)', '3djake-tpu-a95-vilagoskek-284915-hu.jpg', 'Well -printable', 'Add8e6', 1),
(59, 'Light green', 'TPU (HARD - A95)', '3djake-tpu-a95-vilagoszoeld-284925-hu.jpg', 'Well -printable', '90EE90', 1),
(60, 'Orange', 'TPU (HARD - A95)', '3djake-tpu-a95-narancsarga-299677-hu.jpg', 'Well -printable', 'FFA500', 0),
(61, 'Red', 'TPU (HARD - A95)', '3djake-tpu-a95-red-284885-hu.jpg', 'Well -printable', 'FF0000', 1),
(62, 'Light gray', 'TPU (HARD - A95)', '3djake-tpu-a95-vilagossuerke-284935-hu.jpg', 'Well -printable', 'D3D3D3', 1),
(63, 'White', 'ASA', '3DJA-ASA-Feher-284775-Hu.jpg', 'Standard color', 'ffffff', 1),
(64, 'Black', 'ASA', '3DJA-ASA-FEKE-280991-HU.JPG', 'Standard color', '000000', 1),
(65, 'Silver', 'ASA', '3DJA-ASA-EZUEST-284785-HU.JPG', 'Well -printable', 'C0C0C0', 0),
(66, 'Dark gray', 'ASA', '3DJA-ASA-Soetszuerke-284815-hu.jpg', 'Well -printable', 'A9a9a9', 1),
(67, 'Dark blue', 'ASA', '3DJA-ASA-SOETETK-284805-HU.JPG', 'Well -printable', '00008b', 1),
(68, 'Light blue', 'ASA', '3djake-ASA-Vilagoskes-281001-hu.jpg', 'Well -printable', 'Add8e6', 1),
(69, 'Light green', 'ASA', '3djake-ASA-Vilagoszoeld-284825-hu.jpg', 'Well -printable', '90EE90', 1),
(70, 'Orange', 'ASA', '3DJA-ASA-Narancarga-299667-Hu.jpg', 'Well -printable', 'FFA500', 0),
(71, 'Red', 'ASA', '3DJA-ASA-Red-284795-Hu.jpg', 'Well -printable', 'FF0000', 1),
(72, 'Light gray', 'ASA', '3djake-tpu-a95-vilagossuerke-284935-hu.jpg', 'Well -printable', 'D3D3D3', 1),
(73, 'Nature', 'Wood', '3djake-Lumberjake-Pla-Natur-301143-Hu.jpg', 'Wooden', 'C4A484', 1),
(74, 'Brown', 'Wood', '3djake-Lumberjake-Pla-Vilagos Brown-301163-Hu.jpg', 'Wooden', 'C4A484', 1),
(75, 'Green', 'Wood', '3djake-Lumberjake-Pla-Zoeld-301153-hu.jpg', 'Wooden', '696012', 0),
(76, 'Black', 'Wood', '3djake-Lumberjake-Pla-Fekete-301113-hu.jpg', 'Wooden', '000000', 1),
(77, 'Dark -brown', 'Wood', '3djake-lumberjake-pla-soet brown-301133-hu.jpg', 'Wooden', '654321', 1),
(78, 'Bronze', 'metal', 'Colorfabb-Bronzefill-175-MM-750-G-181947-Hu.jpg', 'Metallic', 'CD7F32', 0),
(79, 'Steel', 'metal', 'Colorfabb-Steelfill-192603-Hu.jpg', 'Metallic', '71797e', 1),
(80, 'Copper', 'metal', 'Colorfabb-Copperfill-175-MM-1500-G-192720-Hu.jpg', 'Metallic', 'B87333', 1),
(81, 'Granite', 'stone', 'formfutura-stonefiltm-granite-273618-hu.jpg', 'Rocky', '676767', 1),
(82, 'Clay', 'stone', 'Formfutura-Stonefiltm-Pottery-Clay-273628-Hu.jpg', 'Rocky', 'D4C59c', 1),
(83, 'Terracotta', 'stone', 'formfutura-stonefiltm-terracotta-273638-hu.jpg', 'Rocky', 'E2725B', 0),
(84, 'Concrete', 'stone', 'Formfutura-Stonefiltm-Concrete-273608-Hu.jpg', 'Rocky', '808076', 1),
(85, 'Juicy peach \ r \ n', 'magic', '3DJA-MAGICPLA-JUICY-PEACH-412426-HU.JPG', 'Gentle', 'ffcba4', 1),
(86, 'Sunset Sky', 'magic', '3djake-Magicpla-Sunset-Sky-412436-hu.jpg', 'Gentle', 'F2480F', 1),
(87, 'Frozen Gold', 'magic', '3djake-Magicpla-Frozen-Gold-412446-Hu.jpg', 'Gentle', 'B0A399', 1),
(88, 'Metallic Emerald', 'magic', '3djake-Magicpla-Metallic-emerald-412456-hu.jpg', 'Gentle', '50C878', 0),
(89, 'Frozen Lavender', 'magic', '3djake-Magicpla-Frozen-Lavender-412476-Hu.jpg', 'Gentle', '743282', 1),
(90, 'Deep Space', 'magic', '3djake-Magicpla-Deep-Space-412466-Hu.jpg', 'Gentle', '37425b', 1),
(91, 'Signaling yellow', 'resin (resin)', 'Phrozen-Aabs-Like-Resin-Feher-1000-G-377040-Hu.jpg', 'Transparent and cover colors', 'FFFF00', 1),
(92, 'Purple', 'resin (resin)', 'Phrozen-Aabs-Like-Resin-Feher-1000-G-377040-Hu.jpg', 'Transparent and cover colors', '800080', 1),
(93, 'Red', 'resin (resin)', 'Phrozen-Aabs-Like-Resin-Feher-1000-G-377040-Hu.jpg', 'Transparent and cover colors', 'FF0000', 1),
(94, 'Deep black', 'resin (resin)', 'Phrozen-Aabs-Like-Resin-Feher-1000-G-377040-Hu.jpg', 'Transparent and cover colors', '050203', 1),
(95, 'Blue', 'resin (resin)', 'Phrozen-Aabs-Like-Resin-Feher-1000-G-377040-Hu.jpg', 'Transparent and cover colors', '0089ff', 0),
(96, 'Pure green', 'resin (resin)', 'Phrozen-Aabs-Like-Resin-Feher-1000-G-377040-Hu.jpg', 'Transparent and cover colors', '696012', 1),
(97, 'Concrete gray', 'resin (resin)', 'Phrozen-Aabs-Like-Resin-Feher-1000-G-377040-Hu.jpg', 'Transparent and cover colors', '808076', 1),
(98, 'White', 'resin (resin)', 'Phrozen-Aabs-Like-Resin-Feher-1000-G-377040-Hu.jpg', 'Transparent and cover colors', 'ffffff', 1),
(99, 'White', 'TPU (Medium - A85)', '3djake-tpu-a95-Feher-284855-hu.jpg', 'Flexible', 'ffffff', 1),
(100, 'Black', 'TPU (Medium - A85)', '3djake-tpu-a95-Fekete-284865-hu.jpg', 'Flexible', '000000', 1),
(101, 'White', 'TPU (Soft - A70)', '3djake-tpu-a95-Feher-284855-hu.jpg', 'Flexible', 'ffffff', 1),
(102, 'Black', 'TPU (Soft - A70)', '3djake-tpu-a95-Fekete-284865-hu.jpg', 'Flexible', '000000', 1),
(103, 'Black', 'nylon', 'nylon.jpg', 'High melting point, strong', '000000', 1),
(104, 'Black', 'Carbon Fiber', 'carbon_fiber.jpg', 'Strong, light, lasting', '000000', 1);

-- --------------------------------------------------------

--
-- Table structure for table `delivery_data`
--

CREATE TABLE `delivery_data` (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `mobile` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `nl_email` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `order_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `opinion` text NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `fix_products`
--

CREATE TABLE `fix_products` (
  `id` int(11) NOT NULL,
  `url` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `img_showcase` varchar(1024) COLLATE utf8mb4_bin NOT NULL,
  `price` int(11) NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 NOT NULL,
  `category` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(2048) CHARACTER SET utf8mb4 NOT NULL,
  `stl_path` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `priority` int(11) NOT NULL,
  `is_best` tinyint(1) NOT NULL DEFAULT 0,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `fix_products`
--

INSERT INTO `fix_products` (`id`, `url`, `img_url`, `img_showcase`, `price`, `size`, `name`, `category`, `description`, `stl_path`, `priority`, `is_best`, `date_added`) VALUES
(1, 'Item/Product = 1', 'Images/pipetato.jpg', 'pi1.jpg, pi2.jpg, pi3jpg, pizza7jag.png, pizza3.png, pizza_4.png, pizza6.png, pizza_10.png', 990, '40x7x28', 'Pizza paper clip (8pcs)', 'Other', 'Pizza -shaped paper clip for systematization, everyday use. \ R \ n's help can easily clash paper money, cards, sheets of paper and similar objects. \ R \ n can be a choice to bring together everyday things for those who want to uniquely organize things. The package contents of the package 8pcs pizza papers. <br> \ r \ n \ n \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> environmentally friend 28mm </li> \ r \ n </ul> \ r \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> license </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 445805 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/tosh/about \" class = \ "BLD \"> tosh </a>. &#169; <!-Date-> Tosh. All rights reserved.', 'pizza_clip', 100, 0, '2020-05-01 00:00:00'),
(2, 'Item/Product = 2', 'Images/Gyecsi.jpg', 'Gy1.jpg, Gy2.jpg, Gy3.jpg, Csipes.png, Csipes_nagy.png, pinch_nharmonia.png, gymantcsipesz_10.png \ r \ n', 1290, '58x12x25', 'Diamond money clip (6pcs)', 'Other', 'Demanding money clip to bring together everyday objects. It is also resistant to high tension without deformation, easy to handle. The package content is 6pcs of diamond money. <br> \ r \ n \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 25mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 1385206 \" class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/ysoft_be3d/about \" class = \ "BLD \"> ysoft_be3d </a>. &#169; <!-Date-> ysoft_be3d. All rights reserved. \ R \ n', 'diamond', 40, 0, '2020-05-14 00:00:00'),
(4, 'Item/Product = 4', 'images/de3.jpg', 'DE1.JPG, DE2', 1690, '50x65x15', 'Dolphin', 'Telephone holders', 'Easy to use dolphin telephone holder. The product should be used and stable in this position, adjusted and laid. To achieve further stability, we recommend setting X1.3 scaling for specifications. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> packaging </li> \ r \ n <li> 55mm x 65mm x 15mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by/4 <a href = \ "https: //www.hingiverse.com/hing: 1686467 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/goraering/about \" class = \ "BLD \"> Goraering </a>. &#169; <!-Date-> Goraering. All rights reserved. \ R \ n', 'dolphin_arto', 41, 0, '2020-05-14 00:00:00'),
(5, 'Item/Product = 5', 'Images/mat3.jpg', 'mat1.jpg, mat2.jpg, cat_tarto.png, cat_telefontarto1.png, cat_telefontarto2.png, cat_telefontarto4.png, cat_tarto_10.png', 1990, '60x30x68', 'Cat -rack', 'Telephone holders', 'Easy to use cat phone holder. The product should be used and stable in this position, adjusted and laid. To achieve further stability, we recommend setting X1.3 scaling for specifications. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> Packaging </li> \ r \ n <li> 65mm x 30mm x 68mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \" also <a href = \ "https: //www.hingiverse.com/hing: 1012788 \" Class = \ "BLD \"> You can change it </a> \ r \ n at you. \ r \ nabban in case you want to print your own model to use \ r \ n <a href = \ "/print \" Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/tinyeyes/about \" class = \ "bld \"> tinyeyes </a>. &#169; <!-Date-> tinyeyes. All rights reserved.', 'catstand', 51, 1, '2020-05-01 00:00:00'),
(10, 'Item/Product = 10', 'Images/v22.jpg', 'v21.jpg, v23.jpg, v24.jpg, plumllasu_tarto.png, folded_telefontarto2', 2590, '90x64x25', 'Multi -position telephone holder', 'Telephone holders', 'Easy to use multi -position phone holder. Provides stable holding for the phone, and the slider can easily adjust the desired tilt. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> packaging </li> \ r \ n <li> 90mm x 64mm x 25mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by/4 <a href = \ "https: //www.hingiver.com/hing: 2835254 \" Class = \ "BLD \"> You can change </a> \ r \ n at you. \ r \ nabban if you want to print your own model to use \ r \ n <a href = \ "/print \" Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/wabbitGuy/about \" class = \ "BLD \"> wabbitGuy </a>. &#169; <!-DATE-> Wbbitguy. All rights reserved.', 'Phone_holder_v2_mix', 7, 0, '2020-05-14 00:00:00'),
(11, 'Item/Product = 11', 'images/ma1.jpg', 'ma2.jpg, kica_flex.png, kica_flex2.png, kica_flex1.png, cat_10.png', 1990, '134x106x13', 'Flexible kitten', 'Flexible objects', 'Flexible plastic cat figure with movable parts. An ideal choice for kids or as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> Eco 13mm </li> \ r \ n <li> Small-movable </li> \ r \ n </ul> \ r \ n \ r \ n product free </li> \ r \ n <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \"> License </a> <a href = \ "https: //www.hingiverse.com/hing: 3576952 \" class = \ "BLD \"> You can change </a> \ r \ nabb Class = \ "BLD \"> Wage Printing </a> Function. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/ekketemre/about \" class = \ "BLD \"> Black </a>. &#169; <!-Date-> my black. All rights reserved.', 'flexicat_flat', 41, 0, '2020-05-01 00:00:00'),
(12, 'Item/Product = 12', 'images/r.1.jpg', 'r.2.jpg, r.3.jpg, rak_flex.png, rak_flex2.png, rak_flex11.png, rak_10.png', 2190, '121x95x8', 'Flexible cancer', 'Flexible objects', 'Flexible plastic cancer figures with movable parts. An ideal choice for kids or as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla Filament (environmentally friendly, biological) </li> \ r \ n <li> Eco 8mm </li> \ r \ n <li> slightly movable </li> \ r \ n </ul> \ r \ n \ r \ n product free </li> \ r \ n \ r \ n \ r \ n \ "https: //creativecommons.org/licenses/by/4.0/ \" class = \ "bld \"> license </a> href = \ "https: //www.hingiverse.com/hing: 3629031 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/edsparks/about \" class = \ "BLD \"> edsparks </a>. &#169; <!-Date-> Edsparks. All rights reserved.', 'Flexi_crab', 12, 0, '2020-05-14 00:00:00'),
(13, 'Item/Product = 13', 'Images/Sas1.jpg', 'sas2.jpg, sas_flex.png, sas_flex2.png, sas_flex11.png, sas_10.png', 1890, '163x90x5', 'Flexible eagle', 'Flexible objects', 'Flexible plastic eagle figure with movable parts. It may be an ideal choice for kids or as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> eco 5mm </li> \ r \ n <li> Small -movable </li> \ r \ n </ul> \ r \ n \ r \ n product free </li> \ r \ n \ r \ n \ r \ n \ "https: //creativecommons.org/licenses/by/4.0/ \" class = \ "bld \"> license </a> href = \ "https: //www.hingiverse.com/hing: 2939444 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/Airwavested/about \" class = \ "BLD \"> Airwavested </a>. &#169; <!-Date-> Airwavested. All rights reserved.', 'Articulated_soaring_eagle', 13, 0, '2020-05-01 00:00:00'),
(14, 'Item/Product = 14', 'Images/trun11.jpg', 'Cson2.jpg, skeleton_flex.png, skeleton_flex2.png, skeleton_flex11.png, skeleton_10.png', 2590, '207x101x9', 'Flexible', 'Flexible objects', 'Flexible plastic skeleton figure with movable parts. An ideal choice for kids or as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> Eco 9mm </li> \ r \ n <li> slightly movable </li> \ r \ n </ul> \ r \ n \ n \ r \ n na product free <a href = \ "https: //creativecommons.org/licenses/by/4.0/ \" class = \ "bld \" href = \ "https: //www.hingiverse.com/hing: 2299812 \" class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/lianang0108/about \" class = \ "BLD \"> LIG0108 </a>. &#169; <!-Date-> Liang0108. All rights reserved.', 'Skeleton', 14, 0, '2020-05-14 00:00:00'),
(15, 'Item/Product = 15', 'Images/U.1.jpg', 'u.2.jpg, unicornis_flex.png, unicorn_flex2.png, unicorn_flex33.png, unicornis_flex1.png', 1990, '102x79x13', 'Flexible unicorn', 'Flexible objects', 'Flexible plastic unicorn character with movable parts. An ideal choice for children or as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> Eco 13mm </li> \ r \ n <li> Small -movable </li> \ r \ n </ul> \ r \ n \ r \ n product is free <a href = \ "https: //creativecommons.org/licenses/by/4.0/ \" class = \ "bld \" href = \ "https: //www.hingiverse.com/hing: 2835053 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/benchy4life/about \" class = \ "BLD \"> benchy4life </a>. &#169; <!-Date-> benchy4life. All rights reserved.', 'Flexi-unicorn', 5, 0, '2020-05-01 00:00:00'),
(16, 'Item/Product = 16', 'images/tr1.jpg', 'TR2.JPG, TR3.JPG, DINO_FLEX.PNG, DINO2.PNG, DINO1.PNG, TREX_10.PNG', 1590, '81x67x13', 'Flexible', 'Flexible objects', 'Flexible plastic dinosaur figure with movable parts. An ideal choice for kids or as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> Eco 13mm </li> \ r \ n <li> Small-movable </li> \ r \ n </ul> \ r \ n \ r \ n product free </li> \ r \ n <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \"> License </a> <a href = \ "https: //www.hingiverse.com/hing: 2738211 \" class = \ "BLD \"> You can change </a> \ r \ n at you. \ r \ nabban in case you want to print your own model to use \ r \ n <a href = \ "/print \" Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/drlex/about \" class = \ "bld \"> drlex </a>. &#169; <!-Date-> Drlex. All rights reserved.', 'Flexi-rex', 16, 0, '2020-06-00 00:00:00'),
(17, 'Item/Product = 17', 'images/vi2.jpg', 'Vi1', 1890, '99x50x10', 'Flexible', 'Flexible objects', 'Flexible plastic hippopotamus with movable parts. An ideal choice for children or as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> Eco 10mm </li> \ r \ n <li> Small-movable </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> license </a> <a href = \ "https: //www.hingiverse.com/hing: 3811306 \" class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/joanabos/about \" class = \ "BLD \"> Joanabos </a>. &#169; <!-Date-> Joanabos. All rights reserved.', 'hippo', 17, 0, '0000-00-00 00:00:00'),
(19, 'Item/Product = 19', 'Images/ra1.jpg', 'ra2.jpg, raptor_flex.png, raptor_flex2.png, raptor_flex11.png', 1990, '160x666x13', 'Flexible raptor', 'Flexible objects', 'Flexible plastic raptor figure with movable parts. An ideal choice for children or as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> eco 13mm </li> \ r \ n <li> Small -movable </li> \ r \ n </ul> \ r \ n \ r \ n product is free <a href = \ "https: //creativecommons.org/licenses/by/4.0/ \" class = \ "bld \" href = \ "https: //www.hingiverse.com/hing: 2901355 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/cavedog/about \" class = \ "BLD \"> CAVEDOG </a>. &#169; <!-Date-> Cavedog. All rights reserved.', 'Raptor', 19, 0, '2020-06-00 00:00:00'),
(22, 'Item/Product = 22', 'Images/0f.jpg', 'mi3.jpg, microsd_10.png, microsdkartya_tarolo22.png, microsdkartya_tarolo1.png', 1790, '45x45x16', 'Micro SD card storage', 'Holders, systemators', '11mm x 15mm x 1mm MicroSD cards. A total of 18 cards are capacity, 2 rows 9pcs per line. It perfectly systematizes data storage and protects against potential injuries. The product includes the holder and its cover. <br> \ r \ n \ n \ n \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 16mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 1289250 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/bgill/about \" class = \ "BLD \"> bgill </a>. &#169; <!-Date-> bgill. All rights reserved.', 'microsdcardholderbottomv1', 21, 0, '2020-06-00 00:00:00'),
(24, 'Item/Product = 24', 'images/t.t1.jpg', 't.t2.jpg, t.t3.jpg, compesz_10.png, secretostarolo_tarolo1.png, secretostarolo_tarolo2.png, secretostarolo_tarolo33.png, secretarolo.png', 3190, '135x62x18', 'Coat', 'Holders, systemators', 'Wall -mounted secret village compartment and storage. By default, it is quite difficult to notice that the upper part of the storage is sliding and things can be done inside. Thanks to the 3 holes on the back, it is easy to secure on the wall. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 18mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 356676 \" Class = \ "BLD \"> You can view </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/tosh/about \" class = \ "BLD \"> tosh </a>. &#169; <!-Date-> Tosh. All rights reserved.', 'Shelf_inside', 23, 0, '2020-06-00 00:00:00'),
(25, 'Item/Product = 25', 'Images/pesdtaha.jpg', 'pe1.jpg, pe2.jpg, pe3.jpg, pendriwe_tarto_10.png, sdkartya_tarolo2.png, sdkartya_tarolo3.png, sdkartya_tarolo1.png, pen_sd.png', 2790, '150x32x18', 'Pendrive, SD card storage', 'Holders, systemators', 'It provides excellent universal systematization and storage facilities for the most commonly used media. The product allows you to store up to 8 usb -end devices (flash drive, connector, etc.), 8 -standard SD card and 5pcs MicroSD card. material) </l> \ r \ n <li> environmentally friendly packaging </li> \ r \ n <li> 150mm x 32mm x 18mm </li> \ r \ n </ul> \ r \ n \ r \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/3.0/3.0/3.0 Class = \ "Bld \"> Licens </a> \ r \ nvan, so you can view <a href = \ "https: //www.hingiverse.com/ther: 952885 \" class = \ "BLD \"> You can change it </a> \ r \ ness. Use \ r \ n <a href = \ "/print \" class = \ "BLD \"> wage printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/lalo_solo/about \" class = \ "BLD \"> Lalo_solo </a>. &#169; <!-DATE-> LALO_SOLO. All rights reserved.', 'Usb_stick_sd_card_holder _ -_ 8_USB', 24, 0, '2020-06-00 00:00:00'),
(29, 'Item/Product = 29', 'Images/kata.jpg', 'k_t2.jpg, k_t1.jpg, kabel_rend1.png, kabel_rend2.png', 1190, '18x18x13', 'Cable march (20pcs)', 'Holders, systemators', 'Suitable for guiding cables of different thicknesses. Easy and easy to use and can be glued to the desired surface thanks to the holding surface on the back. The package contents is 10pcs cable thread. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> environmentally friendly packaging </li> \ r \ n <li> 18mm x 18mm x 13mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \" href = \ "https: //www.hingiverse.com/hing: 1385206 \" class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/ysoft_be3d/about \" class = \ "BLD \"> ysoft_be3d </a>. &#169; <!-Date-> ysoft_be3d. All rights reserved. \ R \ n', 'Smartphone_cable_organizer_r1', 28, 0, '2020-06-00 00:00:00'),
(32, 'Item/Product = 32', 'Images/eltaha.jpg', 'aaa_1.jpg, Aaa2', 1590, '101x22x20', 'AAA Element Storage (2pcs)', 'Specialist', 'Practical storage for AAA -type elements. It can store up to 8 AAA batteries at a time, and if you order a larger number, the products can be stable. It can be an ideal choice for professionals, but it can also be used in the apartment at home. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla Filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 20mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 954557 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/jasond/about \" class = \ "bld \"> jasond </a>. &#169; <!-Date-> Jasond. All rights reserved. \ R \ n', 'Aaaholder', 30, 0, '2020-06-00 00:00:00'),
(33, 'Item/Product = 33', 'Images/eltahaaaa.jpg', 'aa_1.jpg, aa_2.jpg, aa_ele1.png, aa_ele2.png', 1590, '101x26x20', 'AA element storage (2pcs)', 'Specialist', 'Practical storage for type AA elements. It can store up to 6 AA batteries at a time, and if you order a larger number, the products can be stable. It can be an ideal choice for professionals, but it can also be used in the apartment at home. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla Filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 20mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 954557 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/jasond/about \" class = \ "bld \"> jasond </a>. &#169; <!-Date-> Jasond. All rights reserved. \ R \ n', 'Aahadolder', 31, 0, '2020-06-00 00:00:00'),
(34, 'Item/Product = 34', 'Images/9v2.jpg', '9v.jpg, 9v_ele1.png, 9v_elem2.png', 1590, '101x30x20', '9V battery storage (2pcs)', 'Specialist', 'Practical storage for 9V elements. It can store up to a maximum of 3 items at a time, and if you order a larger number, the products can be stable. It can be an ideal choice for professionals, but it can also be used in the apartment at home. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla Filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 20mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 954557 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/jasond/about \" class = \ "bld \"> jasond </a>. &#169; <!-Date-> Jasond. All rights reserved. \ R \ n', '9vholder', 32, 0, '2020-06-00 00:00:00'),
(37, 'Item/Product = 37', 'Images/Koneti.jpg', 'Ill2.jpg, Ill3.jpg, age_the tint', 2990, '130x123x50', 'Circular', 'Other', '6 pieces of special form, which once depicts circles in certain positions in front of a mirror and once squares. The \ r \ n <a class = \ "BLD \" href = \ "https: //www.youtube.com/watch? Time_continue = 30 & v = owffco7k9v8 & feature = emban Presented. <br> \ <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological decomposition) </li> \ r \ n <li> eco -friendly packaging </li> \ r <li> 130mm x 123mm x 123mm x 50mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/philoppers/about \" class = \ "BLD \"> Philkloppers </a>. &#169; <!-Date-> Phililoppers. All rights reserved. \ R \ n', 'Sugihara_cylinder_v4.1_flat_bottom', 35, 0, '2020-06-00 00:00:00'),
(38, 'Item/Product = 38', 'Images/Ak1.jpg', 'Ak2.jpg, Hasaszto2_furdo2', 1290, '64x58x10', 'Towel dryer hanger (4pcs)', 'Bathroom accessories', 'A comfortable radiator mounted towel and clothes hanger. Easy to assume and easy to move. The package contents is 4pcs towel dryer hanger. <br> \ r \ n \ n \ n \ n \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> environmentally friendly packaging </li> \ r \ r \ n <li> 64mm x 10mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/publicdomain/zero/1.0/" class = \ "BLD \"> Licensel </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 2509573 \" class = \ "BLD \"> You can change </a> \ r \ n and you can change it. If you want to print your own model Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/mcusher/about \" class = \ "bld \"> mcusher </a>. &#169; <!-DATE-> McUSHER. All rights reserved. \ R \ n', 'Towelholderbathroom_b_224mm_96mm', 36, 0, '2020-06-00 00:00:00'),
(40, 'Item/Product = 40', 'Images/degreeskikuha.jpg', 'FOKIKI.JPG,', 690, '73x35x8', 'Toothpaste key', 'Bathroom accessories', 'It makes it easy to print the residual toothpaste, paint or lubricant in different tube and storage. The product must be trapped in the longitudinal slot on the product and then began to roll at the key-like part. The holes at the top can be easily and conveniently stored or hooked. <br> \ r \ n \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 8mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 21410 \" class = \ "BLD \"> You can change </a> \ r \ nabban in case you want to print your own model to print your own model. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/alany/about \" class = \ "bld \"> subject </a>. &#169; <!-Date-> subject. All rights reserved.', 'Toothpaste-Key', 38, 0, '2020-06-00 00:00:00'),
(42, 'Item/Product = 42', 'Images/va2.jpg', 'va1.jpg, vaza_ill1.png, vaza_ill2.png', 4490, '85x85x100', 'Face-vase illusion', 'Other', 'Agely Victorian goblet face illusion. In addition to a usable cup, horizontally, a solid color background on the front of the product, two faces are symmetrically drawn. <br> \ r \ n \ n \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological) packaging </li> \ r \ n <li> 85mm x 85mm x 100mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by/4 <a href = \ "https: //www.hingiverse.com/hing: 1541337 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/alzibiff/about \" class = \ "BLD \"> Alzibiff </a>. &#169; <!-Date-> Alzibiff. All rights reserved.', 'Iron', 40, 0, '2020-06-00 00:00:00'),
(43, 'Item/Product = 43', 'Images/GOT3.JPG', 'GOT1.JPG, GOT2.JPG, GORBE_ TARTO.PNG, FOGO_Telefontarto2.png, Floodo_telefontarto3.png, Floodo_Telefontarto.png', 2990, '87x56x106', 'Minimalist telephone holder', 'Telephone holders', 'Elegant, minimalist -looking phone holder. Keeps stable with the phone set and laid, compatible with almost all types of phones thanks to its raised design. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> dul \ "> r \ n <li> 3djake ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> Packaging </li> \ r \ n <li> 87mm x 56mm x 106mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \" You can also <a href = \ "https: //www.hingiverse.com/ther: 1385206 \" class = \ "BLD \"> You can change it </a> \ r \ n at you. \ r \ nabban in case you want to print your own model to use \ r \ n <a href = \ "/print \" Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/ysoft_be3d/about \" class = \ "BLD \"> ysoft_be3d </a>. &#169; <!-Date-> ysoft_be3d. All rights reserved. \ R \ n', 'telefontarto_lebego', 3, 0, '2020-06-00 00:00:00'),
(44, 'Item/Product = 44', 'images/kt3.jpg', 'k.t4.jpg, k.t1.jpg, k.t2.jpg, kitchen.png, kitchen2.png, kitchen', 3690, '120x85x135', 'Book, booklet stand', 'Holders, systemators', 'It is a very useful and practical rack booklet, painting, book and lots of other things. Keeps the desired object stable, making it easier to read, paint or any other work. You can keep any rectangular object below 4cm thick. <br> \ r \ n \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> environmentally friendly packaging </li> \ r \ n <li> 135mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2777595 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/lazincampfire/about \" class = \ "BLD \"> Blazincampfire </a>. &#169; <!-Date-> Blazincampfire. All rights reserved.', 'Book_holder', 6, 0, '2020-06-00 00:00:00'),
(45, 'Item/Product = 45', 'Images/kataha.jpg', 'kata1.jpg, kata2.jpg, spoon.png, kanal_tarto2.png, kanal_tarto1.png', 1490, '96x41x52', 'Spoon stand', 'Holders, systemators', 'Sinus wave shaped spoon holder. There may be the right choice for people who cook a lot or are in the kitchen and I don't want the food residue from the spoon to the counter. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> 3djake ecopla filament (environmentally friendly, biological) Packaging </li> \ r \ n <li> 96mm x 41mm x 52mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \" You can <a href = \ "https: //www.hingiverse.com/there: 22000 \" class = \ "BLD \"> you can change </a> \ r \ n at you. \ R \ n Rab Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/makinit/about \" class = \ "BLD \"> makinit </a>. &#169; <!-Date-> Makinit. All rights reserved. \ R \ n', 'Sinewave_spoon_hold', 43, 0, '2020-06-00 00:00:00'),
(47, 'Item/Product = 47 \ r \ n', 'Images/TH1.jpg', 'ice cream_toe_10.png, ice cream_tarto2.png, ice cream_tarto3.png, ice cream_t.', 1290, '56x56x87', 'Ice cream holder', 'Holders, systemators', 'Practical and nice design ice cream holder. It keeps the funnel and the ice cream in it quite stable, and it does not decide on smaller shocks. It can be an ideal choice for a home for different gatherings or even shops, restaurants. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> 56mm x 87mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2864487 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/jpasternack/about \" class = \ "BLD \"> jpasternack </a>. &#169; <!-Date-> jpasternack. All rights reserved.', 'Ice_cream_cone_holder_non-Spiral', 45, 0, '2020-08-25 23:46:06'),
(49, 'Item/Product = 49', 'Images/cs.f2.jpg', 'cs.f1.jpg, skeleton head.png, skeleton.kulz2png, skeleton.kulz.png', 1790, '54x74x5', 'Skeleton', 'Keychain', 'Skeleton -shaped keychain. Corresponding choice for Halloween. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological decomposition) </li> \ r \ n <li> environmentally friendly packaging </li> \ r \ n <li> 54mm x 74mm x 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 984793 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. If you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/paulbadeuille/about \" class = \ "BLD \"> Paulbaeuille </a>. &#169; <!-Date-> Paulbaeuille. All rights reserved. \ R \ n', 'skull_keychain', 46, 0, '2020-06-00 00:00:00'),
(50, 'Item/Product = 50', 'Images/Tote4.jpg', 'Tote1.jpg, Tote2.jpg, Tote3.jpg, Sokallasu_tarto.png, Sokallasu_Telefontarto2', 1590, '70x15x15', 'Telephone keychain', 'Telephone holders', 'It allows you to easily support the phone, keeping the device securely. In addition, 0 & deg; and 90 & deg; Set the tilt angle of the holder, so you can view the screen from any viewing angle without reflection. Thanks to the practical hole on its side, you can also be tied to the key ring. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> 15mm x 15mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" \ "BLD \" href = \ "https: //www.hingiverse.com/hing: 3886027 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/chienline/about \" class = \ "BLD \"> chienline </a>. &#169; <!-Date-> Chienline. All rights reserved.', 'modboodyring', 47, 0, '2020-06-00 00:00:00'),
(51, 'Item/Product = 51', 'Images/R.E1.jpg', 'r.e2.jpg, ecsettarto_rovid_10.png, ecsettarto2', 990, '60x50x9', 'Brush support', 'Holders, systemators', 'Painting brush holder to facilitate work. It gives the perfect space to the brushes that are not used and prevents the paint from dripping on the table. It can hold up to 3 brushes at a time. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> Eco 9mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 3862469 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/kerhac/about \" class = \ "bld \"> kerhac </a>. &#169; <!-Date-> Kerhac. All rights reserved.', 'Painbrush_holder _-_ 3brushes', 48, 0, '2020-06-00 00:00:00'),
(53, 'Item/Product = 53', 'Images/ka1.jpg', 'ka2.jpg, ka3.jpg, gekko.png, kameleon2.png, kameleon1.png', 1590, '70x44x13', 'Gekko', 'Keychain', 'Gecko -shaped keychain. The keys and other things can 44mm x 13mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2208366 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/vocademy/about \" class = \ "BLD \"> vocademy </a>. &#169; <!-Date-> Vocademy. All rights reserved. \ R \ n', 'gecko', 50, 0, '2020-06-00 00:00:00'),
(54, 'Item/Product = 54', 'Images/ru1.jpg', 'ru2.jpg, 2drugo1.png, 2drugo2.png', 1790, '54x74x5', '2D spring', 'Specialist', 'Practical 2D circular spring. Ideal for professionals as a component in a more specific case. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 5713 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/scanlime/about \" class = \ "BLD \"> scanlime </a>. &#169; <!-Date-> Scanlime. All rights reserved.', 'Spring2d', 51, 0, '2020-06-00 00:00:00'),
(55, 'Item/Product = 55', 'Images/d.m1.jpg', 'D.M2.jpg, D.M3.jpg, DINO1_1.png, Madar_kulcs2.png, Madar_kulcs1.png', 1490, '50x65x5', 'Pteranodon keychain', 'Keychain', '<a href = \ "https: //hu.wikipedia.org/wiki/pteranodon \" class = \ "bld \"> pterranodon </a> shaped keychain. You can use the hole in the top to stride the key ring. <br> \ r \ n \ n \ n \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 357808 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/fusionSolusion/about \" class = \ "BLD \"> fusionsolusion </a>. &#169; <!-Date-> fusionSolusion. All rights reserved. \ R \ n', 'dino_8bit4', 52, 0, '2020-06-00 00:00:00'),
(56, 'Item/Product = 56', 'images/d.tu1.jpg', 'd.tu2.jpg, d.tu3.jpg, dino4.png, dino2_kulcs2.png, dino2_kulcs1.png', 1890, '77x51x5', 'Hylaeosaurus', 'Keychain', '<a href = \ "https: //hu.wikipedia.org/wiki/hylaeosaurus \" class = \ "bld \"> hylaeosaurus </a> shaped keychain. You can use the hole in the top to stride the key ring. <br> \ r \ n \ n \ n \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 357808 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/fusionSolusion/about \" class = \ "BLD \"> fusionsolusion </a>. &#169; <!-Date-> fusionSolusion. All rights reserved. \ R \ n', 'dino_8bit5', 53, 0, '2020-06-00 00:00:00'),
(57, 'Item/Product = 57', 'Images/d.sz1.jpg', 'd.sz2.jpg, dino3.png, dino3_kulcs2.png, dino3_kulz1.png', 1790, '68x45x5', 'Triceratops', 'Keychain', '<a href = \ "https: //hu.wikipedia.org/wiki/triceratops \" class = \ "BLD \"> triceratops </a> shaped keychain. You can use the hole in the top to stride the key ring. <br> \ r \ n \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 357808 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/fusionSolusion/about \" class = \ "BLD \"> fusionsolusion </a>. &#169; <!-Date-> fusionSolusion. All rights reserved. \ R \ n', 'dino_8bit3', 54, 0, '2020-06-00 00:00:00'),
(58, 'Item/Product = 58', 'Images/D.H3.jpg', 'd.h2.jpg, d.h1.jpg, dino2_1.png, dino4_kulcs2.png, dino4_kulcs1.png', 1390, '70x45x5', 'Psittacosaurus', 'Keychain', '<a href = \ "https: //hu.wikipedia.org/wiki/psittacosaurus \" class = \ "bld \"> psittacosaurus </a> shaped keychain. You can use the hole in the top to stride the key ring. <br> \ r \ n \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 357808 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/fusionSolusion/about \" class = \ "BLD \"> fusionsolusion </a>. &#169; <!-Date-> fusionSolusion. All rights reserved. \ R \ n', 'dino_8bit2', 55, 0, '2020-06-00 00:00:00'),
(59, 'Item/Product = 59', 'images/d.t2.jpg', 'D.T1.jpg, D.T3.jpg, dino5.png, dino5_kulcs2.png, dino5_kulz1.png', 1590, '70x37x5', 'Tyrannosaurus', 'Keychain', '<a href = \ "https: //hu.wikipedia.org/wiki/tyrannosaurus \" class = \ "bld \"> tyrannosaurus </a> shaped keychain. You can use the hole in the top to stride the key ring. <br> \ r \ n \ n \ n \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 357808 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/fusionSolusion/about \" class = \ "BLD \"> fusionsolusion </a>. &#169; <!-Date-> fusionSolusion. All rights reserved. \ R \ n', 'dino_8bit1', 56, 0, '2020-06-00 00:00:00'),
(60, 'Item/Product = 60', 'images/h.e2.jpg', 'H.E1.jpg, ecsettartohoszu.png, Long Cotechettarto.png, Long Cush22.png', 1490, '40x100x9', 'Long brush holder', 'Practical', 'Painting brush holder to facilitate work. It gives the perfect space to the brushes that are not used and prevents the paint from dripping on the table. It can hold up to 9 brushes at a time. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> Eco -friendly packaging </li> \ r \ n <li> 50mm x 65mm x 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 3862469 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/kerhac/about \" class = \ "bld \"> kerhac </a>. &#169; <!-Date-> Kerhac. All rights reserved.', 'Painbrush_holder _ -_ long', 57, 0, '2020-06-00 00:00:00'),
(61, 'Item/Product = 61', 'images/aj2.jpg', 'aj1.jpg, aj3.jpg, handleminito.png, handle opener2.png, handle opener3.png', 1690, '74x64x7', 'Covid-19 doors', 'Practical', 'A touchless handle trap for the Covid-19 epidemic. As immediate disinfection after touch can be solved everywhere (especially in institutions and hospitals), the touchless handle can be a good choice during the epidemic. It allows you to open the door without touching the handle, so protecting others. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> 65mm x 5mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 4224156 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/viktor_solenoid/designs \" class = \ "bld \"> viktor_soenoid </a>. &#169; <!-Date-> viktor_sonoid. All rights reserved.', 'Door_opener_double', 1, 0, '2020-06-00 00:00:00');
INSERT INTO `fix_products` (`id`, `url`, `img_url`, `img_showcase`, `price`, `size`, `name`, `category`, `description`, `stl_path`, `priority`, `is_best`, `date_added`) VALUES
(62, 'Item/Product = 62', 'Images/kolataha.jpg', 'LAP1.JPG, LAP2.JPG, Booklet Tarto.png, Kitchen Tarto1.png, Booklet Tar2.png', 1190, '75x28x15', 'One -finger', 'Practical', 'Easy to use a one -finger book bracket. If you read a lot of books by keeping the books of the book with your thumb with your thumb, this product can greatly make it easier to read. Simply plug your thumb into the hole and the two extremes will hold the pages. Packaging </li> \ r \ n <li> 50mm x 65mm x 5mm </li> \ r \ n <li> The hole diameter is 33mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \"> Licens </a> \ r \ nvan, so you can also view <a href = \ "https: //www.hingiver.com/ther: 144660 \" class = \ "BLD \"> You can change </a> \ r \ nab The \ r \ n <a href = \ "/print \" class = \ "BLD \"> wage printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/alahapussycat/designs \" class = \ "BLD \" &#169; <!-Date-> Frank Erfurth. All rights reserved.', 'bookringbasic', 59, 0, '2020-08-25 23:44:18'),
(64, 'Item/Product = 64', 'Images/Oss1.jpg', 'os2jpg, osfogo.png, osfogo3.png, osfogo2.png', 1090, '90x20x7', 'Backpack', 'Practical', 'It can be a great choice for loose, shoulder -sliding backpacks to unite straps. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> 65mm x 5mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/4 href = \ "https: //www.hingiverse.com/hing: 3733804 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/skdzzzzzzzzzzz/about \" class = \ "BLD \"> skd zzz </a>. &#169; <!-DATE-> SKD ZZZ. All rights reserved.', 'Backpack-Cord-Clip-S-90', 61, 0, '2020-08-25 23:45:32'),
(65, 'Item/Product = 65', 'Images/cso2.jpg', 'CEJO.JPG, CSO.PNG, CSO1.PNG, CSO2.PNG', 1990, '45x45x112', 'Target', 'Practical', 'Men intended for male penis. Product is a great product for erectileges or morning urinary difficulties. You simply need to pull the target on the male penis and start urination. The target helps the urine from sprinkling and splashing, making the urinary process more hygienic. Packaging </li> \ r \ n <li> 45mm x 45mm x 112mm </li> \ r \ n <li> The larger hole diameter is 40mm </li> \ r \ n </ul> \ r \ n \ r \ n na product free <a href = \ "https: //creativecommons.org/licenses/by-sa/4.0/ \" Class = \ "Bld \"> Licens </a> \ r \ nvan, so you can view <a href = \ "https: //www.hingiverse.com/ther Use \ r \ n <a href = \ "/print \" class = \ "bld \"> wage printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/skdzzzzzzzzzz/about \" class = \ "BLD \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved.', 'cozsa', 17, 0, '2020-06-00 00:00:00'),
(69, 'Item/Product = 69', 'Images/effokiha.jpg', 'effoki.jpg, effoki2.jpg, tooth_ki2.png', 1890, '75x40x5', 'Toothpaste', 'Bathroom accessories', 'It makes it easy to print the residual toothpaste, paint or lubricant in different tube and storage. You have to clamp the end of the tube in the longitudinal slot and then start pulling the toothpaste cloth towards the front of the tube. packaging </li> \ r \ n <li> 75mm x 40mm x 5mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/4 <a href = \ "https: //www.hingiver.com/hing: 867811 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/chattercoma/designs \" class = \ "BLD \"> chatter coma </a>. &#169; <!-Date-> Chatter coma. All rights reserved. \ R \ n', 'teeth', 66, 0, '2020-06-00 00:00:00'),
(70, 'Item/Product = 70', 'Images/mefokiha.jpg', 'mefoki1.jpg, tooth_ki_ma2.png', 1290, '80x34x7', 'Bears', 'Bathroom accessories', 'It makes it easy to print the residual toothpaste, paint or lubricant in different tube and storage. The product should be trapped in the longitudinal gap on the product and then start pulling the toothpaste cloth towards the front of the tube. The bear's exterior gives a friendly atmosphere to the bathroom. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla Filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 7mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/makeplace/designs \" class = \ "BLD \"> MakePlace </a>. &#169; <!-Date-> Makeplace. All rights reserved. \ R \ n', 'Paste_pusher_animal_bear', 67, 0, '2020-06-00 00:00:00'),
(71, 'Item/Product = 71', 'Images/Vivfokiha.jpg', 'Vokfoki.jpg, tooth_ki_me2.png', 1290, '80x34x7', 'Hippopotamus', 'Bathroom accessories', 'It makes it easy to print the residual toothpaste, paint or lubricant in different tube and storage. The product should be trapped in the longitudinal gap on the product and then start pulling the toothpaste cloth towards the front of the tube. The exterior of the hippopotamus gives a friendly atmosphere to the bathroom. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla Filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 7mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> licenses </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //wwww.hingiverse.com/makeplace/designs \" class = \ "BLD \"> MakePlace </a>. &#169; <!-Date-> Makeplace. All rights reserved. \ R \ n', 'Paste_pusher_animal_Hippo', 68, 0, '2020-06-00 00:00:00'),
(74, 'Item/Product = 74', 'Images/3cs2.jpg', '3cs1.jpg, 3cs3.jpg, 3cs4.jpg, 3cs5.jpg, b_t4', 1590, '20x20x30', '1/4 \ "Bitter (6pcs)', 'Practical', '1/4 \ "bit holder. It can be an ideal choice for professionals or hobby DIY. The product is suitable for storing any 1/4 \" standard bit. Package content is 6pcs Bit holder. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> Eco 30mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 1334432 \" Class = \ "BLD \"> You can view </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/terminus/designs \" class = \ "BLD \"> Terminus </a>. &#169; <!-Date-> term. All rights reserved.', 'Hex_handle_rotated_for_printing', 71, 0, '2020-06-00 00:00:00'),
(75, 'Item/Product = 75', 'Images/sz_t1.jpg', 'sz_t2.jpg, ak_ma1.png', 1190, '75x28x15', 'Covid-19 mouth mask strap', 'Practical', 'Mouth mask strap for the Covid-19 epidemic. It can be a useful product for any health worker or average person. The product removes the burden from the user's ear, making it comfortable for longer -term mask. You can adjust the strap in multiple steps, so it fits in with almost all sizes and shapes. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> 28mm x 15mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 4249113 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/suraky/designs \" class = \ "BLD \"> ken lord </a>. &#169; <!-Date-> Ken Lord. All rights reserved.', 'Surgical_mask_strap_remix', 2, 1, '2020-06-00 00:00:00'),
(76, 'Item/Product = 76', 'Images/cs_1.jpg', 'cs_2.jpg, chip_2.png', 1090, '90x20x7', 'Pouch', 'Practical', 'Easy to use sachet tweezers. Excellent for the opening of almost any Task or bag after opening. Thanks to its massive and stable design, you can combine thicker pouches or even several bags at a time. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \" \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> Packaging </li> \ r \ n <li> 90mm x 20mm x 7mm </li> \ r \ n </ul> \ r \ n \ r \ na product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/ting: 2335157 \" class = \ "BLD \"> You can change </a> \ r \ n and you can change it. If you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ r \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/gordoninnovations/designs \" class = \ "BLD \"> Tom Gordon </a>. &#169; <!-Date-> Tom Gordon. All rights reserved.', 'bag_clip', 73, 0, '2020-06-00 00:00:00'),
(77, 'Item/Product = 77', 'Images/evpaha.jpg', 'e_t0.jpg, e_t1.jpg, e_t2.jpg, ev_pa2.png', 990, '45x45x112', 'Chopstick', 'Practical', 'For non -Asian people, eating with chopsticks can be a great difficulty. The chopstick stinging allows us to eat with a chopstick without any precedent exercises. The chopsticks must be trapped in the two grooves and then squeezed at the top to pick up the bite. Thanks to the minimal elasticity of the material, the sticks return to their original position after release. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> packaging </li> \ r \ n <li> 45mm x 45mm x 112mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by/4/4/ \" class = \ "bld \"> license </a> <a href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na is made by <a href = \ "https: //www.hingiverse.com/zydac/designs \" class = \ "BLD \"> zydac </a>. &#169; <!-Date-> Zydac. All rights reserved.', 'Chopsticktrainer', 74, 0, '2020-06-00 00:00:00'),
(78, 'Item/Product = 78', 'images/sas.jpg', 'Adler-Sas.jpg', 3990, '150x110x3', 'Eagle lithophane', 'Lithophane', 'Lithophane depicting a white -headed eagle. Lithophane is a 3D print product that basically gives you a embossed image, but illuminates the picture itself illuminates. The 3D printer produces layers of different layers thickness, thus allowing the light to varying degrees. That is why certain parts seem light and others may be darker. <br> \ r \ n -exclusive choice as a gift or ornament in the apartment. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> 3djake ecopla filament (environmentally friendly, biological) Packaging </li> \ r \ n <li> 150mm x 110mm x 3mm </li> \ r \ n </ul> \ r \ n \ r \ n <a class = \ "BLD \" href = \ "/lithophanehelp \"> More information about lithophane <!-GBTN-> </a> Print your model Use \ r \ n <a href = \ "/print \" class = \ "BLD \"> wage printing </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 68, 1, '2020-06-00 00:00:00'),
(79, 'Item/Product = 79', 'Images/Dog.jpg', 'dog_0.jpg', 3990, '150x110x3', 'Lithophane', 'Lithophane', 'Litophane depicting a labrador dog. Lithophane is a 3D print product that basically gives you a embossed image, but illuminates the picture itself illuminates. The 3D printer produces layers of different layers thickness, thus allowing the light to varying degrees. That is why certain parts seem light and others may be darker. <br> \ r \ n -exclusive choice as a gift or ornament in the apartment. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> 3djake ecopla filament (environmentally friendly, biological) Packaging </li> \ r \ n <li> 150mm x 110mm x 3mm </li> \ r \ n </ul> \ r \ n \ r \ n <a class = \ "BLD \" href = \ "/lithophanehelp \"> More information about lithophane <!-GBTN-> </a> Print your model Use \ r \ n <a href = \ "/print \" class = \ "BLD \"> wage printing </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 71, 0, '2020-06-00 00:00:00'),
(80, 'Item/Product = 80', 'Images/Lepcso.jpg', 'Staircase.jpg', 2490, '100x75x3', 'Spiral staircase', 'Lithophane', 'Lithophane depicting a spiral stairs. Lithophane is a 3D print product that basically gives you a embossed image, but illuminates the picture itself illuminates. The 3D printer produces layers of different layers thickness, thus allowing the light to varying degrees. That is why certain parts seem light and others may be darker. <br> \ r \ n -exclusive choice as a gift or ornament in the apartment. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> 3djake ecopla filament (environmentally friendly, biological) Packaging </li> \ r \ n <li> 100mm x 75mm x 3mm </li> \ r \ n </ul> \ r \ n \ n \ n <a class = \ "BLD \" href = \ "/lithophanehelp \"> More information about lithophane <!-GBTN-> </a> Print it Use \ r \ n <a href = \ "/print \" class = \ "bld \"> wage printing </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 2, 0, '2020-06-00 00:00:00'),
(81, 'Item/Product = 81', 'Images/Jungel.jpg', 'jungle_0.jpg', 2990, '120x80x3', 'Jungle', 'Lithophane', 'Lithophane depicting jungle. Lithophane is a 3D print product that basically gives you a embossed image, but illuminates the picture itself illuminates. The 3D printer produces layers of different layers thickness, thus allowing the light to varying degrees. That is why certain parts seem light and others may be darker. <br> \ r \ n -exclusive choice as a gift or ornament in the apartment. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> 3djake ecopla filament (environmentally friendly, biological) Packaging </li> \ r \ n <li> 120mm x 80mm x 3mm </li> \ r \ n </ul> \ r \ n \ r \ n <a class = \ "BLD \" href = \ "/lithophanehelp \"> More information about lithophane <!-GBTN-> </a> Print your model Use \ r \ n <a href = \ "/print \" class = \ "BLD \"> wage printing </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 15, 0, '2020-06-00 00:00:00'),
(82, 'Item/Product = 82', 'Images/Elon.jpg', 'Elon11.jpg', 2490, '100x75x3', 'Lithophane Elon Musk', 'Lithophane', 'Lithophane depicting Elon Musk. Lithophane is a 3D print product that basically gives you a embossed image, but illuminates the picture itself illuminates. The 3D printer produces layers of different layers thickness, thus allowing the light to varying degrees. That is why certain parts look light and others may be darker. <br> \ r \ n excitement as motivation, as Elon Musk will always pay attention when you are not focused on work. \ R \ n <br> <br> \ r \ n \ n <ul class = \ "dul \"> 3dje material) </li> \ r \ n <li> environmentally friendly packaging </li> \ r \ n <li> 100mm x 75mm x 3mm </li> \ r \ n </ul> \ r \ n \ r \ n <a class = \ "bld \" href = \ "/lithophanehelp \" <!-gbtn-> </a> <br> \ r \ nban in case you want to print your own model using \ r \ n <a href = \ "/print \" class = \ "BLD \"> Wage Printing </a> href = \ "https: //www.hingiverse.com/zaccord \" class = \ "BLD \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 16, 0, '2020-06-00 00:00:00'),
(93, 'Item/Product = 93', 'Images/Geafo.jpg', 'Gea3.jpg, Gea4.jpg, Gea5.jpg', 1990, '50x50x50', 'Cube', 'Mechanical objects', 'Mechanical cube with movable gears. The product can be screwed along the corners along the gears. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> eco x 50mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'gearm', 4, 0, '2020-06-00 00:00:00'),
(94, 'Item/Product = 94', 'Images/Fin2.jpg', 'Fin3.jpg, Fin4.jpg', 2490, '140x115x95', 'Finger grip', 'Mechanical objects', 'Fingers Moving Mini Play Group. It can be a great choice for kids or enthusiastic grip for home. <br> \ r \ n \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 95mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na is made by <a href = \ "https: //www.hingiverse.com/zydac/designs \" class = \ "BLD \"> zydac </a>. &#169; <!-Date-> Zydac. All rights reserved.', 'Fingerigger_complete', 5, 0, '2020-06-00 00:00:00'),
(95, 'Item/Product = 95', 'Images/Stefo.jpg', 'ste2.jpg, ste3jpg, ste4.jpg, ste5.jpg, ste6.jpg, ste7.jpg, ste8.jpg, ste9.jpg', 2190, '130x50x9', 'Steampunk keys', 'Keychain', 'Old, antique steampunk keys. It can be an excellent choice for key rings or as an ornament in the apartment. \ R \ n <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 9mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Steampunk_key1', 68, 0, '2020-06-00 00:00:00'),
(96, 'Item/Product = 96', 'Images/grffo.jpg', 'gru2.jpg, gru3.jpg', 1790, '100x60x100', 'Serious groot', 'Sculptures & figures', 'A serious -looking Groot figure. It can be a great gift for galaxy guarders </i> fans. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> Packaging </li> \ r \ n <li> 100mm x 60mm x 100mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4.0/ \" class = \ "bld \"> license </a> href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'gravegroot', 71, 0, '2020-06-00 00:00:00'),
(97, 'Item/Product = 97', 'Images/grutfo.jpg', 'grut3.jpg, grut4.jpg', 1690, '80x60x100', 'Cheerful groot', 'Sculptures & figures', 'Cheerful groot figure. It can be a great gift for galaxy guarders </i> fans. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> Packaging </li> \ r \ n <li> 80mm x 60mm x 100mm </li> \ r \ n </ul> \ r \ n \ r \ na product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'vidamgroot', 2, 1, '2020-06-00 00:00:00'),
(98, 'Item/Product = 98', 'images/minfo.jpg', 'min2.jpg', 1490, '70x50x4', 'Minecraft keychain', 'Keychain', 'Balta, pick, sword, spade and hoe -shaped minecraft keychains. It can be a great choice for kids and any minecraft fans. \ R \ n <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (eco -friendly, biological disruptive) </li> \ r \ n <li> eco 4mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'minecraft_tools_with_keychain_hole_plus_hoe', 73, 0, '2020-06-00 00:00:00'),
(99, 'Item/Product = 99', 'images/lesfo.jpg', 'Leh2.jpg, Leh3.jpg, Leh4.jpg', 1190, '110x50x50', 'Impossible illusion', 'Sculptures & figures', 'It seems impossible triangular illusion, interesting optical disappointment. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biologically degraded material) </li> \ r \ n <li> eco 50mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Paradox_design_01_1', 12, 0, '2020-06-00 00:00:00'),
(100, 'Item/Product = 100', 'Images/kasfo.jpg', 'kas2.jpg, kas3.jpg, kas4.jpg, kas5.jpg', 2590, '65x70x100', 'Medieval castle', 'Buildings', 'Agely medieval castle on a tall rock. This detailed, elaborate and cozy castle can be an excellent choice for the apartment. Packaging </li> \ r \ n <li> 65mm x 70mm x 100mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \ also <a href = \ "https: //www.hingiverse.com/hing: 49263 \" class = \ "BLD \"> you can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'castle', 3, 1, '2020-06-00 00:00:00'),
(101, 'Item/Product = 101', 'Images/Allfo.jpg', 'all2.jpg', 1990, '105x100x70', 'Human jaw', 'Body parts', 'Lifelike human lower dentures and jaws. A special choice for dental office or anatomy enthusiasts. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> x 70mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" \ "class = \" BLD \ " href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Minihumanmandible', 74, 0, '2020-06-00 00:00:00'),
(102, 'Item/Product = 102', 'Images/Mikfo.jpg', 'Mik2.jpg, Mik3.jpg, Mik4.jpg', 1790, '50x55x100', 'Old Santa', 'Sculptures & figures', 'Old, but kind -hearted and kind Santa Claus figure. It can be a great choice for Christmas holidays as an ornament. 100mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \" href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'pukki', 74, 0, '2020-06-00 00:00:00'),
(103, 'Item/Product = 103', 'Images/Vezfo.jpg', 'lead2', 1490, '70x55x35', 'Third hand', 'Specialist', 'Third hand (wire cohesive) soldering and other work. It can be a great choice for professionals or hobbists. \ R \ n <br> <br> \ r \ n \ n \ n \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 35mm </li> \ r \ n </ul> \ r \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> license </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 74, 0, '2020-06-00 00:00:00'),
(104, 'Item/Product = 104', 'Images/Pokfo.jpg', 'Pok2.jpg, Pok3.jpg, Pok4.jpg, Pok5.jpg', 1090, '160x150x20', 'Spiders', 'Sculptures & figures', 'Scary Halloween spiders. The product can be an imaginative choice for fright or just as an ornament in the apartment. <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla Filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 20mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 5923 \" class = \ "BLD \"> You can change </a> \ r \ naban. \ r \ nabban in case you want to print your own model Class = \ "BLD \"> Wage Printing </a> Function. <br> \ r \ n \ r \ na is made by <a href = \ "https: //www.hingiverse.com/zydac/designs \" class = \ "BLD \"> zydac </a>. &#169; <!-Date-> Zydac. All rights reserved.', 'spider2a-lg', 74, 0, '2020-06-00 00:00:00'),
(105, 'Item/Product = 105', 'Images/Varfo.jpg', 'var2.jpg, var3.jpg, var4.jpg', 2390, '90x90x45', 'Christmas city', 'Buildings', 'Cozy and intimate Christmas city. It can be a great choice for the holidays as an ornament in the apartment. 45mm </li> \ r \ n </ul> \ r \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/" class = \ "bld \"> license </a> \ r \ nvan, so you also <a href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'elftown', 68, 0, '2020-06-00 00:00:00'),
(106, 'Item/Product = 106', 'Images/Terfo.jpg', 'Ter3.jpg, Cser4.jpg', 2090, '85x70x60', 'Flowerpot', 'Buildings', 'Special pentagon -based flower pots with small stairs and aquifer. Because of its uniqueness, it easily draws attention. 60mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Penta_garden_pot', 15, 0, '2020-06-00 00:00:00'),
(107, 'Item/Product = 107', 'Images/rovollo.jpg', 'rovol2.jpg, rovol3.jpg, rovol4.jpg', 1590, '15x105x60', 'Scissors', 'Mechanical objects', 'Snake -shaped mechanical toy scissors. When cutting, the scissors reach out and the snake's mouth collapses. Not suitable for real cutting. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \" \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> environmentally friendly packaging </li> \ r \ n <li> 15mm x 105mm x 60mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "bld \"> licenses </a> \ r \ nvan, so you also href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Scissorsnake', 5, 0, '2020-06-00 00:00:00'),
(108, 'Item/Product = 108', 'Images/szapfo.jpg', 'szap2.jpg, szap3.jpg, szap4.jpg, szap5.jpg', 2690, '90x110x25', 'Soap holder', 'Bathroom accessories', 'Demanding and modern soap holder. The drainage pipe ensures that the excess fluid after washing is drained. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> x 110mm x 25mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \" href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Part1', 73, 0, '2020-06-00 00:00:00'),
(109, 'Item/Product = 109', 'Images/vilfo.jpg', 'vil2.jpg', 2990, '85x75x110', 'Lighthouse', 'Buildings', 'An old -fashioned lighthouse on a stone island. It can be a great choice for the apartment or the captains to never be mistaken. Packaging </li> \ r \ n <li> 85mm x 75mm x 110mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \" You can also change it <a href = \ "https: //www.hingiver.com/ther: 49263 \" class = \ "BLD \"> You can change it </a> \ r \ n at you. \ R \ nabban in case you want to print your own model to use \ r \ n <a href = \ "/print \" Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'viltoron', 13, 0, '2020-06-00 00:00:00'),
(110, 'Item/Product = 110', 'Images/Fafo.jpg', 'Fa2.jpg, Fa3.jpg', 1790, '95x70x70', 'Halloween', 'Sculptures & figures', 'Scary and stylish Halloween tree. It can be an ideal choice as a decoration into the apartment, especially during the holidays. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> 70mm x 70mm </li> \ r \ n </ul> \ r \ n \ r \ n Product free <a href = \ "https: //creativecommons.org/licenses/by-sa/3.0/ \" class = \ "BLD \"> license </a> \ r \ n href = \ "https: //www.hingiverse.com/hing: 49263 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Wood', 74, 0, '2020-06-00 00:00:00'),
(111, 'Item/Product = 111', 'Images/Ollfo.jpg', 'Oll2.jpg, Oll3.jpg, Oll4.jpg, Oll5.jpg', 2290, '110x100x15', 'Scissors', 'Mechanical objects', 'Snake -shaped mechanical toy scissors. When cutting, the scissors reach out and the snake's mouth collapses. Not suitable for real cutting. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \" \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> environmentally friendly packaging </li> \ r \ n <li> 110mm x 100mm x 15mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Scissorsnake', 10, 0, '2020-06-00 00:00:00'),
(112, 'Item/Product = 112', 'Images/Rozsvazafo.jpg', 'rye 22.jpg, rye 33.jpg, rye 4', 1290, '60x60x120', 'Spiral', 'Vases', 'Modern, minimalist spiral vase. It can be a perfect choice for home decoration with a few flowers. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (eco -friendly, biological disruptive material) </li> \ r \ n <li> eco 120mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 74, 0, '2020-06-00 00:00:00'),
(113, 'Item/Product = 113', 'Images/Hegfo.jpg', 'Heg2.jpg, Heg3.jpg, Heg4.jpg', 1990, '75x75x65', 'Christmas mountain', 'Buildings', 'Snow Christmas Mountain with small houses and pines. It can be a great choice for the apartment. 65mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Christmas_village', 2, 0, '2020-06-00 00:00:00'),
(114, 'Item/Product = 114', 'Images/Crekezfo.jpg', 'Crekez2.jpg, Crekez3.jpg', 3990, '120x80x30', 'Scary hand', 'Body parts', 'Scary and lifelike hand model. It can be a great choice for lonely people who desire to grab their hands. In addition 3mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'creepy', 2, 0, '2020-06-00 00:00:00'),
(115, 'Item/Product = 115', 'Images/ROVODFO.JPG', 'rovke2.jpg, rovke3.jpg, rovkend4.jpg', 1890, '120x60x100', 'Hand', 'Body parts', 'Lifelike and anatomically real male hand. It may be an ideal choice for illustration. 100mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'shorthand', 74, 0, '2020-06-00 00:00:00'),
(116, 'Item/Product = 116', 'Images/Vaza4fo.jpg', 'vaza42.jpg, vaza43.jpg', 2890, '115x115x160', 'Cylindrical vase', 'Vases', 'Modern, twisted, stylish vase. It can be an excellent choice for minimalist homes similar to the product. x 160mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 74, 0, '2020-06-00 00:00:00'),
(117, 'Item/Product = 117', 'Images/vaza5fo.jpg', 'vaza52.jpg, vaza53.jpg', 1590, '120x120x100', 'Triangular vase', 'Vases', 'Modern -style triangular vase. It can be an excellent choice for minimalist homes similar to the product. x 100mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'tricoch', 74, 1, '2020-06-00 00:00:00'),
(118, 'Item/Product = 118', 'Images/vaza6fo.jpg', 'vaza62.png', 2990, '130x130x180', 'Crop', 'Vases', 'A crumpled, paper -like vase. It can be an excellent choice for minimalist homes similar to the product. x 180mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Prusa_research_vase_dominik_cisar', 12, 0, '2020-06-00 00:00:00'),
(119, 'Item/Product = 119', 'Images/gonnofo.jpg', 'gonles2.jpg, gonles3.jpg', 2290, '90x75x140', 'Evil hand', 'Body parts', 'Scary, devilish hand. It can be an ideal choice for Halloween or anatomy class. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla Filament (environmentally friendly, biological) </li> \ r \ n <li> eco 75mm x 140mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'devil', 74, 0, '2020-06-00 00:00:00'),
(120, 'Item/Product = 120', 'Images/torfo.jpg', 'Tor2.jpg, Tor3.jpg', 2490, '55x55x115', 'Tower', 'Buildings', 'Old tower with a screw with spiral. It may be an ideal choice in the apartment. 115mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 2, 0, '2020-06-00 00:00:00');
INSERT INTO `fix_products` (`id`, `url`, `img_url`, `img_showcase`, `price`, `size`, `name`, `category`, `description`, `stl_path`, `priority`, `is_best`, `date_added`) VALUES
(121, 'Item/Product = 121', 'images/vaza1fo.jpg', 'vaza12.jpg, vaza13.jpg', 1590, '95x95x100', 'Circular vase', 'Vases', 'Circular, stylish vase. It can be an excellent choice for minimalist homes like product x 100mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'ckoch1', 74, 0, '2020-06-00 00:00:00'),
(123, 'Item/Product = 123', 'Images/vaza3fo.jpg', 'vaza32.jpg, vaza33.jpg', 1590, '95x95x100', 'Vase', 'Vases', 'Simple, stylish and unique vase. It can be an excellent choice for minimalist homes like product x 100mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Twist_gear_vase2', 74, 0, '2020-06-00 00:00:00'),
(124, 'Item/Product = 124', 'Images/vaza2fo.jpg', 'vaza22.jpg, vaza23.jpg', 1990, '100x100x140', 'Vase', 'Vases', 'Patterned, axially twisted vase. It can be an excellent choice for minimalist homes similar to the product. 140mm </li> \ r \ n </ul> \ r \ n \ n \ n \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 74, 0, '2020-06-00 00:00:00'),
(126, 'Item/Product = 126', 'images/exo.png', 'exofek.png, exohoss.png, exokezes.png', 10, '160x150x40', 'Exoskeleton', 'Mechanical objects', 'Exoskeletone is a frame structure that replaces the work of the muscles when attached to a human body and serves as a frame. The product contains the screws needed for assembly and 3D printed skeleton. <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco x 40mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'exo', 1, 1, '2020-06-00 00:00:00'),
(127, 'Item/Product = 127', 'images/good.png', 'peace.png, full.png', 2490, '170x150x70', 'Mechanical hand', 'Mechanical objects', 'Mechanical hand -movable hand. It can be an ideal choice for modeling or as an ornament. The product contains all the accessories required for assembly. \ R \ n <br> \ r \ n \ r \ n \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 70mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', '', 1, 1, '2020-06-00 00:00:00'),
(128, 'Item/Product = 128', 'Images/FOHOSS.JPG', 'length2.jpg, length3.jpg, length4.jpg, length5.jpg', 2690, '300x30x30', 'Long finger', 'Mechanical objects', 'Mechanically movable long finger. You can put one of your fingers in and you can move it like a long arm. It can't be used for many things, but at least it looks good. The package includes the screws and all other supplies needed for assembly. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological) </li> \ r \ n <li> 30mm x 30mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Bolzen215mm, Teil5, Teil_1_21mm, Teil_2_205mm, Teil3, Teil4,', 1, 0, '2020-06-00 00:00:00'),
(129, 'Item/Product = 129', 'images/polltartofo.jpg', 'tolltarto1.jpg, pollltarto2.jpg, pollltarto6.jpg', 1590, '100x100x30', 'Spiral', 'Practical', 'Elegant spiral -shaped pen holder. It can be a great choice for a writer or work table. 30mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'Penhold_2levels_High, Penhold4', 13, 0, '2020-06-00 00:00:00'),
(130, 'Item/Product = 130', 'Images/skulls.jpg', 'skull2.jpg, skull3.jpg, skull4.jpg', 1490, '50x50x100', 'Skull', 'Sculptures & figures', 'Skulls with different facial expressions. An ideal choice for the apartment or Halloween. <br> \ r \ n \ n \ n \ n <ul class = \ "dul \"> \ r \ n <li> 3djake ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> eco 100mm </li> \ r \ n </ul> \ r \ n \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'skull', 14, 0, '2020-06-00 00:00:00'),
(131, 'Item/Product = 131', 'Images/Canva.jpg', 'canva1.jpg, canva2.jpg', 1690, '90x90x140', 'Rose', 'Vases', 'Rose -reminiscent screw vase. Thanks to its modern design and design, it fits perfectly in most homes. \ R \ n <br> <br> \ r \ n \ r \ n properties: \ r \ n <ul class = \ "dul \"> \ r \ n <li> 3djake Ecopla filament (environmentally friendly, biological degradation) </li> \ r \ n <li> 90mm x 140mm </li> \ r \ n </ul> \ r \ n \ r \ n product free <a href = \ "https: //creativecommons.org/licenses/by/4 href = \ "https: //www.hingiverse.com/hing: 2747478 \" Class = \ "BLD \"> You can change </a> \ r \ n and you can change it. Class = \ "BLD \"> Wage Printing </a>. <br> \ R \ n \ r \ na product <a href = \ "https: //www.hingiverse.com/zaccord \" class = \ "bld \"> zaccord </a>. &#169; <!-Date-> zaccord. All rights reserved. \ R \ n', 'mono', 14, 0, '2020-06-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 NOT NULL,
  `mult` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `name`, `mult`) VALUES
(1, 'plain', 1),
(2, 'abs', 1.45),
(3, 'petg', 1.45),
(4, 'TPU (HARD - A95)', 1.814),
(5, 'ASA', 1.45),
(6, 'Wood', 2.5),
(7, 'metal', 3.23375),
(8, 'stone', 3.2025),
(9, 'magic', 1.36),
(11, 'TPU (Medium - A85)', 1.814),
(12, 'TPU (Soft - A70)', 1.814),
(13, 'Carbon Fiber', 4.2),
(14, 'nylon', 4.2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `uid` int(11) DEFAULT NULL,
  `item_id` int(11) NOT NULL,
  `price` float NOT NULL,
  `rvas` enum('0.05','0.07','0.10','0.1','0.12','0.20','0.28','0.2') COLLATE utf8mb4_bin DEFAULT NULL,
  `suruseg` enum('Solid','Hollow','10','20','30','40','50','60','70','80','90') COLLATE utf8mb4_bin DEFAULT NULL,
  `scale` enum('0.1','0.2','0.3','0.4','0.5','0.6','0.7','0.8','0.9','1.0','1.3','1') COLLATE utf8mb4_bin DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `printMat` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `printTech` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `fvas` enum('0.8','1.2','1.6','2.0','2.4','2','2.8','3.2','3.6','4.0','4') COLLATE utf8mb4_bin DEFAULT NULL,
  `lit_sphere` enum('Convex','Concave','Smooth','') COLLATE utf8mb4_bin DEFAULT NULL,
  `lit_size` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `lit_fname` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `is_transfer` tinyint(1) NOT NULL,
  `transfer_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `transaction_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `is_fix_prod` tinyint(1) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 0,
  `shipping_price` int(11) NOT NULL,
  `cp_fname` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `is_cash_on_del` tinyint(1) NOT NULL DEFAULT 1,
  `packet_id` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `unique_id` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `same_billing_addr` tinyint(1) NOT NULL DEFAULT 1,
  `normal_compname` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `normal_compnum` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `billing_name` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `billing_country` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `billing_city` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `billing_pcode` int(11) DEFAULT NULL,
  `billing_address` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `billing_compname` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `billing_comp_tax_num` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `comment` text COLLATE utf8mb4_bin DEFAULT NULL,
  `del_type` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `e_invoice` tinyint(1) NOT NULL,
  `order_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


--
-- Table structure for table `packet_points`
--

CREATE TABLE `packet_points` (
  `id` int(11) NOT NULL,
  `packet_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `zipcode` int(11) NOT NULL,
  `city` varchar(255) NOT NULL,
  `contact` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `lat` varchar(255) DEFAULT NULL,
  `lon` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `prototype`
--

CREATE TABLE `prototype` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `mobile` text NOT NULL,
  `message` text DEFAULT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Table structure for table `reference_images`
--

CREATE TABLE `reference_images` (
  `id` int(11) NOT NULL,
  `img_url` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(1024) COLLATE utf8mb4_bin NOT NULL,
  `rvas` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `fvas` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `infill` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `size` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `reference_images`
--

INSERT INTO `reference_images` (`id`, `img_url`, `title`, `description`, `rvas`, `fvas`, `infill`, `size`, `date_added`) VALUES
(1, 'allref.jpg', '3D Printed Products', '3D printed products of different colors and complexity. The products include simple, a few hours of printable devices, as well as more complex, multi -elements of mechanical products. <br> \ r \ na movable, more complex products are printed with higher density and wall thickness to be resistant until these values ​​are smaller in sculpture objects.', '0.12', '0.4', '40', '180,60,90', '2020-06-00 00:00:00'),
(2, 'Einstein.jpg', 'Bust of Einstein', 'Bust of Albert Einstein. The product is printed with low layer thickness to get a more accurate and detailed product, plus low density, as sculpture products are not exposed to excessive use. <br> \ r \ nremek can be an ornament in the apartment.', '0.2', '0.4', '40', '200,100,120', '2020-06-00 00:00:00'),
(3, 'Hand.jpg', 'Mechanical hand', 'Mechanical hands consisting of several elements and finger minutes. The product depicts the human hand anatomically. In addition, finger minutes can be moved to the desired position. <br> \ R \ n Product <a href = \ "https: //www.zaccord.com/item/product=127 \" class = \ "bluelink font16 \"> zaccordon </a> and the package contains all the necessary assembly.', '0.2', '0.4', '40', '170,150,70', '2020-06-00 00:00:00'),
(4, 'Tree.jpg', 'Phosphorescent', 'Dark phosphorescent tree. The product is printed from a special filament that illuminates green in the dark and white in the light, rubber. Zaccordon is also possible to print from such a fillet on request.', '0.2', '0.4', '40', '130.90,100', '2020-06-00 00:00:00'),
(5, 'Woman.jpg', 'Naked female', 'Anatomically authentic, naked female upper body. It can be an ideal choice for lonely men. After <br> \ r \ nasty 3D scanning, it is possible to print the beautiful body of anyone on the zaccord, so you can always take your beloved body with us.', '0.2', '0.4', '40', '130.90,100', '2020-06-00 00:00:00'),
(6, 'covidmask.jpg', 'Covid-19 mask and filter', 'Covid-19 mask and associated filter for the time of the coronavirus epidemic. The mask is available in different sizes and is possible to print the product from flexible filament as required, making it much more convenient to wear. The associated filter is medically tested and commercially available. <br> \ r \ na mask did not undergo any official test, so it can only be used at your own risk. Nonetheless, it is more reliable and safer than the ventilated textile masks currently available.', '0.2', '0.4', '40', '130.90,100', '2020-06-00 00:00:00'),
(7, 'exoskeleton.jpg', 'Exoskeleton', 'Hand -mounted exoskeleton. The product consists of several elements that the customer has to assemble, but the package is all available in the package. It can be used immediately after assembly and looks very cool. <br> \ r \ n Product <a class = \ "bluelink font16 \" href = \ "https: //wwww.zaccord.com/item/product=126 \"> zaccordon can be purchased </a> and within a few days.', '0.2', '0.4', '40', '130.90,100', '2020-06-00 00:00:00'),
(8, 'Skull.jpg', 'Human skull', 'Anatomically authentic human skull. It can be an ideal choice for fanatic doctors or biology teachers at home.', '0.2', '0.4', '40', '130.90,100', '2020-06-00 00:00:00'),
(9, 'vase.jpg', 'Spiral', 'Modern spiral vase. It can be a great choice for the apartment as a decoration, especially for the same, clean style homes. <br> \ r \ n Product <a class = \ "bluelink font16 \" href = \ "https: //www.zaccord.com/item/product=131 \"> zaccordon can be purchased </a> and in a few days.', '0.2', '0.4', '40', '130.90,100', '2020-06-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(320) COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(512) COLLATE utf8mb4_bin NOT NULL,
  `temp_password` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL,
  `user_agent` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `ip_addr` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `register_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Table structure for table `z_prod`
--

CREATE TABLE `z_prod` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `is_live` tinyint(1) NOT NULL,
  `creation_date` datetime NOT NULL,
  `expiry` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Structure for view `a`
--
DROP TABLE IF EXISTS `a`;

CREATE ALGORITHM=UNDEFINED DEFINER=`zaccordc`@`localhost` SQL SECURITY DEFINER VIEW `a`  AS  select `reference_images`.`id` AS `id`,`reference_images`.`img_url` AS `img_url`,`reference_images`.`title` AS `title`,`reference_images`.`description` AS `description`,`reference_images`.`rvas` AS `rvas`,`reference_images`.`fvas` AS `fvas`,`reference_images`.`infill` AS `infill`,`reference_images`.`size` AS `size`,`reference_images`.`date_added` AS `date_added` from `reference_images` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivery_data`
--
ALTER TABLE `delivery_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fix_products`
--
ALTER TABLE `fix_products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `packet_points`
--
ALTER TABLE `packet_points`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prototype`
--
ALTER TABLE `prototype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reference_images`
--
ALTER TABLE `reference_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `z_prod`
--
ALTER TABLE `z_prod`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `colors`
--
ALTER TABLE `colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `delivery_data`
--
ALTER TABLE `delivery_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=268;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `fix_products`
--
ALTER TABLE `fix_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=132;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=662;

--
-- AUTO_INCREMENT for table `packet_points`
--
ALTER TABLE `packet_points`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `prototype`
--
ALTER TABLE `prototype`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `reference_images`
--
ALTER TABLE `reference_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `z_prod`
--
ALTER TABLE `z_prod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
