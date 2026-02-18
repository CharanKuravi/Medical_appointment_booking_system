# 🚀 Start Both Servers - Quick Guide

## ⚠️ IMPORTANT: You Need BOTH Servers Running!

The "Network Error" happens because the **backend server is not running**.

---

## 📋 Step-by-Step Startup

### Step 1: Start Backend Server (REQUIRED!)

Open a terminal and run:

```bash
cd server
npm start
```

**You should see:**
```
Backend running on port 5000
Using SQLite database
SQLite database connected
Appointments table ready
```

**Keep this terminal open!** Don't close it.

---

### Step 2: Start Frontend Server

Open a **NEW** terminal (keep the first one running) and run:

```bash
cd client
npm run dev
```

**You should see:**
```
VITE v7.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

---

## ✅ Verify Both Are Running

### Check Backend:
Open browser: http://localhost:5000/api/health

You should see:
```json
{"status":"ok","database":"SQLite"}
```

### Check Frontend:
Open browser: http://localhost:5173

You should see the MedLink homepage.

---

## 🐛 Troubleshooting

### Error: "Network Error" when booking

**Problem:** Backend server is not running

**Solution:**
1. Open a terminal
2. `cd server`
3. `npm start`
4. Keep it running

### Error: "Port 5000 already in use"

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Then restart
npm start
```

### Error: "Cannot find module"

**Solution:**
```bash
cd server
npm install
npm start
```

---

## 🎯 Quick Test After Starting

1. ✅ Backend running: http://localhost:5000/api/health
2. ✅ Frontend running: http://localhost:5173
3. ✅ Login to your account
4. ✅ Find a doctor
5. ✅ Book appointment (should work now!)
6. ✅ Click "Appointments" button (top right, blue-purple gradient)
7. ✅ See your booking!

---

## 💡 Pro Tip: Use Two Terminals

**Terminal 1 (Backend):**
```bash
cd server
npm start
# Leave this running
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Leave this running
```

**Both must stay open while you use the app!**

---

## 🔄 Restart Everything

If something goes wrong:

1. **Stop both servers** (Ctrl+C in both terminals)
2. **Restart backend first:**
   ```bash
   cd server
   npm start
   ```
3. **Then restart frontend:**
   ```bash
   cd client
   npm run dev
   ```

---

## ✅ Success Checklist

- [ ] Backend terminal shows "Backend running on port 5000"
- [ ] Frontend terminal shows "Local: http://localhost:5173/"
- [ ] http://localhost:5000/api/health returns {"status":"ok"}
- [ ] http://localhost:5173 shows MedLink homepage
- [ ] Can login successfully
- [ ] Can book appointment without "Network Error"
- [ ] "Appointments" button visible in navbar (top right)
- [ ] Bookings show up in appointments page

---

**Now try booking again - it should work! 🎉**
