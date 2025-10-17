import app from "./app.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚗 API (JSON-DB) en http://localhost:${PORT}`);
  console.log(`📜 Swagger en http://localhost:${PORT}/api-docs`);
});
