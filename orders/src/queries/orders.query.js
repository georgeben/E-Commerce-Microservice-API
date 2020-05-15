module.exports = {
  createOrder: `
    INSERT INTO
    orders(
      user_id,
      amount,
      shipping_address,
      order_status
    ) VALUES ($1, $2, $3, $4)
    RETURNING id
  `,
  createShippingAddress: `
      INSERT INTO
      shipping_address(
        address,
        city,
        state,
        country,
        zipcode
      ) VALUES ($1, $2, $3, $4, $5)
      RETURNING id
  `,
  createOrderItem: `
      INSERT INTO 
      order_items(
        order_id,
        product_id,
        quantity,
        sub_total
      ) VALUES ($1, $2, $3, $4)
  `,
};
