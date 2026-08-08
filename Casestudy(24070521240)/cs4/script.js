// Global Scope variable demonstration
const systemBank = "Secure Bank ATM";

// 1. Function Declaration: Function to reverse the entered PIN number
function reversePIN(pin) {
    // Converts pin to string, splits characters, reverses array, and joins back
    return pin.toString().split('').reverse().join('');
}

// 2. Function Expression: Function to check whether PIN is a palindrome
const isPalindrome = function(pin) {
    const reversed = reversePIN(pin);
    return pin === reversed;
};

// 3. Arrow Function: Formats the security message
const formatSecurityMessage = (isPal, attempts) => {
    if (isPal) {
        return `[Attempt #${attempts}] SPECIAL SECURITY NOTICE: PIN reads the same forward and backward! (Verified by ${systemBank})`;
    } else {
        return `[Attempt #${attempts}] Standard PIN Verification: PIN is not a palindrome.`;
    }
};

// 4. Closure Concept: Creates a counter function that retains state of attempt count
function createAttemptTracker() {
    let attempts = 0; // Private variable trapped inside closure scope
    
    return function() {
        attempts++;
        return attempts; // Inner function retains access to outer variable 'attempts'
    };
}

// Initialize closure instance
const getAttemptCount = createAttemptTracker();

// Main function (Demonstrates Local Scope concept)
function handleVerification() {
    // Local Scope variables (accessible only within handleVerification function)
    const pinInput = document.getElementById('pinInput').value.trim();
    const outputDiv = document.getElementById('output');

    // Validation
    if (pinInput === "") {
        outputDiv.className = "error";
        outputDiv.innerText = "Error: Please enter a PIN number.";
        outputDiv.classList.remove("hidden");
        return;
    }

    // Call closure to get attempt number
    const attemptNumber = getAttemptCount();

    // Check palindrome using Function Expression
    const palindromeResult = isPalindrome(pinInput);

    // Format output using Arrow Function
    const message = formatSecurityMessage(palindromeResult, attemptNumber);

    // Display result
    outputDiv.classList.remove("hidden");
    if (palindromeResult) {
        outputDiv.className = "success";
    } else {
        outputDiv.className = "normal";
    }
    
    outputDiv.innerText = message;
}
