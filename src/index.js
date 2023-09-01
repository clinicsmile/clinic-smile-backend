console.clear();
const app = require('./app');

app.listen(app.get("port"), app.get("host"), () => {
	console.log("Servidor iniciado en " + app.get("host") + ":" + app.get("port"));
});