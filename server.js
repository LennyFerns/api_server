const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const app = express();
const port = 3000;

// Load Swagger documentation
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware to parse JSON requests
app.use(express.json());

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the API Server! Go to /api-docs for API documentation.');
  });

// Import and use API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
