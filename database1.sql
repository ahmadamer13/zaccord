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
(6, 'Is It Worth Investing in a 3D Printer?', 'COVID-19 Mask and Filter', 'COVID-19 mask and matching filter for use during the coronavirus pandemic. The mask comes in different sizes and can be printed in flexible filament for a more comfortable fit. The included filter is medically tested and commercially available.<br> The mask has not undergone official testing, so it is used at your own risk. However, it is significantly more reliable and safer than the loosely woven textile masks currently available on the market.', 'megerie_print', 'The technology of 3D printing and the number of possible designs and ideas are enormous, but buying a 3D printer is not worth it for everyone.\r\nMost people simply buy a printer and filament and think they can print anything, but when something goes wrong or breaks, they have no idea what to do.\r\n', 'megerie_bor.jpg', '2022-02-28 19:19:08', '2022-02-18 07:18:17'),
(7, 'Which Is Stronger? Resin vs Filament', 'Exoskeleton', 'A wearable hand exoskeleton. The product consists of multiple components that the buyer must assemble, but all necessary tools are included in the package. Once assembled, it''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.', 'resinvsfila_print', 'The most frequently discussed topics relate to the quality, material cost, and printing time of printed models.\r\nSometimes we need to print an object that requires specific structural properties such as tensile strength and impact resistance, and we need to find out whether resin-printed parts are stronger or weaker than filament-printed ones.\r\n', 'fdmsla1.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(8, '3D Printing and Its History', 'Human Skull', 'An anatomically accurate human skull. Ideal for passionate doctors or biology teachers as a display piece at home.', 'fogalmaesmultja', '3D printing is an additive technology used to produce parts. The term “additive” refers to the fact that physical objects are made without a material block or mold — instead, the printer builds up layers of material and fuses them together. It is typically fast, has low setup costs, and can create more complex geometries than traditional technologies, with an ever-growing list of materials. It is widely used in engineering, especially for making prototypes and lightweight designs.', 'additiv.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(9, 'What Exactly Is FDM 3D Printing?', 'Spiral Vase', 'A modern spiral vase. A great decorative piece for homes, especially those with a minimalist style.<br> Available for purchase on jordan3dprint and delivered within a few days.', 'fdm_print', 'Learn the basics of Fused Deposition Modeling (FDM) 3D printing. Discover why this technology is so affordable and why it is an excellent choice for fast and low-cost prototyping. Explore FDM materials and understand the benefits and drawbacks for users.', 'fdm_printer.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(10, 'What Is SLA 3D Printing?', 'Mark Frankli', '3D Printing,SLA,Stereolithography', 'sla_print', 'Learn about stereolithography, also known as SLA 3D printing, and find out why this printing technology is so popular and cost-effective. Understand how SLA printing works, its parameters, and discover how suitable this 3D printing method is for your parts, models, or projects.', 'sla_print.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(15, 'The Role of Layer Height in 3D Printing', 'Mark Frankli', '3D Printing,Technology,3D Printer,Layer Height,Surface', 'retegmagassag', 'Layer height in 3D printing is a simple setting that affects the printing speed and the level of detail of the model you want to print; it also impacts its durability, strength, and appearance.\r\nWhat and Why\r\nLayer height is exactly what it sounds like: the precise height of each layer of plastic extruded or cured by the 3D printer. This setting is controlled through slicing software and has much more influence on the final print than you might think at first glance. Properly adjusted layer height can significantly affect print quality.', 'layer5.jpg', '2022-02-28 19:19:08', '2022-02-18 07:18:17'),
(16, 'Best Websites to Find Low-Poly Models', 'Mark Frankli', '3D Printing,Online,Models,Low-Poly', 'lowpoly', 'Before listing the best low-poly 3D model sources, let’s see what “low-poly” actually means.\r\nThe term “poly” comes from “polygon.” A polygon is a 2D shape made up of straight lines and angles. When we combine several polygons, we can create recognizable 3D shapes.\r\n', 'lowpolyrabbit.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(17, '3D Printed Lithophanes', 'Mark Frankli', '3D Printing,Technologies,Lithophane,Images', 'litofan', 'The lithophane is a very special art form from the past. It has a rich history and has evolved over many years.\r\nIts unique way of displaying images gives it a magical effect. Lithophanes are usually curved or flat rectangular panels made from thin material containing many fine details. These details are only revealed when light shines through the back of the material, revealing the image it creates.\r\n', 'litofan1.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(18, 'Is PLA Really Biodegradable?', 'Mark Frankli', '3D Printing,Biology,Ecology,PLA', 'pla_bomlas', 'The most popular 3D printing material, PLA, is said to be biodegradable.\r\nPLA, or polylactic acid, is a thermoplastic and the most widely used 3D printing filament. Known for its ease of use, PLA requires a relatively low extrusion temperature of around 180°C and no heated bed temperature.\r\n', 'bio1.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(19, 'Best Modeling Software for Beginners', 'Mark Frankli', '3D Printing,Modeling,Software', 'softwerek_kezdoknek', '3D modeling takes a lot of practice, but anyone can learn it over time. It can have a steep learning curve, and many advanced CAD programs used to create digital objects can be confusing for complete beginners. Famous tools like SketchUp or Blender can intimidate new users with complex toolsets and unfamiliar controls that might discourage them initially.', 'softborito.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(20, 'PLA vs ABS vs PETG: Which Is the Best?', 'Mark Frankli', '3D Printing,Filaments,PLA,PETG,ABS', 'plaabspetg', 'PLA, ABS, and PETG are among the most popular and widely available filaments. But just because they’re easy to find doesn’t mean they’re equally suitable for every printing task.\r\n', 'pvpvafila.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(21, 'Creating 3D Printed Stencils', 'Mark Frankli', '3D Printing,Technologies,Stencil,Painting', 'sablonok', 'Stencils are a unique art form used for everything from warning signs to your favorite T-shirt. Whether made industrially or cut by hand and laser, there’s now a new method for making them: 3D printing.', 'stencil2.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(22, 'Creating 3D Printed Molds', 'Mark Frankli', '3D Printing,Molds,Mass Production,Tooling', 'ontoforma', 'These are great for mass production, standardizing designs, and expanding your repertoire of what you can make. First, we need to distinguish between two types of object-making to illustrate how printing 3D molds differs from regular 3D printing projects. The main difference lies in how we reach the final object.', 'mold4.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(23, 'Advantages and Challenges of 3D Printing in Prototyping', 'Peter Kis', '3D Printing,Prototype,Advantages,Challenges', 'A_3D_nyomtatas_elonyei_es_kihivasai', '3D printing, also known as additive manufacturing, has revolutionized prototyping in recent years. It allows for fast and cost-effective production of physical prototypes, enabling businesses to test and refine designs faster than ever before.', 'proto_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(24, '3D Printing in Medicine: From Surgical Aids to Prosthetics', 'Peter Kis', '3D Printing,Medicine,Industry', '3D_nyomtatas_az_orvosi_iparban', '3D printing has made significant progress in the medical industry in recent years, where it is used for applications ranging from surgical tools to prosthetics. It offers many advantages, including customization, cost efficiency, and speed, making it increasingly popular in medical applications.', 'orvoslas_bor.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(25, 'Environmental Impact of 3D Printing', 'Peter Kis', '3D Printing,Environment,Ecology', 'A_3D_nyomtatas_kornyezeti_hatasa', '3D printing, also known as additive manufacturing, can revolutionize how products are made, offering benefits such as customization, cost efficiency, and speed.', 'kornyezet_bor.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(26, 'The Future of 3D Printing: Predictions and Opportunities', 'Peter Kis', '3D Printing,Technologies,Future,Development', 'A_3D_nyomtatas_jovoje', '3D printing, also known as additive manufacturing, has come a long way since the 1980s. It has the potential to revolutionize how products are produced, offering benefits like customization, cost efficiency, and speed.', 'jovo_bor.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(27, 'The Ethics of 3D Printing: Intellectual Property and Accessibility', 'Peter Kis', '3D Printing,Ethics,Intellectual Property', 'A_3D_nyomtatas_etikaja', 'As 3D printing technology continues to advance, it is important to consider its ethical implications. In this post, we discuss two key ethical considerations in 3D printing: intellectual property rights and accessibility.', 'etika_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(28, '3D Printing in the Fashion Industry: From Prototypes to Final Products', 'Peter Kis', '3D Printing,Prototype,Fashion', '3D_nyomtatas_a_divatiparban', '3D printing, also known as additive manufacturing, could revolutionize the fashion industry. It offers numerous advantages, including the ability to produce customized and complex designs, reduce waste and emissions, and speed up manufacturing processes.', 'divat_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(29, '3D Printing in Construction: From Prototyping to 3D Printed Houses', 'Peter Kis', '3D Printing,Construction,Housing', '3D_nyomtatas_az_epitoiparban', '3D printing, also known as additive manufacturing, can revolutionize the construction industry. It offers benefits like the ability to produce customized and complex designs, reduce waste and emissions, and accelerate building processes.', 'epites_bor.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(30, 'The Economics of 3D Printing: Cost-Benefit Analysis', 'Peter Kis', '3D Printing,Economics,Cost,Benefit', 'A_3D_nyomtatas_gazdasagtana', '3D printing, also known as additive manufacturing, can transform the way products are designed and manufactured. It offers many advantages, including the production of customized and complex designs, reduction of waste and emissions, and acceleration of manufacturing processes.', 'gazdasag_bor.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(31, '3D Printing in the Art World: From Sculptures to Functional Art', 'Peter Kis', '3D Printing,Art,Sculpture,Painting', '3D_nyomtatas_a_muveszet_vilagaban', 'In recent years, 3D printing has revolutionized the art world, allowing artists to create intricate sculptures and functional pieces with unprecedented precision and detail.', 'muveszet_bor.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(32, '3D Printing in the Electronics Industry: From Prototypes to Final Parts', 'Peter Kis', '3D Printing,Electronics,Mass Production,Industry', '3D_nyomtatas_a_szorakoztato_elektronikai_iparban', 'The electronics industry has always been a driver of innovation, and 3D printing is no exception. In recent years, it has become an increasingly valuable tool for companies in consumer electronics — from creating prototypes and testing new products to producing final parts and even complete devices.', 'elektronika_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17'),
(33, '3D Printing in the Furniture Industry: From Prototypes to Finished Products', 'Peter Kis', '3D Printing,Furniture,Prototype', '3D_nyomtatas_a_butoriparban', 'The use of 3D printing technology in the furniture industry has come a long way in recent years. Initially used mainly for prototypes and concept models, it is now also being applied to produce end products for the market. This technology offers designers and manufacturers many advantages, including the ability to quickly and easily create complex shapes, customize products for individual customers, and produce on demand.', 'butor_bor.jpg', '2022-02-27 19:19:08', '2022-02-24 07:18:17'),
(34, '3D Printing in the Sports Industry: From Custom Equipment to Performance Wear', 'Peter Kis', '3D Printing,Sports,Customization,Personalization', '3D_nyomtatas_a_sportiparban', 'The sports industry has always led the way in adopting new technologies to improve performance and enhance the sporting experience. In recent years, 3D printing has emerged as a promising technology that could revolutionize the sports sector.', 'sport_bor.jpg', '2022-02-28 19:19:08', '2022-02-22 07:18:17'),
(35, 'The Benefits of 3D Printing for Small Businesses and Startups', 'Peter Kis', '3D Printing,Business,Startup,Advantages', 'A_3D_nyomtatas_elonyei_a_kisvallalkozasok_es_a_startupok_szamara', 'In recent years, 3D printing has emerged as a promising technology capable of revolutionizing many industries. For small businesses and startups, 3D printing offers numerous advantages that can help them succeed and grow.', 'startup_bor.jpg', '2022-02-28 19:19:08', '2022-02-20 07:18:17'),
(36, '3D Printing in the Packaging Industry: From Prototypes to Final Products', 'Peter Kis', '3D Printing,Packaging,Sustainability', '3D_nyomtatas_a_csomagoloiparban', '3D printing is revolutionizing how products are designed and manufactured across various industries, and packaging is no exception. From prototyping new packaging designs to producing final products, 3D printing plays an increasingly important role in the packaging industry.', 'csomag_bor.jpg', '2022-02-27 03:06:05', '2022-02-26 07:18:17');
-- Jordan-focused posts (English)
INSERT INTO `blog` (`id`, `title`, `author`, `categories`, `content_path`, `summary`, `img_url`, `last_update`, `date`) VALUES
(37, '3D Printing in Jordan: Overview & Opportunities', 'Mark Frankli', '3D Printing,Jordan,Startups,Education', '3d_printing_in_jordan_overview', 'Jordan’s 3D printing landscape is expanding across startups, education, and small manufacturing. Practical tips to get started and deliver results locally.', 'proto_bor.jpg', NOW(), NOW()),
(38, 'How the Jordanian Government Supports 3D Printing', 'Mark Frankli', '3D Printing,Jordan,Government,Funding', 'jordan_government_support_for_3d_printing', 'Education, entrepreneurship, and access programs are helping individuals and SMEs adopt 3D printing faster and more safely across Jordan.', 'startup_bor.jpg', NOW(), NOW()),
(39, 'Best 3D Printing Websites in Jordan (3DJordanPrint First)', 'Mark Frankli', '3D Printing,Jordan,Services,Guide', 'best_3d_printing_websites_in_jordan', 'How to choose a reliable 3D printing service in Jordan, with 3DJordanPrint as the top pick for fast quotes, local turnaround, and clear guidance.', 'elektronika_bor.jpg', NOW(), NOW());
-- Training-focused posts (English)
INSERT INTO `blog` (`id`, `title`, `author`, `categories`, `content_path`, `summary`, `img_url`, `last_update`, `date`) VALUES
(30, 'Getting Started with Online 3D Printing Training', 'Mark Frankli', '3D Printing,Training,Online Learning,Beginners', 'online_3d_printing_training_intro', 'A concise guide to the very first topics to learn online: FDM vs SLA, slicer basics, materials, safety, and a 4‑week starter plan.', 'startup_bor.jpg', NOW(), NOW()),
(31, 'Top Free Online 3D Printing Courses', 'Mark Frankli', '3D Printing,Training,Courses,Free', 'top_free_online_3d_printing_courses', 'Hand‑picked free tracks and how to use them effectively with weekly goals and practice prints for faster results.', 'softborito.jpg', NOW(), NOW()),
(32, '30‑Day CAD‑to‑Print Learning Path', 'Mark Frankli', '3D Printing,Training,CAD,Workflow', '30_day_cad_to_print_path', 'A structured month to build a reliable CAD‑to-print workflow with clear milestones, test prints, and documentation.', 'fdm_printer.jpg', NOW(), NOW());
-- 2025 global and industry insights
INSERT INTO `blog` (`id`, `title`, `author`, `categories`, `content_path`, `summary`, `img_url`, `last_update`, `date`) VALUES
(40, 'Which Country Is Leading 3D Printing in 2024?', 'Mark Frankli', '3D Printing,Industry,Global Trends', 'global_leaders_in_3d_printing', 'The United States currently leads additive manufacturing thanks to deep public and private investment, while Europe and Asia quickly close the gap.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Robot_3D_print_timelapse_on_RepRapPro_Fisher.webm/1200px--Robot_3D_print_timelapse_on_RepRapPro_Fisher.webm.jpg', NOW(), NOW()),
(41, 'How Much Can 1 kg of PLA Print for 70 JD?', 'Mark Frankli', '3D Printing,Materials,Costing', 'pla_spool_output_70jd', 'Break down how many real-world parts you can produce from a 1 kg spool priced at 70 JD, with cost-per-gram math and slicer efficiency tips.', 'https://upload.wikimedia.org/wikipedia/commons/8/8b/Prusa_i3_3D_Printer_-_Reprap_-_Completed.jpg', NOW(), NOW()),
(42, 'From the 45-Degree Rule to Nike\'s 3D Printing Lab', 'Mark Frankli', '3D Printing,Design,Footwear,R&D', 'fortyfive_rule_and_nike_3d_printing', 'Learn the 45-degree overhang rule for clean FDM prints and see how Nike leverages rapid additive workflows for athlete-ready footwear.', 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Nike_Shoes_3.jpg', NOW(), NOW());
-------------------------------------------------------

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
-- PLA
INSERT INTO `colors` (`id`, `color`, `material`, `images`, `info`, `hex_color`, `in_stock`) VALUES
-- PLA
(1, 'White', '3D Printed Products', '3D printed products in various colors and levels of complexity. The selection includes simple items that can be printed in a few hours, as well as more complex mechanical products made of multiple components.<br> The movable and more complex products are printed with higher density and wall thickness to make them more durable, while sculpture-like objects have lower values for these settings.', 'Standard color', 'ffffff', 1),
(2, 'Black', 'Einstein Bust', 'A bust of Albert Einstein. The product is printed with a low layer height for higher accuracy and detail, and with low density since sculpture-like objects are not subject to heavy use.<br> A great decorative choice for your home.', 'Standard color', '000000', 1),
(3, 'Red', 'Mechanical Hand', 'A mechanical hand composed of multiple parts and finger joints. The product accurately represents the anatomy of a human hand. The finger joints can be moved into desired positions.<br> Available for purchase on jordan3dprint, and the package includes everything needed for assembly.', 'Well printable', 'FF0000', 1),
(4, 'Yellow', 'Phosphorescent Tree', 'A tree that glows in the dark. Printed with a special filament that glows green in the dark and appears white and rubber-like in daylight. Custom prints using this filament are available upon request through jordan3dprint.', 'Well printable', 'FFFF00', 1),
(5, 'Green', 'Naked Female Body', 'An anatomically accurate, naked female upper body. An ideal choice for collectors or as an anatomical study piece.<br> After a preliminary 3D scan, jordan3dprint can print anyone''s beautiful body, so you can always have a keepsake of your loved one''s form.', 'Well printable', '90EE90', 1),
(6, 'Gray', 'COVID-19 Mask and Filter', 'COVID-19 mask and matching filter for use during the coronavirus pandemic. The mask comes in different sizes and can be printed in flexible filament for a more comfortable fit. The included filter is medically tested and commercially available.<br> The mask has not undergone official testing, so it is used at your own risk. However, it is significantly more reliable and safer than the loosely woven textile masks currently available on the market.', 'Well printable', 'D3D3D3', 1),
(7, 'Silver', 'Exoskeleton', 'A wearable hand exoskeleton. The product consists of multiple components that the buyer must assemble, but all necessary tools are included in the package. Once assembled, it''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.', 'Well printable', 'C0C0C0', 1),
(8, 'White', 'Human Skull', 'An anatomically accurate human skull. Ideal for passionate doctors or biology teachers as a display piece at home.', 'Standard color', 'ffffff', 1),
(9, 'Black', 'Spiral Vase', 'A modern spiral vase. A great decorative piece for homes, especially those with a minimalist style.<br> Available for purchase on jordan3dprint and delivered within a few days.', 'Standard color', '000000', 1),
(10, 'White', 'tpu_medium', 'tpu_feher.jpg', 'Standard color', 'ffffff', 1),
(11, 'Black', 'tpu_medium', 'tpu_fekete.jpg', 'Standard color', '000000', 1);

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
(1, 'item/product=1', '3D Printed Products', '3D printed products in various colors and levels of complexity. The selection includes simple items that can be printed in a few hours, as well as more complex mechanical products made of multiple components.<br> The movable and more complex products are printed with higher density and wall thickness to make them more durable, while sculpture-like objects have lower values for these settings.''''40x7x28'''', ''''Pizza Paper Clip (8pcs)'''', ''''Other'''', ''''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/tosh/about" class="bld">Tosh</a>. &#169; <!--DATE--> Tosh. All rights reserved.'''', ''''pizza_clip'''', 100, 0, ''''2020-05-01 00:00:00''''),
(2, ''''item/product=2'''', ''''Einstein Bust'''', ''''A bust of Albert Einstein. The product is printed with a low layer height for higher accuracy and detail, and with low density since sculpture-like objects are not subject to heavy use.<br> A great decorative choice for your home.''''58x12x25'''', ''''Diamond Money Clip (6 pcs)'''', ''''Other'''', ''''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/ysoft_be3d/about" class="bld">YSoft_be3D</a>. &#169; <!--DATE--> YSoft_be3D. All rights reserved. '''', ''''diamond'''', 40, 0, ''''2020-05-14 00:00:00''''),
(4, ''''item/product=4'''', ''''Phosphorescent Tree'''', ''''A tree that glows in the dark. Printed with a special filament that glows green in the dark and appears white and rubber-like in daylight. Custom prints using this filament are available upon request through jordan3dprint.''''50x65x15'''', ''''Dolphin Phone Stand'''', ''''Phone Holders'''', ''''Easy-to-use delfines phone stand. For extra stability, we recommend setting the scale to x1.3 in the specifications.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>55mm x 65mm x 15mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:1686467" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/goraering/about" class="bld">goraering</a>. &#169; <!--DATE--> goraering. All rights reserved. '''', ''''delfin_tarto'''', 41, 0, ''''2020-05-14 00:00:00''''),
(5, ''''item/product=5'''', ''''images/mat3.jpg'''', ''''mat1.jpg, 1990, ''''60x30x68 '''', ''''Cat Phone Stand'''', ''''Phone Holders'''', ''''For extra stability, we recommend setting the scale to x1.3 in the specifications.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>65mm x 30mm x 68mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:1012788" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/tinyeyes/about" class="bld">Tinyeyes</a>. &#169; <!--DATE--> Tinyeyes. All rights reserved.'''', ''''catstand'''', 51, 1, ''''2020-05-01 00:00:00''''),
(10, ''''item/product=10'''', ''''images/v22.jpg'''', ''''v21.jpg, 2590, ''''90x64x25'''', ''''Multi-Position Phone Stand'''', ''''Phone Holders'''', ''''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/wabbitguy/about" class="bld">wabbitguy</a>. &#169; <!--DATE--> wabbitguy. All rights reserved.'''', ''''Phone_Holder_V2_Mix'''', 7, 0, ''''2020-05-14 00:00:00''''),
(11, ''''item/product=11'''', ''''images/ma1.jpg'''', ''''ma2.jpg, 1990, ''''134x106x13 '''', ''''Flexible Cat'''', ''''Flexible Objects'''', ''''Flexible plastic figure with movable parts. An ideal choice for children or as home decor.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>134mm x 116mm x 13mm</li>
<li>Slightly movable along the joints.</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:3576952" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/feketeimre/about" class="bld">feketeimre</a>. &#169; <!--DATE--> feketeimre. All rights reserved.'''', ''''flexicat_flat'''', 41, 0, ''''2020-05-01 00:00:00''''),
(12, ''''item/product=12'''', ''''images/r.1.jpg'''', ''''r.2.jpg, 2190, ''''121x95x8 '''', ''''Flexible Crab'''', ''''Flexible Objects'''', ''''Flexible plastic figure with movable parts. An ideal choice for children or as home decor.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>121mm x 95mm x 8mm</li>
<li>Slightly movable along the joints.</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:3629031" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/edsparks/about" class="bld">EDSparks</a>. &#169; <!--DATE--> EDSparks. All rights reserved.'''', ''''Flexi_Crab'''', 12, 0, ''''2020-05-14 00:00:00''''),
(13, ''''item/product=13'''', ''''images/sas1.jpg'''', ''''sas2.jpg, 1890, ''''163x90x5'''', ''''Flexible Eagle'''', ''''Flexible Objects'''', ''''Flexible plastic figure with movable parts. An ideal choice for children or as home decor.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>163mm x 90mm x 5mm</li>
<li>Slightly movable along the joints.</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2939444" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/airwavested/about" class="bld">AirwavesTed</a>. &#169; <!--DATE--> AirwavesTed. All rights reserved.'''', ''''Articulated_Soaring_Eagle'''', 13, 0, ''''2020-05-01 00:00:00''''),
(14, ''''item/product=14'''', ''''images/cson1.jpg'''', ''''cson2.jpg, 2590, ''''207x101x9'''', ''''Flexible Skeleton'''', ''''Flexible Objects'''', ''''Flexible plastic figure with movable parts. An ideal choice for children or as home decor.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>207mm x 101mm x 9mm</li>
<li>Slightly movable along the joints.</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2299812" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/liang0108/about" class="bld">Liang0108</a>. &#169; <!--DATE--> Liang0108. All rights reserved.'''', ''''Skeleton'''', 14, 0, ''''2020-05-14 00:00:00''''),
(15, ''''item/product=15'''', ''''images/u.1.jpg'''', ''''u.2.jpg, 1990, ''''102x79x13'''', ''''Flexible Unicorn'''', ''''Flexible Objects'''', ''''Flexible plastic figure with movable parts. An ideal choice for children or as home decor.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>102mm x 79mm x 13mm</li>
<li>Slightly movable along the joints.</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2835053" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/benchy4life/about" class="bld">Benchy4Life</a>. &#169; <!--DATE--> Benchy4Life. All rights reserved.'''', ''''Flexi-UnicornFlat'''', 5, 0, ''''2020-05-01 00:00:00''''),
(16, ''''item/product=16'''', ''''images/tr1.jpg'''', ''''tr2.jpg, 1590, ''''81x67x13'''', ''''Flexible Dinosaur'''', ''''Flexible Objects'''', ''''Flexible plastic figure with movable parts. An ideal choice for children or as home decor.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>81mm x 67mm x 13mm</li>
<li>Slightly movable along the joints.</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2738211" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/drlex/about" class="bld">DrLex</a>. &#169; <!--DATE--> DrLex. All rights reserved.'''', ''''Flexi-Rex'''', 16, 0, ''''2020-06-00 00:00:00''''),
(17, ''''item/product=17'''', ''''images/vi2.jpg'''', ''''vi1.jpg, 1890, ''''99x50x10'''', ''''Flexible Hippo'''', ''''Flexible Objects'''', ''''Flexible plastic figure with movable parts. An ideal choice for children or as home decor.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>99mm x 50mm x 10mm</li>
<li>Slightly movable along the joints.</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:3811306" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/joanabos/about" class="bld">joanabos</a>. &#169; <!--DATE--> joanabos. All rights reserved.'''', ''''hippo'''', 17, 0, ''''0000-00-00 00:00:00''''),
(19, ''''item/product=19'''', ''''images/ra1.jpg'''', ''''ra2.jpg, 1990, ''''160x66x13'''', ''''Flexible Raptor'''', ''''Flexible Objects'''', ''''Flexible plastic figure with movable parts. An ideal choice for children or as home decor.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>160mm x 66mm x 13mm</li>
<li>Slightly movable along the joints.</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2901355" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/cavedog/about" class="bld">Cavedog</a>. &#169; <!--DATE--> Cavedog. All rights reserved.'''', ''''raptor'''', 19, 0, ''''2020-06-00 00:00:00''''),
(22, ''''item/product=22'''', ''''images/0f.jpg'''', ''''mi3.jpg, 1790, ''''45x45x16'''', ''''Micro SD Card Holder'''', ''''Holders & Organizers'''', ''''Holder for 11 x 15 x 1 mm microSD cards. Capacity: 18 cards, arranged in 2 rows of 9. Keeps your media organized and protected from damage. Includes the tray and its lid.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>45mm x 45mm x 16mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:1289250" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/bgill/about" class="bld">bgill</a>. &#169; <!--DATE--> bgill. All rights reserved.'''', ''''microsdcardholderbottomv1'''', 21, 0, ''''2020-06-00 00:00:00''''),
(24, ''''item/product=24'''', ''''images/t.t1.jpg'''', ''''t.t2.jpg, 3190, ''''135x62x18'''', ''''Secret Wall Compartment'''', ''''Holders & Organizers'''', ''''Wall-mountable hidden wall compartment and storage. It''''''''s hard to notice that the top section slides open to reveal storage space. Three holes on the back make wall mounting easy.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>135mm x 62mm x 18mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:356676" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/tosh/about" class="bld">Tosh</a>. &#169; <!--DATE--> Tosh. All rights reserved.'''', ''''shelf_inside'''', 23, 0, ''''2020-06-00 00:00:00''''),
(25, ''''item/product=25'''', ''''images/pesdtaha.jpg'''', ''''pe1.jpg, 2790, ''''150x32x18'''', ''''USB Drive & SD Card Holder'''', ''''Holders & Organizers'''', ''''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/lalo_solo/about" class="bld">Lalo_Solo</a>. &#169; <!--DATE--> Lalo_Solo. All rights reserved.'''', ''''USB_Stick_SD_Card_Holder_-_8_USB'''', 24, 0, ''''2020-06-00 00:00:00''''),
(29, ''''item/product=29'''', ''''images/kata.jpg'''', ''''k_t2.jpg, 1190, ''''18x18x13'''', ''''Cable Guide (20 pcs)'''', ''''Holders & Organizers'''', ''''Suitable for routing cables of different thicknesses. Easy to use, and the adhesive back lets you attach it to the desired surface. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/ysoft_be3d/about" class="bld">YSoft_be3D</a>. &#169; <!--DATE--> YSoft_be3D. All rights reserved. '''', ''''SmartPhone_Cable_Organizer_r1'''', 28, 0, ''''2020-06-00 00:00:00''''),
(32, ''''item/product=32'''', ''''images/eltaha.jpg'''', ''''aaa_1.jpg, 1590, ''''101x22x20'''', ''''AAA Battery Holder (2 pcs)'''', ''''Tools'''', ''''Practical holder for AAA batteries. Holds up to 8 AAA cells at once; ordering more than one lets the units interlock securely. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jasond/about" class="bld">jasond</a>. &#169; <!--DATE--> jasond. All rights reserved. '''', ''''AAAHolder'''', 30, 0, ''''2020-06-00 00:00:00''''),
(33, ''''item/product=33'''', ''''images/eltahaaaa.jpg'''', ''''aa_1.jpg, 1590, ''''101x26x20'''', ''''AA Battery Holder (2 pcs)'''', ''''Tools'''', ''''Practical holder for AA batteries. Holds up to 6 AA cells at once; ordering more than one lets the units interlock securely. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jasond/about" class="bld">jasond</a>. &#169; <!--DATE--> jasond. All rights reserved. '''', ''''AAHolder'''', 31, 0, ''''2020-06-00 00:00:00''''),
(34, ''''item/product=34'''', ''''images/9v2.jpg'''', ''''9v.jpg, 1590, ''''101x30x20 '''', ''''9V Battery Holder (2 pcs)'''', ''''Tools'''', ''''Practical holder for 9V batteries. Holds up to 3 cells at once; ordering more than one lets the units interlock securely. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jasond/about" class="bld">jasond</a>. &#169; <!--DATE--> jasond. All rights reserved. '''', ''''9VHolder'''', 32, 0, ''''2020-06-00 00:00:00''''),
(37, ''''item/product=37'''', ''''images/koneti.jpg'''', ''''ill2.jpg, 2990, ''''130x123x50'''', ''''Circle-to-Square Illusion'''', ''''Other'''', ''''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/philkloppers/about" class="bld">PhilKloppers</a>. &#169; <!--DATE--> PhilKloppers. All rights reserved. '''', ''''Sugihara_Cylinder_V4.1_Flat_Bottom'''', 35, 0, ''''2020-06-00 00:00:00''''),
(38, ''''item/product=38'''', ''''images/ak1.jpg'''', ''''ak2.jpg, 1290, ''''64x58x10'''', ''''Radiator Towel Hook (4 pcs)'''', ''''Bathroom Accessories'''', ''''Convenient towel and clothes hook for radiators. Easy to mount and simple to move. The package contains 4 hooks.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>64mm x 58mm x 10mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/publicdomain/zero/1.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2509573" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/mcusher/about" class="bld">McUsher</a>. &#169; <!--DATE--> McUsher. All rights reserved.
 '''', ''''TowelHolderBathroom_B_224mm_96mm'''', 36, 0, ''''2020-06-00 00:00:00''''),
(40, ''''item/product=40'''', ''''images/fokikuha.jpg'''', ''''fokiku.jpg, 690, ''''73x35x8'''', ''''Toothpaste Squeezer Key'''', ''''Bathroom Accessories'''', ''''Helps easily squeeze out the remaining toothpaste, paint, or ointment from various tubes and containers. Insert the end of the tube into the long slot, then start turning the key-like part. The holes at the top make it easy to store or hang.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>73mm x 35mm x 8mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:21410" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/alany/about" class="bld">alany</a>. &#169; <!--DATE--> alany. All rights reserved.'''', ''''toothpaste-key'''', 38, 0, ''''2020-06-00 00:00:00''''),
(42, ''''item/product=42'''', ''''images/va2.jpg'''', ''''va1.jpg, 4490, ''''85x85x100'''', ''''Face-Vase Illusion'''', ''''Other'''', ''''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/alzibiff/about" class="bld">Alzibiff</a>. &#169; <!--DATE--> Alzibiff. All rights reserved.'''', ''''Vase'''', 40, 0, ''''2020-06-00 00:00:00''''),
(43, ''''item/product=43'''', ''''images/got3.jpg'''', ''''got1.jpg, 2990, ''''87x56x106'''', ''''Minimalist Phone Stand'''', ''''Phone Holders'''', ''''Elegant, minimalist phone stand. Holds the phone securely both upright and on its side.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>87mm x 56mm x 106mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:1385206" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/ysoft_be3d/about" class="bld">YSoft_be3D</a>. &#169; <!--DATE--> YSoft_be3D. All rights reserved.
 '''', ''''telefontarto_lebego'''', 3, 0, ''''2020-06-00 00:00:00''''),
(44, ''''item/product=44'''', ''''images/kt3.jpg'''', ''''k.t4.jpg, 3690, ''''120x85x135'''', ''''Book, Notebook Stand'''', ''''Holders & Organizers'''', ''''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/blazincampfire/about" class="bld">BlazinCampfire</a>. &#169; <!--DATE--> BlazinCampfire. All rights reserved.'''', ''''Book_Holder'''', 6, 0, ''''2020-06-00 00:00:00''''),
(45, ''''item/product=45'''', ''''images/kataha.jpg'''', ''''kata1.jpg, 1490, ''''96x41x52'''', ''''Spoon Rest'''', ''''Holders & Organizers'''', ''''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/makinit/about" class="bld">makinit</a>. &#169; <!--DATE--> makinit. All rights reserved. '''', ''''Sinewave_Spoon_Hold'''', 43, 0, ''''2020-06-00 00:00:00''''),
(47, ''''item/product=47\r\n'''', ''''images/to1.jpg'''', ''''fagyi_tarto_10.png,fagylalt_tarto2.png,fagylalt_tarto3.png,fagylalt_tarto1.png,fagyitarto.png', 990, '40x7x28', 'Pizza Paper Clip (8pcs)', 'Other', 'If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/tosh/about" class="bld">Tosh</a>. &#169; <!--DATE--> Tosh. All rights reserved.', '', 71, 0, '2020-06-00 00:00:00'),
(80, 'item/product=80', 'images/lepcso.jpg', 'staircase.jpg', 2490, '100x75x3', 'Spiral Staircase Lithophane', 'Lithophanes', 'Lithophane depicting a spiral staircase. A lithophane is a 3D-printed item that looks like a relief image, but when backlit, the picture becomes clear. <br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>100mm x 75mm x 3mm</li>
</ul>

<a class="bld" href="/lithophaneHelp">More information about lithophanes <!--GBTN--></a><br>
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', '', 2, 0, '2020-06-00 00:00:00'),
(81, 'item/product=81', 'images/jungel.jpg', 'jungle_0.jpg', 2990, '120x80x3', 'Jungle Lithophane', 'Lithophanes', 'Lithophane depicting a jungle. A lithophane is a 3D-printed item that looks like a relief image, but when backlit, the picture becomes clear. <br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>120mm x 80mm x 3mm</li>
</ul>

<a class="bld" href="/lithophaneHelp">More information about lithophanes <!--GBTN--></a><br>
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', '', 15, 0, '2020-06-00 00:00:00'),
(82, 'item/product=82', 'images/elon.jpg', 'elon11.jpg', 2490, '100x75x3', 'Elon Musk Lithophane', 'Lithophanes', 'Lithophane depicting Elon Musk. A lithophane is a 3D-printed item that looks like a relief image, but when backlit, the picture becomes clear. <br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>100mm x 75mm x 3mm</li>
</ul>

<a class="bld" href="/lithophaneHelp">More information about lithophanes <!--GBTN--></a><br>
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', '', 16, 0, '2020-06-00 00:00:00'),
(93, 'item/product=93', 'images/geafo.jpg', 'gea3.jpg, 1990, ''50x50x50'', ''Gear Cube'', ''Mechanical Objects'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>50mm x 50mm x 50mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:5923" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''gearcube'', 4, 0, ''2020-06-00 00:00:00''),
(94, ''item/product=94'', ''images/fin2.jpg'', ''fin3.jpg, 2490, ''140x115x95'', ''Finger Grabber'', ''Mechanical Objects'', ''Mini toy excavator operated with your fingers. A great choice for kids or enthusiastic excavator operators at home.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>140mm x 115mm x 95mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:5923" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/zydac/designs" class="bld">Zydac</a>. &#169; <!--DATE--> Zydac. All rights reserved.'', ''Fingerdigger_Complete'', 5, 0, ''2020-06-00 00:00:00''),
(95, ''item/product=95'', ''images/stefo.jpg'', ''ste2.jpg, 2190, ''130x50x9'', ''Steampunk Keys'', ''Keychains'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>130mm x 50mm x 9mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:5923" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''Steampunk_Key1'', 68, 0, ''2020-06-00 00:00:00''),
(96, ''item/product=96'', ''images/grufo.jpg'', ''gru2.jpg, 1790, ''100x60x100'', ''Serious Groot'', ''Sculptures & Figures'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>100mm x 60mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:5923" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''komolygroot'', 71, 0, ''2020-06-00 00:00:00''),
(97, ''item/product=97'', ''images/grutfo.jpg'', ''grut3.jpg, 1690, ''80x60x100'', ''Happy Groot'', ''Sculptures & Figures'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>80mm x 60mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:5923" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''vidamgroot'', 2, 1, ''2020-06-00 00:00:00''),
(98, ''item/product=98'', ''images/minfo.jpg'', ''min2.jpg', 1990, '50x50x50', 'Gear Cube', 'Mechanical Objects', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>50mm x 50mm x 50mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:5923" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'minecraft_tools_with_keychain_hole_plus_hoe', 73, 0, '2020-06-00 00:00:00'),
(99, 'item/product=99', 'images/lehfo.jpg', 'leh2.jpg, 1190, ''110x50x50'', ''Impossible Illusion'', ''Sculptures & Figures'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>100mm x 50mm x 50mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:5923" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''Paradox_Design_01_1'', 12, 0, ''2020-06-00 00:00:00''),
(100, ''item/product=100'', ''images/kasfo.jpg'', ''kas2.jpg, 2590, ''65x70x100'', ''Medieval Castle'', ''Buildings'', ''Historically accurate medieval castle on a high rock. <br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>65mm x 70mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''kastely'', 3, 1, ''2020-06-00 00:00:00''),
(101, ''item/product=101'', ''images/allfo.jpg'', ''all2.jpg', 1190, '110x50x50', 'Impossible Illusion', 'Sculptures & Figures', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>100mm x 50mm x 50mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:5923" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'MiniHumanMandible', 74, 0, '2020-06-00 00:00:00'),
(102, 'item/product=102', 'images/mikfo.jpg', 'mik2.jpg, 1790, ''50x55x100'', ''Old Santa'', ''Sculptures & Figures'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>50mm x 55mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''pukki'', 74, 0, ''2020-06-00 00:00:00''),
(103, ''item/product=103'', ''images/vezfo.jpg'', ''vez2.jpg, 1490, ''70x55x35'', ''Third Hand'', ''Tools'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>70mm x 55mm x 35mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', '''', 74, 0, ''2020-06-00 00:00:00''),
(104, ''item/product=104'', ''images/pokfo.jpg'', ''pok2.jpg, 1090, ''160x150x20'', ''Spiders'', ''Sculptures & Figures'', ''If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/zydac/designs" class="bld">Zydac</a>. &#169; <!--DATE--> Zydac. All rights reserved.'', ''spider2a-lg'', 74, 0, ''2020-06-00 00:00:00''),
(105, ''item/product=105'', ''images/varfo.jpg'', ''var2.jpg, 2390, ''90x90x45 '', ''Christmas Town'', ''Buildings'', ''Cozy and intimate Christmas town. <br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>90mm x 90mm x 45mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''elftown'', 68, 0, ''2020-06-00 00:00:00''),
(106, ''item/product=106'', ''images/cserfo.jpg'', ''cser3.jpg, 2090, ''85x70x60'', ''Flower Pot'', ''Buildings'', ''Unique pentagonal flower pot with a small step and water tray. Its uniqueness easily draws attention.
<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>85mm x 70mm x 60mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved.
 '', ''Penta_Garden_Pot'', 15, 0, ''2020-06-00 00:00:00''),
(107, ''item/product=107'', ''images/rovollfo.jpg'', ''rovoll2.jpg, 1590, ''15x105x60'', ''Short Snake Scissors'', ''Mechanical Objects'', ''Snake-shaped mechanical toy scissors. When cutting, the scissor extends forward and the snake''''s mouth closes. Not suitable for real cutting.
<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>15mm x 105mm x 60mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved.
 '', ''ScissorSnake'', 5, 0, ''2020-06-00 00:00:00''),
(108, ''item/product=108'', ''images/szapfo.jpg'', ''szap2.jpg, 2690, ''90x110x25'', ''Soap Dish'', ''Bathroom Accessories'', ''Refined and modern soap dish. The drain tube ensures excess water is carried away after use.
<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>90mm x 110mm x 25mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved.
 '', ''Part1'', 73, 0, ''2020-06-00 00:00:00''),
(109, ''item/product=109'', ''images/vilfo.jpg'', ''vil2.jpg', 1790, '50x55x100', 'Old Santa', 'Sculptures & Figures', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>50mm x 55mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'viltorony', 13, 0, '2020-06-00 00:00:00'),
(110, 'item/product=110', 'images/fafo.jpg', 'fa2.jpg, 1790, ''95x70x70'', ''Halloween Tree'', ''Sculptures & Figures'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>95mm x 70mm x 70mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''fahalo'', 74, 0, ''2020-06-00 00:00:00''),
(111, ''item/product=111'', ''images/ollfo.jpg'', ''oll2.jpg, 2290, ''110x100x15'', ''Snake Scissors'', ''Mechanical Objects'', ''Snake-shaped mechanical toy scissors. When cutting, the scissor extends forward and the snake''''s mouth closes. Not suitable for real cutting.
<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>110mm x 100mm x 15mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved.
 '', ''ScissorSnake'', 10, 0, ''2020-06-00 00:00:00''),
(112, ''item/product=112'', ''images/rozsvazafo.jpg'', ''rozsvaza2.jpg, 1290, ''60x60x120'', ''Spiral Vase'', ''Vases'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>60mm x 60mm x 120mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', '''', 74, 0, ''2020-06-00 00:00:00''),
(113, ''item/product=113'', ''images/hegfo.jpg'', ''heg2.jpg, 1990, ''75x75x65'', ''Christmas Mountain'', ''Buildings'', ''A great choice as home decor. <br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>75mm x 75mm x 65mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''Christmas_Village'', 2, 0, ''2020-06-00 00:00:00''),
(114, ''item/product=114'', ''images/crekezfo.jpg'', ''crekez2.jpg, 3990, ''120x80x30'', ''Scary Hand'', ''Body Parts'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>120mm x 80mm x 3mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''creepy'', 2, 0, ''2020-06-00 00:00:00''),
(115, ''item/product=115'', ''images/rovkezfo.jpg'', ''rovkez2.jpg, 1890, ''120x60x100'', ''Hand'', ''Body Parts'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>120mm x 60mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''shorthand'', 74, 0, ''2020-06-00 00:00:00''),
(116, ''item/product=116'', ''images/vaza4fo.jpg'', ''vaza42.jpg, 2890, ''115x115x160'', ''Cylindrical Vase'', ''Vases'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>115mm x 115mm x 160mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', '''', 74, 0, ''2020-06-00 00:00:00''),
(117, ''item/product=117'', ''images/vaza5fo.jpg'', ''vaza52.jpg, 1590, ''120x120x100'', ''Triangle-Based Vase'', ''Vases'', ''<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>120mm x 120mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. '', ''trikoch'', 74, 1, ''2020-06-00 00:00:00''),
(118, ''item/product=118'', ''images/vaza6fo.jpg'', ''vaza62.png', 1790, '95x70x70', 'Halloween Tree', 'Sculptures & Figures', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>95mm x 70mm x 70mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by-sa/3.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:49263" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'Prusa_Research_Vase_Dominik_Cisar', 12, 0, '2020-06-00 00:00:00'),
(119, 'item/product=119', 'images/gonkezfo.jpg', 'gonkez2.jpg, 2290, '90x75x140', 'Evil Hand', 'Body Parts', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>90mm x 75mm x 140mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'devil', 74, 0, '2020-06-00 00:00:00'),
(120, 'item/product=120', 'images/torfo.jpg', 'tor2.jpg, 2490, '55x55x115', 'Twisted Tower', 'Buildings', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>55mm x 55mm x 115mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', '', 2, 0, '2020-06-00 00:00:00');
INSERT INTO `fix_products` (`id`, `url`, `img_url`, `img_showcase`, `price`, `size`, `name`, `category`, `description`, `stl_path`, `priority`, `is_best`, `date_added`) VALUES
(121, 'item/product=121', 'images/vaza1fo.jpg', 'vaza12.jpg, 1590, '95x95x100', 'Circle-Based Vase', 'Vases', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>95mm x 95mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'ckoch1', 74, 0, '2020-06-00 00:00:00'),
(123, 'item/product=123', 'images/vaza3fo.jpg', 'vaza32.jpg, 1590, '95x95x100', 'Simple Vase', 'Vases', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>95mm x 95mm x 100mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'twist_gear_vase2', 74, 0, '2020-06-00 00:00:00'),
(124, 'item/product=124', 'images/vaza2fo.jpg', 'vaza22.jpg, 1990, '100x100x140', 'Twisted Vase', 'Vases', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>100mm x 100mm x 140mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', '', 74, 0, '2020-06-00 00:00:00'),
(126, 'item/product=126', 'images/exo.png', 'exofek.png, 10, '160x150x40', 'Exoskeleton', 'Mechanical Objects', 'An exoskeleton is a frame attached to the human body that replaces muscle work and serves as a support. The product includes the screws required for assembly and the 3D-printed frame.<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>160mm x 150mm x 40mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved.
 ', 'exo', 1, 1, '2020-06-00 00:00:00'),
(127, 'item/product=127', 'images/good.png', 'peace.png, 2490, '170x150x70', 'Mechanical Hand', 'Mechanical Objects', 'Mechanical hand with individually articulated finger segments. An ideal choice for modeling or as decor. <br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>170mm x 150mm x 70mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', '', 1, 1, '2020-06-00 00:00:00'),
(128, 'item/product=128', 'images/fohossz.jpg', 'hossz2.jpg, 2690, '300x30x30', 'Long Finger', 'Mechanical Objects', 'Mechanically movable long finger. Insert one finger and move it like a long claw. Not very practical, but it looks great. The package includes the screws and all other accessories needed for assembly.
<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>300mm x 30mm x 30mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like.
If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved.
 ', 'Bolzen215mm,Teil5,Teil_1_21mm,Teil_2_205mm,Teil3,Teil4,', 1, 0, '2020-06-00 00:00:00'),
(129, 'item/product=129', 'images/tolltartofo.jpg', 'tolltarto1.jpg, 1590, '100x100x30', 'Spiral Pen Holder', 'Practical', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>100mm x 100mm x 30mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'penhold_2levels_high,penhold4', 13, 0, '2020-06-00 00:00:00'),
(130, 'item/product=130', 'images/koponyak.jpg', 'koponya2.jpg, 1490, '50x50x100', 'Skulls', 'Sculptures & Figures', 'If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'koponyak', 14, 0, '2020-06-00 00:00:00'),
(131, 'item/product=131', 'images/canva.jpg', 'canva1.jpg, 1690, '90x90x140', 'Rose Vase', 'Vases', '<br><br>

Features:
<ul class="dul">
<li>3DJake ecoPLA filament (eco-friendly, biodegradable material)</li>
<li>Eco-friendly packaging</li>
<li>90mm x 90mm x 140mm</li>
</ul>

The product is available under a free <a href="https://creativecommons.org/licenses/by/4.0/" class="bld">license</a>, so you can <a href="https://www.thingiverse.com/thing:2747478" class="bld">view it</a> and modify it as you like. If you would like to print your own model, use the <a href="/print" class="bld">print-on-demand</a> function.<br><br>

Product by <a href="https://www.thingiverse.com/jordan3dprint" class="bld">jordan3dprint</a>. &#169; <!--DATE--> jordan3dprint. All rights reserved. ', 'mono', 14, 0, '2020-06-00 00:00:00');

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
(1, 'pla', 1),
-- PETG at 0.10 JD/g relative to PLA 0.07 JD/g => 1.428571
(2, 'petg', 1.428571),
-- TPU at 0.20 JD/g relative to PLA 0.07 JD/g => 2.857142
(3, 'tpu_medium', 2.857142);

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
(1, 'allref.jpg', '3D Printed Products', '3D printed products in various colors and levels of complexity. The selection includes simple items that can be printed in a few hours, as well as more complex mechanical products made of multiple components.<br> The movable and more complex products are printed with higher density and wall thickness to make them more durable, while sculpture-like objects have lower values for these settings.', '0.12', '0.4', '40', '180,60,90', '2020-06-00 00:00:00'),
(2, 'einstein.jpg', 'Einstein Bust', 'A bust of Albert Einstein. The product is printed with a low layer height for higher accuracy and detail, and with low density since sculpture-like objects are not subject to heavy use.<br> A great decorative choice for your home.', '0.2', '0.4', '40', '200,100,120', '2020-06-00 00:00:00'),
(3, 'hand.jpg', 'Mechanical Hand', 'A mechanical hand composed of multiple parts and finger joints. The product accurately represents the anatomy of a human hand. The finger joints can be moved into desired positions.<br> Available for purchase on jordan3dprint, and the package includes everything needed for assembly.', '0.2', '0.4', '40', '170,150,70', '2020-06-00 00:00:00'),
(4, 'tree.jpg', 'Phosphorescent Tree', 'A tree that glows in the dark. Printed with a special filament that glows green in the dark and appears white and rubber-like in daylight. Custom prints using this filament are available upon request through jordan3dprint.', '0.2', '0.4', '40', '130,90,100', '2020-06-00 00:00:00'),
(5, 'tree.jpg', 'Naked Female Body', 'An anatomically accurate, naked female upper body. An ideal choice for collectors or as an anatomical study piece.<br> After a preliminary 3D scan, jordan3dprint can print anyone''s beautiful body, so you can always have a keepsake of your loved one''s form.', '0.2', '0.4', '40', '130,90,100', '2020-06-00 00:00:00'),
(6, 'covidmask.jpg', 'COVID-19 Mask and Filter', 'COVID-19 mask and matching filter for use during the coronavirus pandemic. The mask comes in different sizes and can be printed in flexible filament for a more comfortable fit. The included filter is medically tested and commercially available.<br> The mask has not undergone official testing, so it is used at your own risk. However, it is significantly more reliable and safer than the loosely woven textile masks currently available on the market.', '0.2', '0.4', '40', '130,90,100', '2020-06-00 00:00:00'),
(7, 'exoskeleton.jpg', 'Exoskeleton', 'A wearable hand exoskeleton. The product consists of multiple components that the buyer must assemble, but all necessary tools are included in the package. Once assembled, it''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.''s ready for immediate use and looks very cool.<br> Also available for purchase on jordan3dprint and delivered within a few days.', '0.2', '0.4', '40', '130,90,100', '2020-06-00 00:00:00'),
(8, 'skull.jpg', 'Human Skull', 'An anatomically accurate human skull. Ideal for passionate doctors or biology teachers as a display piece at home.', '0.2', '0.4', '40', '130,90,100', '2020-06-00 00:00:00'),
(9, 'vase.jpg', 'Spiral Vase', 'A modern spiral vase. A great decorative piece for homes, especially those with a minimalist style.<br> Available for purchase on jordan3dprint and delivered within a few days.', '0.2', '0.4', '40', '130,90,100', '2020-06-00 00:00:00');

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

CREATE ALGORITHM=UNDEFINED DEFINER=`jordan3dprintc`@`localhost` SQL SECURITY DEFINER VIEW `a`  AS  select `reference_images`.`id` AS `id`,`reference_images`.`img_url` AS `img_url`,`reference_images`.`title` AS `title`,`reference_images`.`description` AS `description`,`reference_images`.`rvas` AS `rvas`,`reference_images`.`fvas` AS `fvas`,`reference_images`.`infill` AS `infill`,`reference_images`.`size` AS `size`,`reference_images`.`date_added` AS `date_added` from `reference_images` ;

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
