-- CREATING A TABLE
/* THIS IS A MULTI-LINE COMMENT*/

-- CREATE TABLE cars (
--     id SERIAL, --SERIAL is a sspecial type to postress. it creates
--     --an integer that auto-increments. when creating a new column
--     --we dont specify this value ourselves. Postgress does it automatically.
--     --this is meant to act a uique identifier for that row like a persons name
--     make VARCHAR(50),
--     model VARCHAR(255),
--     doors INTEGER,
--     description TEXT,
-- );
--     ALTER TABLE "cars"
--     ADD COLUMS "drive_systm" VARCHAR(255);
--     ALTER TABLE cars
--     RENAME COLUMN drive_systems TO drive;

INSERT INTO students
(first_name, last_name, email, phone_number)
VALUES
('Jon', 'Snow', 'js@winterfell.gov', '778.994.8776');
