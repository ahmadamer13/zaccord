---
description: Add a new blog post
---
To add a new blog post, follow these steps:

1. Create the HTML content file in `src/blogContent/`.
   - Filename format: `your_blog_title_lang.html` (e.g., `my_blog_en.html` or `my_blog_ar.html`).
   - Content should be the HTML body of the article (without `<html>`, `<head>`, `<body>` tags).

2. Prepare the blog image.
   - Place the image in `src/blogContent/images/` or `src/images/blog/`.

3. Insert the blog into the database.
   - You can use a SQL command or a Node.js script.
   - Example SQL:
     ```sql
     INSERT INTO blog (title, author, categories, content_path, summary, img_url, last_update, date) VALUES
     ('Your Blog Title', 'Author Name', 'Category1, Category2', 'your_blog_title_lang', 'Short summary...', 'image.jpg', NOW(), NOW());
     ```
   - Note the `id` generated.

4. Add translations (Optional but recommended).
   - If you added an English blog:
     - Add Arabic translation to `src/js/includes/blogTranslationsAr.js` using the generated `id`.
   - If you added an Arabic blog:
     - Add English translation to `src/js/includes/blogTranslations.js` using the generated `id`.

5. Restart the server to see changes.
