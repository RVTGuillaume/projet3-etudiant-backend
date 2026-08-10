const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  // Gestion des routes
  if (req.url === '/') {
    res.end(JSON.stringify({
      message: 'API Etudiant - operationnelle',
      routes: ['/api/etudiants', '/api/etudiants/:id']
    }));
  }
  else if (req.url === '/api/etudiants') {
    res.end(JSON.stringify({
      success: true,
      data: [],
      message: 'Route /api/etudiants fonctionne !'
    }));
  }
  else if (req.url.startsWith('/api/etudiants/')) {
    const id = req.url.split('/').pop();
    res.end(JSON.stringify({
      success: true,
      id: id,
      message: 'Route /api/etudiants/' + id + ' fonctionne !'
    }));
  }
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({
      error: 'Route non trouv?e',
      path: req.url
    }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log('Serveur HTTP demarre sur le port ' + PORT);
});
