const express = require('express');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Utilisation des routes définies dans routes.js
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
