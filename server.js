const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  // Route /etudiants (sans /api)
  if (req.url === '/etudiants') {
    res.end(JSON.stringify({ 
      success: true, 
      data: [],
      message: 'Route /etudiants fonctionne !'
    }));
  } else {
    // Route racine
    res.end(JSON.stringify({ 
      message: 'Test serveur HTTP fonctionne !',
      path: req.url,
      method: req.method
    }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur HTTP demarre sur le port ' + PORT);
});
