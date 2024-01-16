CREATE DATABASE Auth;


CREATE TABLE users(
    user_id uuid PRIMARY KEY DEFAULT
    uuid_generate_v4(),
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);


INSERT INTO users (user_name,user_email,user_password) VALUES ('dinesh','abc@gmail.com','1233');



CREATE TABLE centers (
    center_id SERIAL PRIMARY KEY,
    location VARCHAR(255) UNIQUE NOT NULL,
    street VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    postal_code INT NOT NULL,
    available_slots INT NOT NULL
);


ALTER TABLE centers 
  
    ALTER COLUMN location SET NOT NULL,
    ALTER COLUMN street SET NOT NULL,
    ALTER COLUMN city SET NOT NULL,
   ALTER COLUMN postal_code SET NOT NULL,
    ALTER COLUMN available_slots SET NOT NULL,




