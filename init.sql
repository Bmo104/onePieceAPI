CREATE TABLE IF NOT EXISTS crew (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  imagen VARCHAR(255) NOT NULL,
  dead BOOLEAN DEFAULT TRUE NOT NULL,
  bounty BIGINT NOT NULL
);

INSERT INTO crew (name, imagen, bounty)
VALUES ('Monkey D Luffy', '/uploads/luffy.png', 3000000000),
      ('Roronoa Zoro', '/uploads/zoro.png', 1111000000),
      ('Jinbe', '/uploads/jinbe.png', 1100000000),
      ('Nico Robin', '/uploads/robin.png', 930000000),
      ('God Usopp', '/uploads/usopp.png', 500000000),
      ('Franky', '/uploads/franky.png', 394000000),
      ('Brook', '/uploads/brook.png', 383000000),
      ('Nami', '/uploads/nami.png', 366000000),
      ('Chopper', '/uploads/chopper.png', 1000);

INSERT INTO crew (name, imagen, dead, bounty)
VALUES ('Vinsmoke Sanji', '/uploads/sanji.png', FALSE, 1032000000);
