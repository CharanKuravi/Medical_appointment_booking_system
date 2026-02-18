const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'medlink.db');

if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('✅ Database deleted successfully');
    console.log('🔄 Restart the server to create a fresh database with the new schema');
} else {
    console.log('ℹ️  No database file found');
}
