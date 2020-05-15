/* Replace with your SQL commands */
INSERT INTO product_categories (name, thumbnail)
VALUES ('Electronics', 'https://cdn.mos.cms.futurecdn.net/A4GDK27VMnz6LtFDy9yzk.jpg');

INSERT INTO product_categories (name, thumbnail)
VALUES ('Male Clothing', 'https://ng.jumia.is/cms/00_MobileHomepage/clothing-men.png');

INSERT INTO product_categories (name, thumbnail)
VALUES ('Housing', 'https://media.architecturaldigest.com/photos/5e1390eb757dbd0008847bf7/16:9/w_2560%2Cc_limit/GettyImages-1171911666.jpg');

INSERT INTO product_categories (name, thumbnail)
VALUES ('Jewelry', 'https://ng.jumia.is/unsafe/fit-in/300x300/filters:fill(white)/product/69/153123/1.jpg?7634');

INSERT INTO product_categories (name, thumbnail)
VALUES ('Cosmetics', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/beauty-decorative-cosmetics-makeup-brushes-set-and-royalty-free-image-930934354-1565213062.jpg');

INSERT INTO products (name, details, category_id, price, amount_in_stock, image_url)
VALUES ('Logitech H340 Usb Computer Internet Headset', 'VERSATILE DIGITAL AUDIO FOR EVERYDAY TASKS
The perfect everyday headset with a simple plug-and-play USB-A connection.', (SELECT id FROM product_categories WHERE name='Electronics'), 7000, 10, 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/77/221754/1.jpg?8464');

INSERT INTO products (name, details, category_id, price, amount_in_stock, image_url)
VALUES ('Canon Canon- Photoprinter', 'Fast, easy lab quality photo printing – anytime, anywhere, anyone. Get instant lab quality prints anytime', (SELECT id FROM product_categories WHERE name='Electronics'), 15000, 5, 'https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/91/432054/1.jpg?4146');

INSERT INTO products (name, details, category_id, price, amount_in_stock, image_url)
VALUES ('Male Fashion Skateboard Running Shoes', 'Swaggy Sports Shoe Lightweight Athletic Lace Up Fashion Sneakers Unique design', (SELECT id FROM product_categories WHERE name='Male Clothing'), 4000, 20, 'https://i.picsum.photos/id/364/200/300.jpg');

INSERT INTO products (name, details, category_id, price, amount_in_stock, image_url)
VALUES ('Century Century Electric Oven', 'The Century 20L Electric Oven COV 8320A features a 4 durable stainless steel heating element for fine heating, baking, toasting and grilling', (SELECT id FROM product_categories WHERE name='Furniture'), 12000, 5, 'https://i.picsum.photos/id/664/200/300.jpg');

