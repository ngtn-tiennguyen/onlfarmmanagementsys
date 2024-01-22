-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 10, 2022 at 01:34 PM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlyvungtrong`
--

-- --------------------------------------------------------

--
-- Table structure for table `caytrong`
--

DROP TABLE IF EXISTS `caytrong`;
CREATE TABLE IF NOT EXISTS `caytrong` (
  `macaytrong` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `tencaytrong` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `tomtatcaytrong` longtext COLLATE utf8_unicode_ci,
  `manhomctrong` char(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`macaytrong`),
  KEY `manhomctrong` (`manhomctrong`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `caytrong`
--

INSERT INTO `caytrong` (`macaytrong`, `tencaytrong`, `tomtatcaytrong`, `manhomctrong`) VALUES
('Sam', 'Củ sâm ', 'Loại củ này chỉ sinh trưởng ở những nơi có khí hậu lạnh với độ cao gần 2.000m so với mực nước biển và được trồng chủ yếu nhiều ở xã Y Tý, huyện Bát Xát, tỉnh Lào Cai.', 'Rau-Cu'),
('CaPhe', 'Cà phê', 'Cây cà phê thích hợp sống ở những vùng đất đồi núi cao (cao hơn mực nước biển khoảng 600 mét trở lên).', 'CLN'),
('Lua-Gao', 'Lúa gạo', 'Thời gian sinh trưởng của cây lúa: Tính từ lúc hạt lúa nẩy mầm đến lúc thu hoạch (dao động khoảng 90-180 ngày đối với các giống lúa hiện trồng).', 'LuongThuc'),
('SR-CM', 'Sầu Riêng Cái Mơn', 'Quả sầu riêng thường nặng từ 1 – 2kg, có khoảng 10 múi lớn. ', 'CayAnQua'),
('SauRieng', 'Sầu Riêng', 'Loài cây cùng họ với cây gạo, quả có gai mềm trông như quả mít nhỏ, vị ngọt, nồng và béo', 'CAQ'),
('Mia', 'Mía', 'Chúng vốn là các loài cỏ, có thân cao từ 2-6 m, chia làm nhiều đốt, bên trong có chứa đường.', 'CNN');

-- --------------------------------------------------------

--
-- Table structure for table `congdoan`
--

DROP TABLE IF EXISTS `congdoan`;
CREATE TABLE IF NOT EXISTS `congdoan` (
  `macongdoan` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `tencongdoan` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`macongdoan`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `congdoan`
--

INSERT INTO `congdoan` (`macongdoan`, `tencongdoan`) VALUES
('tiacanh', 'Tỉa cành'),
('bonphan', 'Bón phân'),
('tiala', 'Tỉa lá'),
('lamdat', 'Làm đất'),
('xuonggiong', 'Xuống giống'),
('tuoinuoc', 'Tưới nước'),
('phunthuoc', 'Phun thuốc'),
('thuhoach', 'Thu hoạch');

-- --------------------------------------------------------

--
-- Table structure for table `dvt`
--

DROP TABLE IF EXISTS `dvt`;
CREATE TABLE IF NOT EXISTS `dvt` (
  `madvt` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `tendvt` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`madvt`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `dvt`
--

INSERT INTO `dvt` (`madvt`, `tendvt`) VALUES
('Cay', 'Cây'),
('Kg', 'Kilogram');

-- --------------------------------------------------------

--
-- Table structure for table `lo`
--

DROP TABLE IF EXISTS `lo`;
CREATE TABLE IF NOT EXISTS `lo` (
  `malo` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `tenlo` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dientichlo` float NOT NULL,
  `mathua` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`malo`),
  KEY `mathua` (`mathua`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lo`
--

INSERT INTO `lo` (`malo`, `tenlo`, `dientichlo`, `mathua`) VALUES
('BT-L71', 'Lô BT-71', 7.117, 'BT-T71'),
('LD-L49', 'Lô LD-49', 4.994, 'LD-T49'),
('LC-L24', 'Lô LC-24', 2.444, 'LC-T24'),
('HG-L95', 'Lô HG-95', 9.955, 'HG-T95'),
('CT-L65', 'Lô CT-65', 6.566, 'CT-T65');

-- --------------------------------------------------------

--
-- Table structure for table `nhomctrong`
--

DROP TABLE IF EXISTS `nhomctrong`;
CREATE TABLE IF NOT EXISTS `nhomctrong` (
  `manhomctrong` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `tennhomctrong` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `motanhomctrong` longtext COLLATE utf8_unicode_ci,
  PRIMARY KEY (`manhomctrong`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nhomctrong`
--

INSERT INTO `nhomctrong` (`manhomctrong`, `tennhomctrong`, `motanhomctrong`) VALUES
('Rau-Cu', 'Rau - Củ', 'Các loại như: sâm, dưa, bầu, bí, mướp, khoai lang,...'),
('CLN', 'Cây công nghiệp lâu năm', 'Gồm các loại như:  chè, cà phê, cao su,...'),
('CAQ', 'Cây ăn quả', 'Cây ăn quả là bất kì loại cây nào ra quả ăn được.'),
('LuongThuc', 'Lương thực', 'Bao gồm: các loại cây hạt cốc (lúa gạo, lúa mì, ngô, cao lương, kê), cây có củ (khoai lang, sắn, khoai tây, khoai nước, khoai sọ, dong riềng, củ mỡ, vv.)'),
('CNN', 'Cây công nghiệp ngắn ngày', 'Bao gồm: mía, đậu phộng, đậu tương,...');

-- --------------------------------------------------------

--
-- Table structure for table `nongho`
--

DROP TABLE IF EXISTS `nongho`;
CREATE TABLE IF NOT EXISTS `nongho` (
  `manongho` char(12) COLLATE utf8_unicode_ci NOT NULL,
  `tennongho` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `gt` tinyint(1) NOT NULL,
  `namsinh` date NOT NULL,
  `sdt` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `diachi` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `urlanh` text COLLATE utf8_unicode_ci,
  PRIMARY KEY (`manongho`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `nongho`
--

INSERT INTO `nongho` (`manongho`, `tennongho`, `gt`, `namsinh`, `sdt`, `email`, `diachi`, `urlanh`) VALUES
('nh01', 'Thúy Loan', 0, '1989-12-13', '0123456789', 'thuyloan@gmail.com', 'Quận Mỹ Tho, Tiền Giang', ''),
('nh02', 'Chí Long', 1, '2114-12-02', '0234567891', 'chilong@gmail.com', 'Quận Gò Vấp, TP. Hồ Chí Minh', ''),
('nh03', 'Sáp Kỳ', 0, '1994-02-10', '0987564321', 'sapky@gmail.com', 'Quận 1, TP. Hồ Chí Minh', ''),
('nh04', 'Châu Hiền', 0, '1991-03-29', '0908971243', 'chauhien@gmail.com', 'Quận 1, TP. Hồ Chí Minh', ''),
('nh05', 'Đê Sung', 1, '1994-09-10', '0789653423', 'daesung@gmail.com', 'Quận 7, TP. Hồ Chí Minh', '');

-- --------------------------------------------------------

--
-- Table structure for table `qlvt`
--

DROP TABLE IF EXISTS `qlvt`;
CREATE TABLE IF NOT EXISTS `qlvt` (
  `maqlvt` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `manongho` char(12) COLLATE utf8_unicode_ci NOT NULL,
  `mavt` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `mathua` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `malo` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `manhomctrong` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `macaytrong` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `soluong` float NOT NULL,
  `madvt` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `macongdoan` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `ngaybd` date NOT NULL,
  `ngaykt` date NOT NULL,
  PRIMARY KEY (`maqlvt`),
  KEY `manongho` (`manongho`),
  KEY `mavt` (`mavt`),
  KEY `mathua` (`mathua`),
  KEY `malo` (`malo`),
  KEY `manhomctrong` (`manhomctrong`),
  KEY `macaytrong` (`macaytrong`),
  KEY `madvt` (`madvt`),
  KEY `macongdoan` (`macongdoan`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `qlvt`
--

INSERT INTO `qlvt` (`maqlvt`, `manongho`, `mavt`, `mathua`, `malo`, `manhomctrong`, `macaytrong`, `soluong`, `madvt`, `macongdoan`, `ngaybd`, `ngaykt`) VALUES
('ql-02', 'nh02', 'CT-65', 'CT-T65', 'CT-L65', 'LuongThuc', 'Lua-Gao', 20, 'Cay', 'phunthuoc', '2021-01-10', '2021-03-30'),
('ql-01', 'nh01', 'BT-71', 'BT-T71', 'BT-L71', 'CAQ', 'SauRieng', 100, 'Cay', 'xuonggiong', '2022-05-02', '2022-05-30'),
('ql-03', 'nh03', 'HG-95', 'HG-T95', 'HG-L95', 'CNN', 'Mia', 500, 'Cay', 'tuoinuoc', '2022-05-09', '2022-05-23'),
('ql-04', 'nh04', 'LC-24', 'LC-T24', 'LC-L24', 'CLN', 'CaPhe', 700, 'Cay', 'lamdat', '2021-09-13', '2021-12-30'),
('ql-05', 'nh05', 'LD-49', 'LD-T49', 'LD-L49', 'CLN', 'CaPhe', 700, 'Cay', 'bonphan', '2022-05-05', '2022-05-31');

-- --------------------------------------------------------

--
-- Table structure for table `thua`
--

DROP TABLE IF EXISTS `thua`;
CREATE TABLE IF NOT EXISTS `thua` (
  `mathua` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `tenthua` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dientichthua` float NOT NULL,
  `mavt` char(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`mathua`),
  KEY `mavt` (`mavt`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `thua`
--

INSERT INTO `thua` (`mathua`, `tenthua`, `dientichthua`, `mavt`) VALUES
('CT-T65', 'Thửa CT-65', 56.908, 'CT-65'),
('HG-T95', 'Thửa HG-95', 95.656, 'HG-95'),
('LC-T24', 'Thửa LC-24', 24.987, 'LC-24'),
('LD-T49', 'Thửa LD-49', 49.678, 'LD-49'),
('BT-T71', 'Thửa BT-71', 71.171, 'BT-71');

-- --------------------------------------------------------

--
-- Table structure for table `vungtrong`
--

DROP TABLE IF EXISTS `vungtrong`;
CREATE TABLE IF NOT EXISTS `vungtrong` (
  `mavt` char(10) COLLATE utf8_unicode_ci NOT NULL,
  `tenvt` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `dientichvt` float NOT NULL,
  `tinhtp` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`mavt`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `vungtrong`
--

INSERT INTO `vungtrong` (`mavt`, `tenvt`, `dientichvt`, `tinhtp`) VALUES
('HG-95', 'Hậu Giang', 95.953, 'Hậu Giang'),
('LC-24', 'Lào Cai', 59.909, 'Lào Cai'),
('CT-65', 'Cần Thơ', 65.656, 'Cần Thơ'),
('LD-49', 'Lâm Đồng', 49.029, 'Lâm Đồng'),
('BT-71', 'Bến Tre', 71.716, 'Bến Tre');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
