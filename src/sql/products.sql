CREATE Table products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(36),
    price VARCHAR(48),
    image TEXT,
    category_id SERIAL
);

INSERT INTO products (name, price, image, category_id) VALUES ('Cola', '150$', 'image.png', 1);