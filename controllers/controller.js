const DB = require('../db/connect');
const errorHandler = require('../middleware/errorHandler');
const {createCustomAPIError} = require('../errors/customError');


const getAllTasks = (req, res, next) => {
    const sql = 'SELECT * FROM tasks';
    DB.con.query(sql, (err,data) =>{
        if(err) return next(err);
        else return res.status(200).json(data);
    });
};

const createTask = (req, res, next) => {
    const sql = 'INSERT INTO tasks (item) VALUES (?)';
    DB.con.query(sql, req.body.item, (err,data) =>{
        if(err) return next(err);
        else return res.status(201).json(req.body);
    });
};

const getTask = (req, res, next) => {
    const sql = 'SELECT * FROM tasks WHERE task_id = ?';
    DB.con.query(sql, req.params.id, (err,data) =>{
        if(err) return next(err);
        else if(Object.keys(data).length === 0) return next(createCustomAPIError(`No Task with id ${req.params.id}`,404));
        else return res.status(200).json(data);
    });
};

const updateTask = (req, res, next) => {
    const sql = 'UPDATE tasks SET item = ? WHERE task_id = ?';
    const values = [req.body.item, req.params.id];
    DB.con.query(sql, values, (err,data) =>{
        if(err) return next(err);
        else if(data.affectedRows === 0) return next(createCustomAPIError(`No Task with id ${req.params.id}`,404));
        else return res.status(200).json(`Task with id ${req.params.id} was updated successfully`);
    });
};

const deleteTask = (req, res, next) => {
    const sql = 'DELETE FROM tasks WHERE task_id = ?';
    DB.con.query(sql, req.params.id, (err,data) =>{
        if(err) return next(err);
        else if(data.affectedRows === 0) return next(createCustomAPIError(`No Task with id ${req.params.id}`,404));
        else return res.status(200).json(`Task with id ${req.params.id} was deleted successfully`);
    });
};


module.exports = {
    getAllTasks, 
    createTask, 
    updateTask, 
    deleteTask, 
    getTask
};