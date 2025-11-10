const express = require('express');
const path = require('path');
const app = express();


const PORT = 4687;

// Serve the built React app
app.use(express.static(path.join(__dirname, 'dist')));

// Redirect all routes to React
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running: http://classwork.engr.oregonstate.edu:${PORT}/`);
});