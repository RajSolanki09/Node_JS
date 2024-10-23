const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.url == '/') {
        fs.readFile('index.html', 'utf-8', (err, data) => {
            if (err) {
                res.end('Server error');
            } else {
                res.end(data);
            }
        });
    } else if (req.url === '/login') {
        res.end('Login Page successfully');
    } else if (req.url === '/signup') {
        res.end('Signup Page successfully');
    } else if (req.url === '/contact') {
        res.end('Contact Page created successfull');
    } else if (req.url === '/service') {
        res.end('Service Page created successfull');
    }
});

server.listen(8090, () => {
    console.log('Server is running on port 8090');
});
