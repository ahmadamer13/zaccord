// Script to insert new SEO blog posts into the database
const conn = require('./src/js/connectDb.js');

const blogs = [
    {
        id: 53,
        title: 'How to Prepare Your STL File for Perfect 3D Printing Results in Jordan',
        author: 'Jordan 3D Print Team',
        categories: '3D Printing,Tutorial,STL,Guide,Jordan',
        content_path: 'how_to_prepare_stl_file_3d_printing',
        summary: 'Complete guide to preparing STL files for 3D printing in Jordan. Learn about file optimization, wall thickness, supports, and export settings for FDM and SLA printing to save time and money.',
        img_url: 'fdm_printer.jpg'
    },
    {
        id: 54,
        title: '3D Printing Materials Guide: PLA vs PETG vs ABS vs Resin Explained',
        author: 'Jordan 3D Print Team',
        categories: '3D Printing,Materials,Guide,Comparison',
        content_path: 'pla_vs_petg_vs_abs_vs_resin_comparison',
        summary: 'Complete comparison of 3D printing materials in Jordan. Learn which material to choose: PLA, PETG, ABS, or Resin for your project. Includes strength, cost, and application guide with Jordan-specific considerations.',
        img_url: 'additiv.jpg'
    },
    {
        id: 55,
        title: 'Top 20 3D Printing Ideas for Home & Business in Jordan (2025)',
        author: 'Jordan 3D Print Team',
        categories: '3D Printing,Ideas,Business,Projects,Jordan',
        content_path: 'top_20_3d_printing_ideas_jordan',
        summary: 'Discover practical 3D printing project ideas for home and business in Jordan. From custom phone cases to business prototypes, learn what you can create with 3D printing and turn ideas into profitable ventures.',
        img_url: 'proto_bor.jpg'
    }
];

console.log('Inserting new SEO blog posts...\n');

blogs.forEach((blog, index) => {
    const sql = `INSERT INTO blog (id, title, author, categories, content_path, summary, img_url, last_update, date) 
               VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`;

    const values = [
        blog.id,
        blog.title,
        blog.author,
        blog.categories,
        blog.content_path,
        blog.summary,
        blog.img_url
    ];

    conn.query(sql, values, (err, result) => {
        if (err) {
            console.error(`❌ Error inserting blog ${blog.id}:`, err.message);
        } else {
            console.log(`✅ Successfully inserted: "${blog.title}"`);
        }

        // Close connection after last insert
        if (index === blogs.length - 1) {
            setTimeout(() => {
                console.log('\n✨ All blog posts inserted successfully!');
                console.log('\n📝 You can now view them at:');
                console.log('   http://localhost:5000/blog?id=53');
                console.log('   http://localhost:5000/blog?id=54');
                console.log('   http://localhost:5000/blog?id=55');
                console.log('\n📚 Or see all blogs at: http://localhost:5000/blogs\n');
                process.exit(0);
            }, 500);
        }
    });
});
