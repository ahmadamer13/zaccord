const mysql = require('mysql2');
const connContsts = require('./src/js/includes/connConstants.js');

const connection = mysql.createConnection({
    host: connContsts.host,
    user: connContsts.user,
    password: connContsts.password,
    database: connContsts.database
});

const sql = `
INSERT INTO blog (id, title, author, categories, content_path, summary, img_url, last_update, date) VALUES
(50, 'ما هو الفرق بين PLA و ABS؟', 'Jordan 3D Print Team', '3D Printing,Materials,Guide,Arabic', 'difference_pla_abs_ar', 'تعرف على الفرق بين مادتي PLA و ABS في الطباعة ثلاثية الأبعاد، مميزات وعيوب كل منهما، ومتى تستخدم كل مادة لمشروعك.', 'pla_vs_abs.jpg', NOW(), NOW()),
(51, 'كيف تختار خامة الطباعة المناسبة؟', 'Jordan 3D Print Team', '3D Printing,Materials,Tips,Arabic', 'choosing_right_material_ar', 'دليل شامل لاختيار خامة الطباعة ثلاثية الأبعاد المناسبة لمشروعك، مع شرح لخصائص PLA, ABS, PETG, TPU, Resin.', 'materials_guide.jpg', NOW(), NOW()),
(52, 'استخدامات الطباعة ثلاثية الأبعاد في مشاريع التخرج', 'Jordan 3D Print Team', '3D Printing,Education,Graduation Projects,Arabic', 'graduation_projects_3d_printing_ar', 'اكتشف كيف تساعد الطباعة ثلاثية الأبعاد طلاب الهندسة والعمارة في إنجاز مشاريع تخرج متميزة ونماذج أولية دقيقة.', 'grad_project.jpg', NOW(), NOW());
`;

connection.query(sql, (err, results) => {
    if (err) {
        console.error('Error inserting blogs:', err);
    } else {
        console.log('Blogs inserted successfully:', results);
    }
    connection.end();
});
