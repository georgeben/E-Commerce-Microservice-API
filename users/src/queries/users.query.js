module.exports = {
  getUserById: `
    SELECT
        *
    FROM 
        users
    WHERE
        users.id = $1
  `,
  getUserByEmail: `
    SELECT
        users.*, shipping_address.address, shipping_address.city,
        shipping_address.state, shipping_address.country,
        shipping_address.zipcode
    FROM 
        users
    LEFT JOIN
        shipping_address
    ON
        users.defeault_shipping_address = shipping_address.id
    WHERE
        users.email = $1
  `,
  createUser: `
    INSERT INTO
    users(
      first_name,
      last_name,
      email,
      password,
      phone_no
    ) VALUES ($1, $2, $3, $4, $5)
    RETURNING first_name, last_name, email, phone_no;
  `,
};
