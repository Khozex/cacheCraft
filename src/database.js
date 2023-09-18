const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "postgres",
    database: "postgres",
  },
});

const createTableIfNotExists = async (db) => {
    const exists = await db.schema.hasTable("tasks");
    if (!exists) {
        await db.schema.createTable("tasks", (table) => {
        table.uuid("id").primary();
        table.string("title");
        table.string("description");
        table.boolean("done");
        });
    }
};

const getAllTasks = async (db) => {
    return await db.select("*").from("tasks");
};

const getTaskById = async (db, id) => {
    return await db.select("*").from("tasks").where("id", id);
};

const createTask = async (db, task) => {
    return await db.insert(task).into("tasks");
};

const updateTask = async (db, id, task) => {
    return await db("tasks").where("id", id).update(task);
};

const deleteTask = async (db, id) => {
    return await db("tasks").where("id", id).del();
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    createTableIfNotExists,
    db
}

