import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// Custom plugin to serve Vercel API routes locally
const vercelApiMock = () => {
  return {
    name: 'vercel-api-mock',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url.startsWith('/api/')) {
          const apiPath = req.url.split('?')[0];
          try {
            // Load the API route module dynamically
            const handlerModule = await server.ssrLoadModule(`${apiPath}.js`);
            const handler = handlerModule.default;
            
            // Mock Vercel response methods
            res.status = (code) => {
              res.statusCode = code;
              return res;
            };
            res.json = (data) => {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(data));
            };

            // Simple body parser for POST requests
            if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
               try {
                 // Read body with a timeout to prevent hanging
                 req.body = await new Promise((resolve) => {
                   let body = '';
                   let resolved = false;
                   const timer = setTimeout(() => {
                     if (!resolved) { resolved = true; resolve({}); }
                   }, 2000);
                   req.on('data', chunk => { body += chunk.toString(); });
                   req.on('end', () => {
                     clearTimeout(timer);
                     if (!resolved) {
                       resolved = true;
                       try { resolve(JSON.parse(body)); }
                       catch { resolve(body || {}); }
                     }
                   });
                   req.on('error', () => {
                     clearTimeout(timer);
                     if (!resolved) { resolved = true; resolve({}); }
                   });
                   // If stream is already ended/consumed, 'end' won't fire
                   // The timeout will resolve it
                 });

                 await handler(req, res);
               } catch (err) {
                 console.error(`API Error in ${apiPath}:`, err);
                 if (!res.headersSent) {
                   res.statusCode = 500;
                   res.setHeader('Content-Type', 'application/json');
                   res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
                 }
               }
            } else {
               try {
                 await handler(req, res);
               } catch (err) {
                 console.error(`API Error in ${apiPath}:`, err);
                 if (!res.headersSent) {
                   res.statusCode = 500;
                   res.end(JSON.stringify({ error: err.message || 'Internal Server Error' }));
                 }
               }
            }
          } catch (e) {
            console.error(`Error loading API route ${apiPath}:`, e);
            res.statusCode = 500;
            res.end('API Route Error');
          }
        } else {
          next();
        }
      });
    }
  }
}

export default defineConfig(({ mode }) => {
  // Load env variables (including those without VITE_ prefix)
  const env = loadEnv(mode, process.cwd(), '');
  // Merge env into process.env so API routes can access them directly
  Object.assign(process.env, env);

  return {
    plugins: [react(), tailwindcss(), vercelApiMock()],
    server: {
      proxy: {
        '/api/v1': {
          target: 'http://3.110.202.249:8001',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  }
})