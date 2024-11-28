document.addEventListener('DOMContentLoaded', () => {
    const locationStatus = document.getElementById('locationStatus');
    const schoolsList = document.getElementById('schoolsList');

    function showError(message) {
        locationStatus.textContent = `Error: ${message}`;
        locationStatus.classList.add('text-red-500');
    }

    function displaySchools(schools) {
        schoolsList.innerHTML = schools.map(school => `
            <div class="bg-white p-4 rounded-lg shadow">
                <h2 class="text-xl font-semibold">${school.name}</h2>
                <p class="text-gray-600">${school.address}</p>
                <p class="text-gray-500 mt-2">Distance: ${school.distance.toFixed(2)} km</p>
            </div>
        `).join('');
    }

    function getSchools(latitude, longitude) {
        locationStatus.textContent = 'Fetching nearby schools...';
        
        fetch(`/api/listSchools?latitude=${latitude}&longitude=${longitude}`)
            .then(response => response.json())
            .then(schools => {
                locationStatus.textContent = 'Schools found in your area:';
                displaySchools(schools);
            })
            .catch(error => {
                showError('Failed to fetch schools');
                console.error('Error:', error);
            });
    }

    function getUserLocation() {
        locationStatus.textContent = 'Getting your location...';

        if (!navigator.geolocation) {
            showError('Geolocation is not supported by your browser');
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getSchools(latitude, longitude);
            },
            (error) => {
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        showError('Location permission denied');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        showError('Location information unavailable');
                        break;
                    case error.TIMEOUT:
                        showError('Location request timed out');
                        break;
                    default:
                        showError('An unknown error occurred');
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        );
    }

    // Start the location process when the page loads
    getUserLocation();
});