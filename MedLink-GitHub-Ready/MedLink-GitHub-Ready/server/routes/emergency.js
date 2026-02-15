const router = require('express').Router();

// Get nearby hospitals (mock data - in production, use geolocation API)
router.get('/hospitals', async (req, res) => {
    try {
        const { lat, lng } = req.query;
        
        // Mock hospital data
        const hospitals = [
            { 
                id: 1, 
                name: 'City General Hospital', 
                distance: '2.3 km', 
                phone: '+91-40-2345-6789', 
                available: true, 
                address: 'Banjara Hills, Hyderabad',
                lat: 17.4239,
                lng: 78.4738
            },
            { 
                id: 2, 
                name: 'Apollo Emergency Center', 
                distance: '3.1 km', 
                phone: '+91-40-2345-6790', 
                available: true, 
                address: 'Jubilee Hills, Hyderabad',
                lat: 17.4326,
                lng: 78.4071
            },
            { 
                id: 3, 
                name: 'Care Hospital Emergency', 
                distance: '4.5 km', 
                phone: '+91-40-2345-6791', 
                available: false, 
                address: 'Gachibowli, Hyderabad',
                lat: 17.4400,
                lng: 78.3489
            },
        ];

        res.json(hospitals);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Request ambulance
router.post('/request', async (req, res) => {
    try {
        const { location, phone, emergency_type } = req.body;
        
        // In production, this would trigger actual ambulance dispatch
        // For now, just log and return success
        console.log('Ambulance requested:', { location, phone, emergency_type });
        
        res.json({ 
            success: true, 
            message: 'Ambulance dispatched',
            eta: '8-10 minutes',
            ambulance_number: 'AP-09-AB-1234'
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
