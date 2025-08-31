// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Form submission
    document.getElementById('patient-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for registering! We will contact you soon.');
        this.reset();
    });
    
    document.getElementById('expert-form').addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your application! Our team will review it shortly.');
        this.reset();
    });
    
    // Age-based user type selection
    document.getElementById('age').addEventListener('change', function() {
        const age = parseInt(this.value);
        const userType = document.getElementById('user-type');
        
        if (age < 18) {
            userType.value = 'child';
        } else if (age >= 18) {
            userType.value = 'adult';
        }
    });
    
    // Chatbot functionality
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-message');
    const chatMessages = document.getElementById('chat-messages');
    
    // Send message function
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        const userMessageElem = document.createElement('div');
        userMessageElem.classList.add('message', 'user-message');
        userMessageElem.textContent = message;
        chatMessages.appendChild(userMessageElem);
        
        // Clear input
        userInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Connecting to Hugging Face API)
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            const botMessageElem = document.createElement('div');
            botMessageElem.classList.add('message', 'bot-message');
            botMessageElem.textContent = botResponse;
            chatMessages.appendChild(botMessageElem);
            
            // Scroll to bottom again
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
    }
    
    // Send message on button click
    sendButton.addEventListener('click', sendMessage);
    
    // Send message on Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Simple bot response function (would be replaced with Hugging Face integration)
    function getBotResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
            return "Hello there! How can I help you today?";
        } else if (lowerMsg.includes('anxiety') || lowerMsg.includes('stress')) {
            return "I'm sorry to hear you're experiencing this. Have you tried any relaxation techniques like deep breathing or meditation?";
        } else if (lowerMsg.includes('depress') || lowerMsg.includes('sad')) {
            return "It sounds like you might be going through a difficult time. Would you like to talk to one of our professionals?";
        } else if (lowerMsg.includes('appointment') || lowerMsg.includes('book')) {
            return "I can help you book a session. Would you prefer virtual or in-person therapy?";
        } else if (lowerMsg.includes('payment') || lowerMsg.includes('pay')) {
            return "We use Instasend for secure payments. You can pay for your subscription after selecting a plan.";
        } else if (lowerMsg.includes('thank')) {
            return "You're welcome! Is there anything else I can help you with?";
        } else {
            return "Thank you for sharing. I'm here to listen and help you find resources. Can you tell me more about how you're feeling?";
        }
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});