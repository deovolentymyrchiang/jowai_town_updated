// Function to load components dynamically
function loadComponent(id, filePath) {
    fetch(filePath)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`); // Handle HTTP errors
            }
            return response.text();
        })
        .then((data) => {
            const element = document.getElementById(id);
            if (element) {
                element.innerHTML = data;
            } else {
                console.error(`Element with id ${id} not found in the DOM.`);
            }
        })
        .catch((error) => console.error(`Error loading ${filePath}:`, error));
}

// Add event listeners and load components after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Load components
    loadComponent("navbar", "components/navbar.html");
    loadComponent("footer", "components/footer.html");

    // Set up after loading components to ensure elements exist
    setTimeout(() => {
        const menuToggle = document.getElementById('menu-toggle');
        const sidebar = document.getElementById('sidebar');
        const closeMenu = document.getElementById('close-menu');

        // Sidebar toggle functionality
        if (menuToggle && sidebar) {
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('hidden'); // Toggle the 'hidden' class
                // Update the display style based on visibility
                sidebar.style.display = sidebar.classList.contains('hidden') ? 'none' : 'block';
            });
        }

        // Close menu functionality
        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                sidebar.classList.add('hidden'); // Add the 'hidden' class
                sidebar.style.display = 'none'; // Set display to none
            });
        }

        // Highlight active link
        const currentPage = window.location.pathname.split("/").pop(); // Get current page from URL
        const navbarLinks = document.querySelectorAll('.navbar-link'); // Select all navbar links

        // Highlight the active link
        let isActiveLinkFound = false; // Flag to check if an active link is found
        navbarLinks.forEach((link) => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active-link'); // Add active class
                isActiveLinkFound = true; // Set the flag to true if the active link is found
            }
        });

        // If no active link is found, set Home as the active link by default
        if (!isActiveLinkFound) {
            const homeLink = document.querySelector('.navbar-link[href="./index.html"]');
            if (homeLink) {
                homeLink.classList.add('active-link'); // Add active class to Home
            }
        }

        // Dropdown and outside click functionality remain unchanged...
        const facilitiesButton = document.getElementById('facilities-button');
        const facilitiesDropdown = document.getElementById('facilities-dropdown');
        const facilitiesButtonSidebar = document.getElementById('facilities-button-sidebar');
        const facilitiesDropdownSidebar = document.getElementById('facilities-dropdown-sidebar');

        // Toggle facilities dropdown
        if (facilitiesButton && facilitiesDropdown) {
            facilitiesButton.addEventListener('click', () => {
                if (facilitiesDropdown) {
                    facilitiesDropdown.classList.toggle('hidden');
                } else {
                    console.error('Facilities dropdown element not found');
                }
            });
        }

        // Toggle facilities dropdown in sidebar
        if (facilitiesButtonSidebar && facilitiesDropdownSidebar) {
            facilitiesButtonSidebar.addEventListener('click', () => {
                if (facilitiesDropdownSidebar) {
                    facilitiesDropdownSidebar.classList.toggle('hidden');
                } else {
                    console.error('Facilities dropdown sidebar element not found');
                }
            });
        }

        // Close dropdown when clicking outside
        window.addEventListener('click', (event) => {
            if (!event.target.closest('#facilities-button') && !event.target.closest('#facilities-dropdown')) {
                if (facilitiesDropdown) {
                    facilitiesDropdown.classList.add('hidden');
                }
            }
            if (!event.target.closest('#facilities-button-sidebar') && !event.target.closest('#facilities-dropdown-sidebar')) {
                if (facilitiesDropdownSidebar) {
                    facilitiesDropdownSidebar.classList.add('hidden');
                }
            }
        });
    }, 100); // Delay to ensure the components are loaded before adding listeners
});
