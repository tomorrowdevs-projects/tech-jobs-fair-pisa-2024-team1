-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versione server:              10.4.32-MariaDB - mariadb.org binary distribution
-- S.O. server:                  Win64
-- HeidiSQL Versione:            12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dump della struttura di tabella laraveltest.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.cache: ~0 rows (circa)

-- Dump della struttura di tabella laraveltest.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.cache_locks: ~0 rows (circa)

-- Dump della struttura di tabella laraveltest.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.failed_jobs: ~0 rows (circa)

-- Dump della struttura di tabella laraveltest.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.jobs: ~0 rows (circa)

-- Dump della struttura di tabella laraveltest.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.job_batches: ~0 rows (circa)

-- Dump della struttura di tabella laraveltest.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.migrations: ~5 rows (circa)
INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(19, '0001_01_01_000000_create_users_table', 1),
	(20, '0001_01_01_000001_create_cache_table', 1),
	(21, '0001_01_01_000002_create_jobs_table', 1),
	(22, '2024_10_21_080336_create_trees_table', 1),
	(23, '2024_10_21_102516_create_personal_access_tokens_table', 1);

-- Dump della struttura di tabella laraveltest.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.password_reset_tokens: ~0 rows (circa)

-- Dump della struttura di tabella laraveltest.personal_access_tokens
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.personal_access_tokens: ~0 rows (circa)

-- Dump della struttura di tabella laraveltest.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.sessions: ~0 rows (circa)

