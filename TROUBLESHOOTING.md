# Troubleshooting Guide

## Cannot Access Application at http://localhost:5173

### Step 1: Verify Server is Running
The server appears to be running (process ID 16380). Check the terminal where you ran `npm run dev` for any error messages.

### Step 2: Try Different URLs
Try accessing the application using:
- `http://localhost:5173`
- `http://127.0.0.1:5173`
- `http://[::1]:5173` (IPv6)

### Step 3: Check Browser Console
1. Open your browser's Developer Tools (F12)
2. Go to the Console tab
3. Look for any red error messages
4. Share any errors you see

### Step 4: Restart the Dev Server
1. Stop the current server (Ctrl+C in the terminal)
2. Clear the Vite cache:
   ```bash
   rm -rf node_modules/.vite
   ```
   Or on Windows:
   ```powershell
   Remove-Item -Recurse -Force node_modules\.vite
   ```
3. Restart the server:
   ```bash
   npm run dev
   ```

### Step 5: Check for Port Conflicts
If port 5173 is already in use, try a different port:
```bash
npm run dev -- --port 3000
```

### Step 6: Verify All Dependencies
Make sure all packages are installed:
```bash
npm install
```

### Common Issues

1. **Browser Cache**: Clear your browser cache or use incognito mode
2. **Firewall**: Check if Windows Firewall is blocking the connection
3. **Antivirus**: Temporarily disable antivirus to test
4. **Node Version**: Ensure you're using Node.js 18 or higher

### If Still Not Working

Please provide:
1. Browser console errors (F12 → Console tab)
2. Terminal output from `npm run dev`
3. Browser you're using (Chrome, Firefox, Edge, etc.)
4. Any error messages you see

