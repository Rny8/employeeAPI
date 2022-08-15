const express = require("express")
const app = express();
const PORT = 3000;

app.use(express.json())

const employees = [];
const shifts = [];

//EMPLOYEE MANAGEMENT

app.get('/', (req, res) => {
    res.send('Hello world')
});

app.get('/api/employees', (req, res) => {
    res.send(employees)
});

app.post('/api/employeeAdd', (req, res) => {
    const employee = {
        id: employees.length + 1,
        name: req.body.name,
        role: req.body.role
    };
    employees.push(employee);
    res.status(200).send(employee)
});

app.get("/api/employee/:id", (req, res) => {
    const employee = employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) res.status(404).send("Employee with given ID was not found")
    res.status(200).send(employee);
});

app.post("/api/employeeDelete/:id", (req, res) => {
    const employee = employees.find(c => c.id === parseInt(req.params.id));
    if (!employee) res.status(404).send("Employee not found with given ID")
    for (let i = 0; i < employees.length; i++){
        console.log(employees[i].id)
        if (employees[i].id === parseInt(req.params.id)) {
            employees.splice(i, 1)
            res.status(200).send("deleted user")
        }
    }
});

//SHIFT MANGEMENT

app.get("/api/shifts", (req, res) => {
    res.status(200).send(shifts)
});

app.post("/api/shiftAdd/:id/:startTime/:endTime", (req, res) => {
    const employee = employees.find(c => c.id == parseInt(req.params.id))
    if (!employee) {res.status(404).send("Unable to find employee by ID")}
    const shift = {
        shiftID: shifts.length + 1,
        employee,
        startTime: req.params.startTime,
        endTime: req.params.endTime
    }
    shifts.push(shift)
    res.status(200).send(shift)
});

app.post("/api/shiftDelete/:id", (req, res) => {
    const shift = shifts.find(c => c.id == parseInt(req.params.id))
    for (let i = 0; i < employees.length; i++){
        if (shifts[i].shiftID === parseInt(req.params.id)) {
            shifts.splice(i, 1)
            res.status(200).send("Deleted shift")
        }
    }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`)) 