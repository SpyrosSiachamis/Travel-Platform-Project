-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 14, 2026 at 02:36 AM
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
-- Database: `hy351-E2`
--

-- --------------------------------------------------------

--
-- Table structure for table `Excursionist`
--

CREATE TABLE `Excursionist` (
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Excursionist`
--

INSERT INTO `Excursionist` (`UserID`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `Trip Creator`
--

CREATE TABLE `Trip Creator` (
  `UserID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Trip Creator`
--

INSERT INTO `Trip Creator` (`UserID`) VALUES
(1);

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `UserID` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(255) NOT NULL COMMENT 'Argon2id Κρυπτογράφηση',
  `fname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`UserID`, `username`, `password`, `fname`, `lname`, `email`) VALUES
(1, 'username1', 'abcsd123', 'John', 'Doe', 'johndoe@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `Εκδήλωση`
--

CREATE TABLE `Εκδήλωση` (
  `eventID` int(10) UNSIGNED NOT NULL,
  `tripCreatorID` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `date` date NOT NULL DEFAULT '1990-01-01',
  `type` enum('Θαλάσσιο','Πόλη','Φύση','Νυχτερινή Ζωή','Άλλο') NOT NULL DEFAULT 'Άλλο',
  `status` enum('Προγραμματισμένη','Τρέχουσα','Ολοκληρωμένη','Ακυρωμένη') NOT NULL DEFAULT 'Προγραμματισμένη',
  `max_participants` smallint(5) UNSIGNED NOT NULL COMMENT 'ADD STATUS TO PARTICIPATION TABLE FOR DEINCREMENTING',
  `participation_count` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `schedule` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `addressID` int(11) NOT NULL COMMENT 'MAKE THIS LATER /  could use an API too, Common addresses will be stored in the DB.',
  `time` time NOT NULL,
  `rating` double UNSIGNED NOT NULL,
  `preview_image` varchar(255) DEFAULT NULL COMMENT 'Holds the URL path of the image from the images folder'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Excursionist`
--
ALTER TABLE `Excursionist`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `Trip Creator`
--
ALTER TABLE `Trip Creator`
  ADD PRIMARY KEY (`UserID`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `Εκδήλωση`
--
ALTER TABLE `Εκδήλωση`
  ADD PRIMARY KEY (`eventID`),
  ADD KEY `Εκδήλωση_Trip_Creator_FK` (`tripCreatorID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Εκδήλωση`
--
ALTER TABLE `Εκδήλωση`
  MODIFY `eventID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Excursionist`
--
ALTER TABLE `Excursionist`
  ADD CONSTRAINT `fk_User` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`);

--
-- Constraints for table `Trip Creator`
--
ALTER TABLE `Trip Creator`
  ADD CONSTRAINT `fk_UserID` FOREIGN KEY (`UserID`) REFERENCES `User` (`UserID`);

--
-- Constraints for table `Εκδήλωση`
--
ALTER TABLE `Εκδήλωση`
  ADD CONSTRAINT `Εκδήλωση_Trip_Creator_FK` FOREIGN KEY (`tripCreatorID`) REFERENCES `Trip Creator` (`UserID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
