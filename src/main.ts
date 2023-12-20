import "./style.css";

document.addEventListener('DOMContentLoaded', () => {
    // Function to check if the user is already logged in
    const isLoggedIn = () => {
        const token = localStorage.getItem('jwt');
        return !!token; // Returns true if token exists, false otherwise
    };

    if (isLoggedIn()) {
        console.log('User is already logged in');
        // Handle the logged-in state (e.g., redirect to a dashboard or change UI)
    } else {
        const loginForm: HTMLFormElement | null = document.querySelector<HTMLFormElement>('.loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', async (event) => {
                event.preventDefault();
        
                const email = (document.getElementById('email') as HTMLInputElement).value;
                const password = (document.getElementById('password') as HTMLInputElement).value;
        
                try {
                    const response = await fetch('http://localhost:5174/api/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ email, password }),
                    });
        
                    if (!response.ok) {
                        throw new Error('Login failed');
                    }
        
                    const data = await response.json();
                    const token = data.token;
        
                    // Handle the token here (e.g., store it in localStorage)
                    localStorage.setItem('jwt', token);
        
                    // Redirect user or change UI state
                    console.log('Login successful, token stored');
                } catch (error) {
                    console.error('Error during login:', error);
                    // Handle login error (e.g., show an error message to the user)
                }
            });
        } else {
            console.error('Could not find login form');
        }
    }
});