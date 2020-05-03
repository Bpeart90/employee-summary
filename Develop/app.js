const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let results = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function promptUser() {
    inquirer
        .prompt([
            {
                name: "employee",
                type: "input",
                message: "would you like to add an employee?"
            },
        ])

        .then(answers => {

            if (answers.employee == "no") {
                fs.writeFile(outputPath, render(results), function (err) {
                    if (err) return console.log(err);

                });


            }
            // Use user feedback for... whatever!!
            if (answers.employee == "yes") {

                inquirer
                    .prompt([
                        {
                            name: "employeeOptions",
                            type: "list",
                            choices: ["Intern", "Manager", "Engineer"],
                            message: "what employee would you like to add?"
                        },
                    ])

                    .then(employeePick => {
                        // Use user feedback for... whatever!!

                        if (employeePick.employeeOptions == "Intern") {
                            inquirer.prompt([
                                {
                                    name: "name",
                                    type: "input",
                                    message: "what is the intern's name?"
                                },
                                {
                                    name: "id",
                                    type: "input",
                                    message: "What is the intern's ID number?"
                                },
                                {
                                    name: "email",
                                    type: "input",
                                    message: "what is the intern's email?"
                                },
                                {
                                    name: "school",
                                    type: "input",
                                    message: "what school does the intern attend?"
                                },
                            ]).then(function (user_results) {

                                var intern = new Intern(user_results.name, user_results.id, user_results.email, user_results.school);
                                results.push(intern);
                                promptUser();

                            })

                        };
                        if (employeePick.employeeOptions == "Engineer") {
                            inquirer.prompt([
                                {
                                    name: "name",
                                    type: "input",
                                    message: "what is the engineer's name?"
                                },
                                {
                                    name: "id",
                                    type: "input",
                                    message: "what is the engineer's id number?"
                                },
                                {
                                    name: "email",
                                    type: "input",
                                    message: "what is the engineer's email?"
                                },
                                {
                                    name: "github",
                                    type: "input",
                                    message: "what is the engineer's github username?"
                                },
                            ]).then(function (user_results) {

                                var enginner = new Engineer(user_results.name, user_results.id, user_results.email, user_results.github);
                                results.push(enginner);
                                promptUser();


                            })
                        }
                        if (employeePick.employeeOptions == "Manager") {
                            inquirer.prompt([
                                {
                                    name: "name",
                                    type: "input",
                                    message: "what is the manager's name?"
                                },
                                {
                                    name: "id",
                                    type: "input",
                                    message: "what is the manager's id number?"
                                },
                                {
                                    name: "email",
                                    type: "input",
                                    message: "what is the manager's email?"
                                },
                                {
                                    name: "officenumber",
                                    type: "input",
                                    message: "what is the manager's office number?"
                                },
                            ]).then(function (user_results) {

                                var manager = new Manager(user_results.name, user_results.id, user_results.email, user_results.officenumber);
                                results.push(manager);
                                promptUser();


                            })
                        }
                    })

            }





        })

}

promptUser();


// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!


// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
