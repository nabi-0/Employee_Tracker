CREATE DATABASE employeetracker_db;

USE employeetracker_db;

CREATE TABLE departments (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
); 
CREATE TABLE roles (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL,
	salary DECIMAL(10,2) NOT NULL,
	departments_id INT NOT NULL,
	PRIMARY KEY (id)
);
CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    PRIMARY KEY (id)
);
INSERT INTO departments (name)
VALUES ("Art"), ("Math"), ("Science"), ("Military Intellegence");

INSERT INTO roles (title, salary, department_id)
VALUES ("Painter", 20, 1), ("Teacher", 100, 2), ("Teacher", 100, 3), ("Spy", 600, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Josh", "Furlin", 2, NULL), ("Man", "Human", 2, 1), ("Lady", "Person", 2, 1), ("Abby", "Wimps", 4, 1);
