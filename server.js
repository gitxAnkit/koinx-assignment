import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(
        `Server started at PORT: ${PORT}, access at http://localhost:${PORT}`
    );
});
