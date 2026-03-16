// Your personal information
const yourInfo = {
    id: 11,
    name: "Albert Viñegas", // Replace with your name
    email: "albertvinegas42@gmail.com", // Replace with your email
    company: "E5", // Replace with your company
    address: "Poblacion,Buug,Zamboanga,Sibugay", // Replace with your address
    country: "Philippines", // Replace with your country
    zip: "7009", // Replace with your ZIP
    picture: "1.jpg" 
};

// Fetch users from API and display them
async function fetchAndDisplayUsers() {
    try {
        const response = await fetch('https://fake-json-api.mock.beeceptor.com/users');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let users = await response.json();
        
        // Add your information to the users array
        users.push(yourInfo);
        
        // Display users in table
        displayUsers(users);
        
    } catch (error) {
        console.error('Error fetching users:', error);
        document.getElementById('userTableBody').innerHTML = 
            '<tr><td colspan="8" style="text-align: center; color: red;">Error loading users. Please try again later.</td></tr>';
    }
}

// Display users in table
function displayUsers(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        // Add special class for your info (assuming it's the last item)
        if (index === users.length - 1) {
            row.classList.add('your-info-row');
        }
        
        // Create picture cell
        const pictureCell = document.createElement('td');
        const img = document.createElement('img');
        
        // Set image source with error handling
        img.src = user.picture || 'https://via.placeholder.com/120x120.png?text=User';
        img.alt = `${user.name || 'User'}'s picture`;
        img.className = 'user-picture';
        img.width = 120;
        img.height = 120;
        
        // Add error handler for broken images
        img.onerror = function() {
            this.src = 'https://via.placeholder.com/120x120.png?text=No+Image';
        };
        
        pictureCell.appendChild(img);
        
        // Create other cells and append to row
        row.appendChild(pictureCell);
        
        // Add remaining cells
        const fields = ['id', 'name', 'email', 'company', 'address', 'country', 'zip'];
        fields.forEach(field => {
            const cell = document.createElement('td');
            cell.textContent = user[field] || 'N/A';
            row.appendChild(cell);
        });
        
        tableBody.appendChild(row);
    });
}
// Alternative version if you want to use placeholder images for all users
function displayUsersWithPlaceholders(users) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        if (index === users.length - 1) {
            row.classList.add('your-info-row');
        }
        
        // Generate a consistent placeholder image based on user name or id
        const imageUrl = user.picture || `https://via.placeholder.com/120x120.png?text=${user.name?.charAt(0) || 'U'}`;
        
        row.innerHTML = `
            <td><img src="${imageUrl}" alt="User picture" class="user-picture" width="120" height="120"></td>
            <td>${user.id || 'N/A'}</td>
            <td>${user.name || 'N/A'}</td>
            <td>${user.email || 'N/A'}</td>
            <td>${user.company || 'N/A'}</td>
            <td>${user.address || 'N/A'}</td>
            <td>${user.country || 'N/A'}</td>
            <td>${user.zip || 'N/A'}</td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayUsers();
});