-- Dump della struttura di tabella laraveltest.trees
CREATE TABLE IF NOT EXISTS `trees` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tipo` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `latitudine` decimal(10,8) NOT NULL,
  `longitudine` decimal(10,8) NOT NULL,
  `stato` varchar(255) NOT NULL,
  `ultima_segnalazione` date NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.trees: ~53 rows (circa)
INSERT INTO `trees` (`id`, `tipo`, `nome`, `latitudine`, `longitudine`, `stato`, `ultima_segnalazione`, `updated_at`, `created_at`) VALUES
	(1, 'Albero', 'Quercia', 45.46540000, 9.18660000, 'Buono', '2023-08-12', NULL, NULL),
	(2, 'Albero', 'Pino', 45.46650000, 9.18710000, 'Malato', '2023-09-05', NULL, NULL),
	(3, 'Parco', 'Parco Centrale', 45.46480000, 9.18500000, 'Buono', '0000-00-00', NULL, NULL),
	(4, 'Albero', 'Cedro', 45.46770000, 9.18880000, 'Ramo Rotto', '2023-09-20', NULL, NULL),
	(5, 'Giardino', 'Giardino Fiorito', 45.46390000, 9.18450000, 'Buono', '0000-00-00', NULL, NULL),
	(6, 'Albero', 'Olmo', 45.46850000, 9.18390000, 'Buono', '2023-10-01', NULL, NULL),
	(7, 'Parco', 'Parco Est', 45.46210000, 9.18220000, 'Buono', '0000-00-00', NULL, NULL),
	(8, 'Albero', 'Cipresso', 45.46620000, 9.18150000, 'Malato', '2023-10-10', NULL, NULL),
	(9, 'Giardino', 'Giardino dei Sensi', 45.46150000, 9.18090000, 'Ramo Rotto', '2023-10-11', NULL, NULL),
	(10, 'Albero', 'Platano', 45.46990000, 9.17990000, 'Buono', '0000-00-00', NULL, NULL),
	(11, 'Albero', 'Acero', 45.47000000, 9.17000000, 'Buono', '2023-08-15', NULL, NULL),
	(12, 'Parco', 'Parco Sud', 45.47100000, 9.17100000, 'Malato', '2023-09-01', NULL, NULL),
	(13, 'Giardino', 'Giardino delle Rose', 45.47200000, 9.17200000, 'Ramo Rotto', '0000-00-00', NULL, NULL),
	(14, 'Albero', 'Salice', 45.47300000, 9.17300000, 'Buono', '2023-09-10', NULL, NULL),
	(15, 'Parco', 'Parco Ovest', 45.47400000, 9.17400000, 'Buono', '0000-00-00', NULL, NULL),
	(16, 'Albero', 'Faggio', 45.47500000, 9.17500000, 'Buono', '2023-08-15', NULL, NULL),
	(17, 'Parco', 'Parco delle Rimembranze', 45.47600000, 9.17600000, 'Malato', '2023-09-01', NULL, NULL),
	(18, 'Giardino', 'Giardino della Luce', 45.47700000, 9.17700000, 'Ramo Rotto', '0000-00-00', NULL, NULL),
	(19, 'Albero', 'Tiglio', 45.47800000, 9.17800000, 'Buono', '2023-09-10', NULL, NULL),
	(20, 'Parco', 'Parco Nord', 45.47900000, 9.17900000, 'Buono', '0000-00-00', NULL, NULL),
	(21, 'Albero', 'Ciliegio', 45.48000000, 9.18000000, 'Buono', '2023-08-15', NULL, NULL),
	(22, 'Parco', 'Parco del Sole', 45.48100000, 9.18100000, 'Malato', '2023-09-01', NULL, NULL),
	(23, 'Giardino', 'Giardino delle Stelle', 45.48200000, 9.18200000, 'Ramo Rotto', '0000-00-00', NULL, NULL),
	(24, 'Albero', 'Olivo', 45.48300000, 9.18300000, 'Buono', '2023-09-10', NULL, NULL),
	(25, 'Parco', 'Parco Aurora', 45.48400000, 9.18400000, 'Buono', '0000-00-00', NULL, NULL),
	(26, 'Albero', 'Noce', 45.48500000, 9.18500000, 'Buono', '2023-08-15', NULL, NULL),
	(27, 'Parco', 'Parco degli Angeli', 45.48600000, 9.18600000, 'Malato', '2023-09-01', NULL, NULL),
	(28, 'Giardino', 'Giardino della Luna', 45.48700000, 9.18700000, 'Ramo Rotto', '0000-00-00', NULL, NULL),
	(29, 'Albero', 'Castagno', 45.48800000, 9.18800000, 'Buono', '2023-09-10', NULL, NULL),
	(30, 'Parco', 'Parco dei Ciliegi', 45.48900000, 9.18900000, 'Buono', '0000-00-00', NULL, NULL),
	(31, 'Albero', 'Frassino', 45.49000000, 9.19000000, 'Buono', '2023-08-15', NULL, NULL),
	(32, 'Parco', 'Parco delle Querce', 45.49100000, 9.19100000, 'Malato', '2023-09-01', NULL, NULL),
	(33, 'Giardino', 'Giardino di Venere', 45.49200000, 9.19200000, 'Ramo Rotto', '0000-00-00', NULL, NULL),
	(34, 'Albero', 'Pioppo', 45.49300000, 9.19300000, 'Buono', '2023-09-10', NULL, NULL),
	(35, 'Parco', 'Parco del Cedro', 45.49400000, 9.19400000, 'Buono', '0000-00-00', NULL, NULL),
	(36, 'Albero', 'Leccio', 45.49500000, 9.19500000, 'Buono', '2023-08-15', NULL, NULL),
	(37, 'Parco', 'Parco del Tiglio', 45.49600000, 9.19600000, 'Malato', '2023-09-01', NULL, NULL),
	(38, 'Giardino', 'Giardino della Pace', 45.49700000, 9.19700000, 'Ramo Rotto', '0000-00-00', NULL, NULL),
	(39, 'Albero', 'Betulla', 45.49800000, 9.19800000, 'Buono', '2023-09-10', NULL, NULL),
	(40, 'Parco', 'Parco della Quiete', 45.49900000, 9.19900000, 'Buono', '0000-00-00', NULL, NULL),
	(41, 'Albero', 'Acero Rosso', 45.50000000, 9.20000000, 'Buono', '2023-08-15', NULL, NULL),
	(42, 'Parco', 'Parco delle Camelie', 45.50100000, 9.20100000, 'Malato', '2023-09-01', NULL, NULL),
	(43, 'Giardino', 'Giardino delle Ninfee', 45.50200000, 9.20200000, 'Ramo Rotto', '0000-00-00', NULL, NULL),
	(44, 'Albero', 'Gelso', 45.50300000, 9.20300000, 'Buono', '2023-09-10', NULL, NULL),
	(45, 'Parco', 'Parco delle Ginestre', 45.50400000, 9.20400000, 'Buono', '0000-00-00', NULL, NULL),
	(46, 'Albero', 'Magnolia', 45.50500000, 9.20500000, 'Buono', '2023-08-15', NULL, NULL),
	(47, 'Parco', 'Parco della Rovere', 45.50600000, 9.20600000, 'Malato', '2023-09-01', NULL, NULL),
	(48, 'Giardino', 'Giardino della Felicità', 45.50700000, 9.20700000, 'Ramo Rotto', '0000-00-00', NULL, NULL),
	(49, 'Albero', 'Abete', 45.50800000, 9.20800000, 'Buono', '2023-09-10', NULL, NULL),
	(50, 'Parco', 'Parco Nord', 45.50900000, 9.20900000, 'Buono', '0000-00-00', NULL, NULL),
	(52, 'Parco test2', 'Parco d\'arco di trionfo nuovo', 45.66600000, 43.33300000, 'rami spezzati', '2024-10-21', '2024-10-21 10:39:02', '2024-10-21 10:39:02'),
	(53, 'Parco test2', 'Parco d\'arco di trionfo nuovo', 45.66600000, 43.33300000, 'rami spezzati', '2024-10-20', '2024-10-21 10:41:32', '2024-10-21 10:41:32'),
	(54, 'Parco nuovo', 'Parco prova nuova insert', 45.66600000, 43.33300000, 'ottimo', '2024-10-20', '2024-10-21 13:05:39', '2024-10-21 13:05:39');

-- Dump della struttura di tabella laraveltest.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dump dei dati della tabella laraveltest.users: ~1 rows (circa)
INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
	(1, 'Test User', 'test@example.com', '2024-10-21 13:25:05', '$2y$12$Fx.XSXv6gYO3rxRhc1nDbeFp.g94/k5RZJoBmPeofm7Axzlm/r0t.', 'UqoUeeIYNu', '2024-10-21 13:25:05', '2024-10-21 13:25:05');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
