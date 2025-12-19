CREATE DATABASE IF NOT EXISTS `3d`;
USE `3d`;

-- Create user if not exists
CREATE USER IF NOT EXISTS 'jordan3dprintlocalhost'@'localhost' IDENTIFIED BY 'abc';
CREATE USER IF NOT EXISTS 'jordan3dprintlocalhost'@'127.0.0.1' IDENTIFIED BY 'abc';

GRANT ALL PRIVILEGES ON `3d`.* TO 'jordan3dprintlocalhost'@'localhost';
GRANT ALL PRIVILEGES ON `3d`.* TO 'jordan3dprintlocalhost'@'127.0.0.1';
FLUSH PRIVILEGES;

-- Ensure table exists
CREATE TABLE IF NOT EXISTS `blog` (
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

-- Insert data
INSERT INTO `blog` (`id`, `title`, `author`, `categories`, `content_path`, `summary`, `img_url`, `last_update`, `date`) VALUES
(50, 'ما هو الفرق بين PLA و ABS؟', 'Jordan 3D Print Team', '3D Printing,Materials,Guide,Arabic', 'difference_pla_abs_ar', 'تعرف على الفرق بين مادتي PLA و ABS في الطباعة ثلاثية الأبعاد، مميزات وعيوب كل منهما، ومتى تستخدم كل مادة لمشروعك.', 'pla_vs_abs.jpg', NOW(), NOW()),
(51, 'كيف تختار خامة الطباعة المناسبة؟', 'Jordan 3D Print Team', '3D Printing,Materials,Tips,Arabic', 'choosing_right_material_ar', 'دليل شامل لاختيار خامة الطباعة ثلاثية الأبعاد المناسبة لمشروعك، مع شرح لخصائص PLA, ABS, PETG, TPU, Resin.', 'materials_guide.jpg', NOW(), NOW()),
(52, 'استخدامات الطباعة ثلاثية الأبعاد في مشاريع التخرج', 'Jordan 3D Print Team', '3D Printing,Education,Graduation Projects,Arabic', 'graduation_projects_3d_printing_ar', 'اكتشف كيف تساعد الطباعة ثلاثية الأبعاد طلاب الهندسة والعمارة في إنجاز مشاريع تخرج متميزة ونماذج أولية دقيقة.', 'grad_project.jpg', NOW(), NOW())
ON DUPLICATE KEY UPDATE title=VALUES(title), summary=VALUES(summary), img_url=VALUES(img_url), last_update=NOW();
