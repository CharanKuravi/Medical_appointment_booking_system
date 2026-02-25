# 🚀 SIMPLE START GUIDE - Just Run This!

## ⚡ FASTEST WAY - Double Click This File:

```
START.bat
```

**That's it!** It will:
1. ✅ Install dependencies automatically
2. ✅ Start backend server
3. ✅ Start frontend server
4. ✅ Open browser automatically

---

## 🔧 Manual Start (If .bat doesn't work)

### Step 1: Open Terminal 1 - Start Backend

```bash
cd server
npm install
npm start
```

**Wait until you see:**
```
Backend running on port 5000
SQLite database connected
```

**Keep this terminal open!**

---

### Step 2: Open Terminal 2 - Start Frontend

```bash
cd client
npm install
npm run dev
```

**Wait until you see:**
```
Local: http://localhost:5173/
```

**Keep this terminal open!**

---

### Step 3: Open Browser

Go to: **http://localhost:5173**

---

## ❌ Common Errors & Fixes

### Error: "npm is not recognized"

**Fix:** Install Node.js from https://nodejs.org/

---

### Error: "Port 5000 already in use"

**Fix:**
```bash
# Kill the process
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Then restart
cd server
npm start
```

---

### Error: "Cannot find module"

**Fix:**
```bash
# Backend
cd server
rmdir /s /q node_modules
del package-lock.json
npm install

# Frontend
cd client
rmdir /s /q node_modules
del package-lock.json
npm install
```

---

### Error: "Network Error" when booking

**Fix:** Make sure backend is running!
```bash
cd server
npm start
```

---

## ✅ Verify Everything Works

1. **Backend Check:** http://localhost:5000/api/health
   - Should show: `{"status":"ok","database":"SQLite"}`

2. **Frontend Check:** http://localhost:5173
   - Should show: MedLink homepage

3. **Login:** Create account or login

4. **Book Appointment:** Find doctor → Book → Should work!

5. **View Appointments:** Click blue "Appointments" button (top right)

---

## 🎯 Quick Troubleshooting

### Nothing happens when I run START.bat?

Right-click → "Run as Administrator"

### Backend won't start?

```bash
cd server
npm install --force
npm start
```

### Frontend won't start?

```bash
cd client
npm install --force
npm run dev
```

### Still not working?

1. Close all terminals
2. Restart your computer
3. Run START.bat again

---

## 📞 Need Help?

Check these files:
- `START_SERVERS.md` - Detailed startup guide
- `FIX_BOOKINGS.md` - Fix booking issues
- `NAVBAR_LAYOUT.md` - Navbar documentation

---

**Just double-click START.bat and you're good to go! 🚀**
