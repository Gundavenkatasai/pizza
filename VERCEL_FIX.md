# Vercel Serverless Function Fix

## Problem
The deployment was crashing with `FUNCTION_INVOCATION_FAILED` because the server was trying to call `server.listen()` in a serverless environment, which doesn't work.

## Changes Made

### 1. **server/index.js** - Serverless Compatibility
- Added Vercel environment detection (`process.env.VERCEL`)
- Skip `server.listen()` when running in Vercel
- Export Express app as default export for serverless
- Added CORS support for `*.vercel.app` domains

### 2. **api/index.js** - Serverless Entry Point
- Created dedicated Vercel function entry point
- Imports and exports the Express app from server

### 3. **vercel.json** - Updated Configuration
- Changed build source from `project/server/index.js` to `api/index.js`
- Simplified routing configuration
- Removed unnecessary config options

## What to Do Next in Vercel

### 1. Redeploy
The push to GitHub should trigger an automatic redeployment. Wait for it to complete.

### 2. Check Environment Variables
Make sure these are set in Vercel Dashboard → Settings → Environment Variables:

**Required:**
```
MONGODB_URI=mongodb+srv://your-connection-string
JWT_SECRET=your-secret-key
NODE_ENV=production
```

**Optional (for full functionality):**
```
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RAZORPAY_KEY_ID=your-key
RAZORPAY_KEY_SECRET=your-secret
VITE_GEMINI_API_KEY=your-gemini-key
VITE_WEATHER_API_KEY=your-weather-key
```

### 3. Set FRONTEND_URL
After deployment succeeds, update the `FRONTEND_URL` variable:
```
FRONTEND_URL=https://your-actual-domain.vercel.app
```
Then redeploy (or the app will auto-redeploy when you save the variable).

## Important Notes

### Socket.IO Limitations
Socket.IO real-time features have limited support in Vercel serverless. For full real-time functionality:
- Consider using Vercel's Edge Runtime with WebSockets
- Or deploy the backend separately on a platform that supports persistent connections (Railway, Render, etc.)
- Current setup: API routes work, but real-time order updates may not

### Testing After Deployment
1. Test API health: `https://your-domain.vercel.app/api/health`
2. Test admin login: `https://your-domain.vercel.app/admin`
3. Test main site: `https://your-domain.vercel.app/`
4. Check browser console for any CORS errors
5. Check Vercel logs for any server errors

### If Still Having Issues

**Check Vercel Logs:**
1. Go to Vercel Dashboard → Your Project
2. Click on the deployment
3. Go to "Functions" tab
4. Click on the function to see detailed logs

**Common Issues:**
- Missing environment variables (check MongoDB URI is set)
- CORS errors (make sure FRONTEND_URL matches your domain)
- Module import errors (check all dependencies are in package.json)
- Build failures (check build logs in Vercel)

## Rollback Option
If needed, you can rollback to a previous deployment in Vercel Dashboard → Deployments → Click three dots → Promote to Production

## Alternative: Railway Deployment
If Socket.IO is critical and Vercel limitations are problematic, consider Railway:
- Supports persistent WebSocket connections
- Easy deployment: `railway up`
- Free tier available
- Better for real-time applications
