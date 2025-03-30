// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Image slideshow configuration
    const imageShowcase = document.querySelector('.image-showcase');
    const images = [
        'media/garden (1).jpg',
        'media/garden (2).jpg',
        'media/garden (3).jpg',
        'media/garden (4).jpg',
        'media/garden (5).jpg',
        'media/garden (6).jpg'
    ];
    
    // Add image descriptions
     const imageDescriptions = [
            'Onderhouden gazon en tuinpad',
            'Prachtige tuin na onderhoud',
        //  'Professioneel aangelegde border',
            'Strak gesnoeide hagen en struiken',
        //  'Nieuw aangelegde terras met beplanting',

     ];
    
    // Create image elements for slideshow
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = imageDescriptions[index];
        img.className = index === 0 ? 'active' : '';
        imageShowcase.appendChild(img);
    });
    
    // Slideshow navigation
    let currentImageIndex = 0;
    const allImages = imageShowcase.querySelectorAll('img');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    
    function showImage(index) {
        allImages[currentImageIndex].classList.remove('active');
        currentImageIndex = index;
        allImages[currentImageIndex].classList.add('active');
    }
    
    function showNextImage() {
        const newIndex = (currentImageIndex + 1) % allImages.length;
        showImage(newIndex);
    }
    
    function showPrevImage() {
        const newIndex = (currentImageIndex - 1 + allImages.length) % allImages.length;
        showImage(newIndex);
    }
    
    // Arrow click events
    nextArrow.addEventListener('click', function() {
        showNextImage();
        // Reset the timer when manually changing
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(showNextImage, 5000);
    });
    
    prevArrow.addEventListener('click', function() {
        showPrevImage();
        // Reset the timer when manually changing
        clearInterval(slideshowInterval);
        slideshowInterval = setInterval(showNextImage, 5000);
    });
    
    // Automatic slideshow
    let slideshowInterval = setInterval(showNextImage, 5000);
    
    // Create thumbnail gallery
    const thumbnailsContainer = document.getElementById('gallery-thumbnails');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // Create thumbnails
    images.forEach((src, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = src;
        thumbnail.alt = imageDescriptions[index];
        thumbnail.className = 'thumbnail';
        
        // Add click event to open lightbox
        thumbnail.addEventListener('click', function() {
            lightboxImage.src = src;
            lightboxImage.alt = imageDescriptions[index];
            lightboxCaption.textContent = imageDescriptions[index];
            lightbox.style.display = 'block';
            
            // Stop slideshow when viewing in lightbox
            clearInterval(slideshowInterval);
        });
        
        thumbnailsContainer.appendChild(thumbnail);
    });
    
    // Close lightbox
    closeLightbox.addEventListener('click', function() {
        lightbox.style.display = 'none';
        
        // Resume slideshow after closing lightbox
        slideshowInterval = setInterval(showNextImage, 5000);
    });
    
    // Also close lightbox when clicking outside the image
    lightbox.addEventListener('click', function(event) {
        if (event.target === lightbox) {
            lightbox.style.display = 'none';
            
            // Resume slideshow after closing lightbox
            slideshowInterval = setInterval(showNextImage, 5000);
        }
    });
    
    // Key navigation for lightbox (Escape to close)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && lightbox.style.display === 'block') {
            lightbox.style.display = 'none';
            
            // Resume slideshow after closing lightbox
            slideshowInterval = setInterval(showNextImage, 5000);
        }
    });
    
    // Define contact information for easy editing
    const contactInfo = {
        name: "Eddy Cuypers",
        phone: "+32 478 33 50 76",
        email: "bijeddycuypers@gmail.com",
        btw: "BE 0767.856.552",
        address: "Varsenareweg 26 8490 Jabbeke",
        mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5001.777419428182!2d3.1023781999999946!3d51.184274100000025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c3530398934cf3%3A0x1980492f06888712!2sVarsenareweg%2026%2C%208490%20Jabbeke!5e0!3m2!1snl!2sbe!4v1743355788659!5m2!1snl!2sbe"
    };
    
    // Set contact information on the page
    document.getElementById('contact-name').textContent = contactInfo.name;
    document.getElementById('contact-phone').textContent = contactInfo.phone;
    document.getElementById('contact-email').textContent = contactInfo.email;
    document.getElementById('contact-btw').textContent = contactInfo.btw;
    document.getElementById('contact-address').textContent = contactInfo.address;
    document.getElementById('google-map').src = contactInfo.mapEmbedUrl;
});