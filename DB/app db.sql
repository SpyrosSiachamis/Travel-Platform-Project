-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: May 25, 2026 at 08:48 PM
-- Server version: 8.0.46
-- PHP Version: 8.3.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `address_id` int NOT NULL,
  `city` varchar(80) NOT NULL,
  `street` varchar(120) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`address_id`, `city`, `street`, `number`, `postal_code`) VALUES
(1, 'Heraklion', 'Knossos Avenue', '1', '71409'),
(2, 'Heraklion', 'City Center', '10', '71202'),
(3, 'Heraklion', 'Market Street', '5', '71201');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `event_id` int NOT NULL,
  `trip_creator_id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `event_date` date NOT NULL,
  `event_time` time NOT NULL DEFAULT '10:00:00',
  `type` varchar(80) NOT NULL,
  `status` enum('current','upcoming','completed') NOT NULL DEFAULT 'upcoming',
  `max_participants` int NOT NULL,
  `price` decimal(8,2) DEFAULT '0.00',
  `description` text,
  `schedule` text,
  `address_id` int DEFAULT NULL,
  `rating` decimal(3,2) DEFAULT '0.00',
  `preview_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `trip_creator_id`, `title`, `event_date`, `event_time`, `type`, `status`, `max_participants`, `price`, `description`, `schedule`, `address_id`, `rating`, `preview_image`, `created_at`) VALUES
(1, 1, 'Heraklion, Knossos Tour', '2026-06-20', '10:00:00', 'Cultural tour', 'upcoming', 50, 135.00, 'A guided tour at the Palace of Knossos and the surrounding historical area.', '10:00 Arrival, 10:30 Guided tour, 12:30 Free time, 13:00 End of tour.', 1, 4.80, '/images/knossos.jpg', '2026-05-19 08:55:18'),
(2, 1, 'Guided Day Tour in Heraklion', '2026-06-22', '09:00:00', 'City tour', 'upcoming', 40, 25.00, 'A guided day tour in Heraklion with visits to important local landmarks.', '09:00 Meeting point, 09:30 Walking tour, 12:00 Museum area, 14:00 End.', 2, 4.50, '/images/heraklion.jpg', '2026-05-19 08:55:18'),
(3, 1, 'Knossos Palace and Historical Heraklion City Tour', '2026-06-25', '11:00:00', 'Historical tour', 'upcoming', 35, 55.00, 'A combined tour of Knossos Palace and historical parts of Heraklion.', '11:00 Start, 12:00 Knossos tour, 15:00 Heraklion old city, 17:00 End.', 1, 4.70, '/images/oldcity.jpg', '2026-05-19 08:55:18'),
(4, 3, 'Greek Food Walking Tour in Heraklion', '2026-06-27', '18:00:00', 'Food tour', 'upcoming', 25, 10.00, 'A short walking food tour through Heraklion, including local products and traditional tastes.', '18:00 Meeting point, 18:30 Market visit, 19:30 Tasting, 20:30 End.', 3, 4.90, '/images/foodtour.jpg', '2026-05-19 08:55:18'),
(8, 1, 'test1', '2026-05-28', '10:00:00', 'Other', 'upcoming', 10, 0.00, 'test description', '10am start', 1, 0.00, '/images/hike-preview.jpg', '2026-05-24 22:29:28'),
(9, 1, 'test2', '2026-05-29', '10:00:00', 'Nature', 'upcoming', 10, 10.00, 'test2 description', '8am leave', 1, 0.00, '/images/hike-preview.jpg', '2026-05-24 22:46:31');

-- --------------------------------------------------------

--
-- Table structure for table `event_content`
--

