require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const path = require('path')
const cluster = require("cluster");
const process = require("process");
const os = require("os");

const PORT = process.env.PORT || 8080
const cpus = os.cpus;
const numCPUs = cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);


  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
}
else{
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(express.static(path.resolve(__dirname, 'static')))

  app.use(fileUpload({}))
  app.use('/api', router)


  const start = async () => {
    try {
      await sequelize.authenticate()
      await sequelize.sync()

      app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
      console.log(e)
    }
  }


  start()
}
