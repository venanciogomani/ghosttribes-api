import express from 'express';

const allowedOrigins = [
  'http://localhost:5173', // storefront endpoint
  'http://localhost:3200' // cms endpoint
];

function corsMiddleware(): (req: express.Request, res: express.Response, next: express.NextFunction) => void {
  return (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const origin = req.headers.origin;
  
    if (allowedOrigins.includes(origin as string)) {
      res.setHeader('Access-Control-Allow-Origin', origin as string);
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      if (req.method === 'OPTIONS') {
        return res.status(200).end();
      }
    } else {
      return res.status(403).json({ error: 'Forbidden' });
    }
  
    next();
  };
}

export default corsMiddleware;