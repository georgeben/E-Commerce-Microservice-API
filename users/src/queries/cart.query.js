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
        cart.*, products.name as product_name, products.price as product_price
    FROM 
        cart
    INNER JOIN
        products
    ON
        cart.product_id = products.id
    WHERE user_id = $1
  `,
  removeItemFromCart: `
    DELETE FROM
        cart
    WHERE
        user_id = $1
    AND
        id = $2
  `,
};
