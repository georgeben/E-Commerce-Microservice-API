module.exports = {
  addToCart: `
    INSERT INTO
    cart(
      user_id,
      save_for_later,
      product_id,
      quantity,
      amount
    ) VALUES ($1, $2, $3, $4, $5)
  `,
  getUserCart: `
    SELECT
        *
    FROM 
        cart
    INNER JOIN
        products
    ON
        cart.product_id = products.id
    WHERE user_id = $1
  `,
};
