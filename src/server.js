import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { createServer as createViteServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))


// Mock user data
const MOCK_USER = {
    email: 'augustas@pocius.lt',
    password: 'pass123' // Note: Never store passwords as plain text in production
};

const JWT_SECRET = '1234567890'; // Replace with a real secret in production

async function createServer() {
    const app = express();
    app.use(bodyParser.json()); // parse application/json

    // Create Vite server in middleware mode and configure the app type as
    // 'custom', disabling Vite's own HTML serving logic so parent server
    // can take control
    const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'custom'
    })

    // Use vite's connect instance as middleware. If you use your own
    // express router (express.Router()), you should use router.use
    // When the server restarts (for example after the user modifies
    // vite.config.js), `vite.middlewares` is still going to be the same
    // reference (with a new internal stack of Vite and plugin-injected
    // middlewares. The following is valid even after restarts.
    app.use(vite.middlewares)
  
    // API endpoint for login
    app.post('/api/login', (req, res) => {
        const { email, password } = req.body;
        if (email === MOCK_USER.email && password === MOCK_USER.password) {
            const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });

    app.use('*', async (req, res) => {
        // serve index.html - we will tackle this next
    })

    app.listen(5174)
}

createServer()