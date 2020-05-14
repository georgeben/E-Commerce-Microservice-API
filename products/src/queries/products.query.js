module.exports = {
  getAllProducts: `
    SELECT 
        products.*, product_categories.name
    FROM 
        products
    INNER JOIN
        product_categories
    ON
        products.category_id = product_categories.id
  `,
  getProductById: `
    SELECT 
          products.*, product_categories.name
      FROM 
          products
      INNER JOIN
          product_categories
      ON
          products.category_id = product_categories.id
      WHERE
          products.id = $1
  `,
  createProduct: `
    INSERT INTO
    products(
      name,
      details,
      category_id, 
      price,
      amount_in_stock,
      image_url
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `,
};
