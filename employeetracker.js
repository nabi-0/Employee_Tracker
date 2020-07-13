var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "*savetheocean*13npa",
  database: "employeetracker_db"
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employee",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employee":
          employeeSearch();
          break;

        case "View All Employees By Department":
          departmentSearch();
          break;

        case "View All Employees By Manager":
          managerSearch();
          break;

        case "Add Employee":
          createEmployee();
          break;

        case "Remove Employee":
          deleteEmployeeSearch();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "Update Employee Manager":
          updateEmployeeManager();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}

function employeeSearch() {
  inquirer
    .prompt({
      name: "first_name",
      type: "input",
      message: "What is the employees first name?"
    })
    .then(function (answer) {
      var query = "SELECT * FROM employee WHERE first_name = '" + answer.first_name + "'";
      connection.query(query, {}, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("id: " + res[i].id + " || first_name: " + res[i].first_name + " || last_name: " + res[i].last_name);
        }
        runSearch();
      });
    });
}

function departmentSearch() {
  inquirer
    .prompt({
      name: "role_id",
      type: "input",
      message: "What is the department id?"
    })
    .then(function (answer) {
      var query = "SELECT * FROM employee WHERE role_id = '" + answer.role_id + "'";
      connection.query(query, {}, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("id: " + res[i].id + " || first_name: " + res[i].first_name + " || last_name: " + res[i].last_name);
        }
        runSearch();
      });
    });
}

function managerSearch() {
  inquirer
    .prompt({
      name: "manager_id",
      type: "input",
      message: "What is the manager id?"
    })
    .then(function (answer) {
      var query = "SELECT * FROM employee WHERE manager_id = '" + answer.manager_id + "'";
      connection.query(query, {}, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("id: " + res[i].id + " || first_name: " + res[i].first_name + " || last_name: " + res[i].last_name);
        }
        runSearch();
      });
    });
}

function createEmployee() {
  inquirer
    .prompt([{
      name: "first_name",
      type: "input",
      message: "What is the employees first name?"
    },
    {
      name: "last_name",
      type: "input",
      message: "What is the employee last name?"
    },
    {
      name: "role_id",
      type: "input",
      message: "What is the role id?"
    },
    {
      name: "manager_id",
      type: "input",
      message: "What is the manager id?"
    }
    ])
    .then(function (answers) {
      console.log("Creating new Employee...\n");
      var managerID = null;
      if (answers.manager_id !== '') {
        managerID = answers.manager_id;
      }
      var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('" + answers.first_name + "', '" + answers.last_name + "', '" + answers.role_id + "', '" + managerID + "')";
      connection.query(
        query,
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + "employee inserted!\n");
          runSearch();
        }
      );
    })
}

function deleteEmployeeSearch() {
  console.log("Deleting Employee...");
  connection.query(
    "DELETE FROM employees WHERE ?",
    {
    },
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + "employee deleted!/n");
      readEmployees();
    }
  );
}

function readEmployees() {
  console.log("Selecting all employees...\n");
  connection.query("SELECT * FROM employees", function (err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}

function updateEmployeeRole() {
  console.log("Updating Employees Role...\n");
  var query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {

      },
      {

      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + "employee updated!\n");
      deleteEmployeeSearch();
    }
  );
}

function updateEmployeeManager() {
  console.log("Updating Employees Manager...\n");
  var query = connection.query(
    "UPDATE employee SET ? WHERE ?",
    [
      {
        role: title, salary, departments_id
      },
      {
        department: "Art, Math, Science"
      }
    ],
    function (err, res) {
      if (err) throw err;
      console.log(res.affectedRows + "employee updated!\n");
      deleteEmployee();
    }
  );
  console.log(query.sql);
}