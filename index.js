require("dotenv").config();
const { app } = require("./utils/express");

const PORT = process.env.NODE_DOCKER_PORT || 3000;
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})