CREATE TABLE `event_content` (
  `content_id` int NOT NULL,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `title` varchar(150) NOT NULL,
  `content_type` enum('photo','highlight','video') NOT NULL,
  `text_description` text,
  `approval_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `approved_by` int DEFAULT NULL,
  `approval_date` datetime DEFAULT NULL,
  `scheduled_time` datetime DEFAULT NULL,
  `publish_moment` enum('before','during','after') DEFAULT 'before',
  `view_count` int DEFAULT '0',
  `favourite_count` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event_content`
--

INSERT INTO `event_content` (`content_id`, `user_id`, `event_id`, `title`, `content_type`, `text_description`, `approval_status`, `approved_by`, `approval_date`, `scheduled_time`, `publish_moment`, `view_count`, `favourite_count`, `created_at`) VALUES
(1, 1, 1, 'Knossos preview photo', 'photo', 'Preview image for the Knossos tour.', 'approved', 1, '2026-05-19 08:55:18', '2026-06-19 12:00:00', 'before', 120, 15, '2026-05-19 08:55:18'),
(2, 1, 1, 'Knossos introduction video', 'video', 'A short introduction video for the Knossos tour.', 'approved', 1, '2026-05-19 08:55:18', '2026-06-19 18:00:00', 'before', 80, 8, '2026-05-19 08:55:18'),
(3, 3, 4, 'Food tour market highlight', 'highlight', 'A highlight from the local market food tour.', 'approved', 3, '2026-05-19 08:55:18', '2026-06-27 20:00:00', 'during', 95, 12, '2026-05-19 08:55:18');

-- --------------------------------------------------------

--
-- Table structure for table `event_keywords`
--

CREATE TABLE `event_keywords` (
  `event_id` int NOT NULL,
  `keyword_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event_keywords`
--

INSERT INTO `event_keywords` (`event_id`, `keyword_id`) VALUES
(1, 1),
(2, 1),
(1, 2),
(3, 2),
(4, 3),
(4, 4),
(1, 5),
(3, 5),
(2, 6),
(3, 6),
(4, 6);

-- --------------------------------------------------------

--
-- Table structure for table `event_statistics`
--

CREATE TABLE `event_statistics` (
  `statistics_id` int NOT NULL,
  `event_id` int NOT NULL,
  `content_id` int DEFAULT NULL,
  `view_count` int DEFAULT '0',
  `participation_count` int DEFAULT '0',
  `favourite_count` int DEFAULT '0',
  `interaction_count` int DEFAULT '0',
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `event_statistics`
--

INSERT INTO `event_statistics` (`statistics_id`, `event_id`, `content_id`, `view_count`, `participation_count`, `favourite_count`, `interaction_count`, `updated_at`) VALUES
(1, 1, NULL, 250, 1, 1, 30, '2026-05-19 08:55:18'),
(2, 2, NULL, 100, 0, 0, 10, '2026-05-19 08:55:18'),
(3, 3, NULL, 140, 0, 0, 15, '2026-05-19 08:55:18'),
(4, 4, NULL, 300, 0, 1, 40, '2026-05-19 08:55:18');

-- --------------------------------------------------------

--
-- Table structure for table `excursionists`
--

CREATE TABLE `excursionists` (
  `user_id` int NOT NULL,
  `preferences` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `excursionists`
--

INSERT INTO `excursionists` (`user_id`, `preferences`) VALUES
(2, 'culture, food, history');

-- --------------------------------------------------------

--
-- Table structure for table `favourites`
--

CREATE TABLE `favourites` (
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `date_added` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `favourites`
--

INSERT INTO `favourites` (`user_id`, `event_id`, `date_added`) VALUES
(2, 1, '2026-05-19 08:55:18'),
(2, 4, '2026-05-19 08:55:18');

-- --------------------------------------------------------

--
-- Table structure for table `highlights`
--

CREATE TABLE `highlights` (
  `content_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `highlights`
--

INSERT INTO `highlights` (`content_id`) VALUES
(3);

-- --------------------------------------------------------

--
-- Table structure for table `keywords`
--

CREATE TABLE `keywords` (
  `keyword_id` int NOT NULL,
  `tag` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `keywords`
--

INSERT INTO `keywords` (`keyword_id`, `tag`) VALUES
(1, 'culture'),
(3, 'food'),
(6, 'heraklion'),
(2, 'history'),
(5, 'knossos'),
(4, 'walking');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notif_id` int NOT NULL,
  `user_id` int NOT NULL,
  `event_id` int DEFAULT NULL,
  `type` enum('upcoming','recommendation','system') NOT NULL,
  `time_sent` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint(1) DEFAULT '0',
  `text` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notif_id`, `user_id`, `event_id`, `type`, `time_sent`, `is_read`, `text`) VALUES
(1, 2, 1, 'upcoming', '2026-05-19 08:55:18', 0, 'Your Knossos tour is coming soon.'),
(2, 2, 4, 'recommendation', '2026-05-19 08:55:18', 0, 'You may be interested in the Greek Food Walking Tour.');

-- --------------------------------------------------------

--
-- Table structure for table `participations`
--

CREATE TABLE `participations` (
  `participation_id` int NOT NULL,
  `user_id` int NOT NULL,
  `event_id` int NOT NULL,
  `payment_price` decimal(8,2) DEFAULT '0.00',
  `participation_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `participations`
--

INSERT INTO `participations` (`participation_id`, `user_id`, `event_id`, `payment_price`, `participation_date`, `rating`) VALUES
(1, 2, 1, 135.00, '2026-05-19 08:55:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `content_id` int NOT NULL,
  `photo_url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`content_id`, `photo_url`) VALUES
(1, '/images/knossos.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `trip_creators`
--

CREATE TABLE `trip_creators` (
  `user_id` int NOT NULL,
  `organization` varchar(120) DEFAULT NULL,
  `bio` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `trip_creators`
--

INSERT INTO `trip_creators` (`user_id`, `organization`, `bio`) VALUES
(1, 'Municipality Culture Department', 'Creates cultural excursions in Crete.'),
(3, 'Local Tour Organizer', 'Organizes food and walking tours.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(80) NOT NULL,
  `last_name` varchar(80) NOT NULL,
  `email` varchar(120) NOT NULL,
  `role` enum('excursionist','trip_creator') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `first_name`, `last_name`, `email`, `role`, `created_at`) VALUES
(1, 'creator1', '1234', 'Nikos', 'Papadakis', 'creator1@example.com', 'trip_creator', '2026-05-19 08:55:18'),
(2, 'user1', '1234', 'Maria', 'Georgiou', 'user1@example.com', 'excursionist', '2026-05-19 08:55:18'),
(3, 'creator2', '1234', 'Eleni', 'Markaki', 'creator2@example.com', 'trip_creator', '2026-05-19 08:55:18');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `content_id` int NOT NULL,
  `video_link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`content_id`, `video_link`) VALUES
(2, 'https://example.com/knossos-video');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`address_id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `trip_creator_id` (`trip_creator_id`),
  ADD KEY `address_id` (`address_id`);

--
-- Indexes for table `event_content`
--
ALTER TABLE `event_content`
  ADD PRIMARY KEY (`content_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `approved_by` (`approved_by`);

--
-- Indexes for table `event_keywords`
--
ALTER TABLE `event_keywords`
  ADD PRIMARY KEY (`event_id`,`keyword_id`),
  ADD KEY `keyword_id` (`keyword_id`);

--
-- Indexes for table `event_statistics`
--
ALTER TABLE `event_statistics`
  ADD PRIMARY KEY (`statistics_id`),
  ADD KEY `event_id` (`event_id`),
  ADD KEY `content_id` (`content_id`);

--
-- Indexes for table `excursionists`
--
ALTER TABLE `excursionists`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`user_id`,`event_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `highlights`
--
ALTER TABLE `highlights`
  ADD PRIMARY KEY (`content_id`);

--
-- Indexes for table `keywords`
--
ALTER TABLE `keywords`
  ADD PRIMARY KEY (`keyword_id`),
  ADD UNIQUE KEY `tag` (`tag`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notif_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `participations`
--
ALTER TABLE `participations`
  ADD PRIMARY KEY (`participation_id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`event_id`),
  ADD KEY `event_id` (`event_id`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`content_id`);

--
-- Indexes for table `trip_creators`
--
ALTER TABLE `trip_creators`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`content_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `address_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `event_content`
--
ALTER TABLE `event_content`
  MODIFY `content_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `event_statistics`
--
ALTER TABLE `event_statistics`
  MODIFY `statistics_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `keywords`
--
ALTER TABLE `keywords`
  MODIFY `keyword_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notif_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `participations`
--
ALTER TABLE `participations`
  MODIFY `participation_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`trip_creator_id`) REFERENCES `trip_creators` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `events_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `addresses` (`address_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `event_content`
--
ALTER TABLE `event_content`
  ADD CONSTRAINT `event_content_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_content_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_content_ibfk_3` FOREIGN KEY (`approved_by`) REFERENCES `trip_creators` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `event_keywords`
--
ALTER TABLE `event_keywords`
  ADD CONSTRAINT `event_keywords_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_keywords_ibfk_2` FOREIGN KEY (`keyword_id`) REFERENCES `keywords` (`keyword_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `event_statistics`
--
ALTER TABLE `event_statistics`
  ADD CONSTRAINT `event_statistics_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `event_statistics_ibfk_2` FOREIGN KEY (`content_id`) REFERENCES `event_content` (`content_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `excursionists`
--
ALTER TABLE `excursionists`
  ADD CONSTRAINT `excursionists_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `favourites`
--
ALTER TABLE `favourites`
  ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `excursionists` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `highlights`
--
ALTER TABLE `highlights`
  ADD CONSTRAINT `highlights_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `event_content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `participations`
--
ALTER TABLE `participations`
  ADD CONSTRAINT `participations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `excursionists` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participations_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `event_content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `trip_creators`
--
ALTER TABLE `trip_creators`
  ADD CONSTRAINT `trip_creators_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`content_id`) REFERENCES `event_content` (`content_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
