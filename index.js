const PORT = process.env.PORT || 8080;

const app = require("./app");

app.listen(PORT, () => {
    console.log(
        "APP_START",
        `Server started on port ${PORT}`
    );
});

