const express = require('express');
const { setInCache, getFromCache, deleteFromCache, client } = require('./redis');
const { getAllTasks, getTaskById, createTask, deleteTask, updateTask, createTableIfNotExists, db } = require('./database');
const uuid = require('uuid');
const app = express();
const port = 3000;

(async () => {
    try {
        await client.connect();
        db.on('connect', () => {
            console.log('Postgres client connected');
        });
        await createTableIfNotExists(db);
        console.log('Database table created (if not exists)');
    } catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1); 
    }
})();

app.use(express.json());

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await getAllTasks(db);
        res.json(tasks);
    } catch (error) {
        console.error('Error retrieving tasks:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const taskCached = await getFromCache(id, client);
        if (taskCached) {
            return res.json(JSON.parse(taskCached));
        }
        const task = await getTaskById(db, id);
        if (task) {
            await setInCache(id, JSON.stringify(task), client);
            return res.json(task);
        }

        res.status(404).json({ message: 'Task not found' });
    } catch (error) {
        console.error('Error retrieving task by ID:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/tasks', async (req, res) => {
    const task = req.body;
    task.id = uuid.v4();
    try {
        const newTask = await createTask(db, task);
        if (newTask.rowCount > 0) {
            return res.json(task);
        }
        res.status(500).json({ message: 'Error creating task' });
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.put('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    const task = req.body;
    try {
        const updatedTask = await updateTask(db, id, task);
        await deleteFromCache(id, client);
        res.json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/tasks/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await deleteTask(db, id);
        await deleteFromCache(id, client);
        res.json(deletedTask);
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
