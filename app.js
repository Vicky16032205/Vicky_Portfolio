const video1 = document.getElementById('projectVideo1');
const video2 = document.getElementById('projectVideo2');
const video3 = document.getElementById('projectVideo3');

const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

const hoverSign = document.querySelector('.hover-sign');
const videoList = [video1, video2, video3];

videoList.forEach(function(video){
    video.addEventListener("mouseover", function(){
        video.play();
        hoverSign.classList.add("active");
    });
    video.addEventListener("mouseout", function(){
        video.pause();
        hoverSign.classList.remove("active");
    });
});

menu.addEventListener("click", function(){
    sideBar.classList.remove("close-sidebar");
    sideBar.classList.add("open-sidebar");
});

closeIcon.addEventListener("click", function(){
    sideBar.classList.remove("open-sidebar");
    sideBar.classList.add("close-sidebar");
});

// ==================== EMAILJS FUNCTIONALITY ====================

(function() {
    emailjs.init("4ZltSZltoDEw0vszr");
})();


const contactForm = document.querySelector('.contact-box');
const fullNameInput = contactForm.querySelectorAll('input')[0];
const emailInput = contactForm.querySelectorAll('input')[1];
const messageInput = contactForm.querySelectorAll('input')[2];
const sendButton = contactForm.querySelector('button');

sendButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    const fullName = fullNameInput.value.trim();
    const userEmail = emailInput.value.trim();
    const message = messageInput.value.trim();
    
    if (!fullName || !userEmail || !message) {
        showNotification('Please fill in all fields! 📝', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
        showNotification('Please enter a valid email address! 📧', 'error');
        return;
    }
    
    sendButton.disabled = true;
    const originalButtonText = sendButton.innerHTML;
    sendButton.innerHTML = 'Sending... <i class="bx bx-loader-alt bx-spin"></i>';
    sendButton.style.opacity = '0.6';
    sendButton.style.cursor = 'not-allowed';
    
    const templateParams = {
        from_name: fullName,
        from_email: userEmail,
        message: message,
        to_email: "Vickyguptagkp55@gmail.com"
    };
    
    emailjs.send(
        'service_hfstjkt',
        'template_pnjoq6i',
        templateParams
    )
    .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        showNotification('Message sent successfully! 🎉 I\'ll get back to you soon.', 'success');
        
        fullNameInput.value = '';
        emailInput.value = '';
        messageInput.value = '';
        
    })
    .catch(function(error) {
        console.error('FAILED...', error);
        
        showNotification('Failed to send message. Please try again or email me directly. 😔', 'error');
    })
    .finally(function() {
        sendButton.disabled = false;
        sendButton.innerHTML = originalButtonText;
        sendButton.style.opacity = '1';
        sendButton.style.cursor = 'pointer';
    });
});

function showNotification(message, type) {
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 10);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}