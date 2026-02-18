// ============================================
// LA HUERTA SAN SEBASTIÁN
// Landing Page Interactions - Redesign
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CAROUSEL
    // ============================================
    
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-arrow.prev');
    const nextBtn = document.querySelector('.carousel-arrow.next');
    let currentSlide = 0;
    let autoplayInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + slides.length) % slides.length;
        
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoplay();
            startAutoplay();
        });

        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoplay();
            startAutoplay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    startAutoplay();

    // ============================================
    // FAQ ACCORDION
    // ============================================
    
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQs
            faqItems.forEach(faq => faq.classList.remove('active'));
            
            // Open clicked FAQ if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ============================================
    // SMOOTH SCROLLING
    // ============================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 100;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // CONTACT FORM
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                firstName: this.firstName.value,
                lastName: this.lastName.value,
                email: this.email.value,
                phone: this.phone.value,
                property: this.property.value,
                message: this.message.value
            };
            
            // Create email body
            const emailBody = `
New Inquiry — La Huerta San Sebastián

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INQUIRY DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Property of Interest: ${formData.property || 'General inquiry'}

Message:
${formData.message || 'No message provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString('en-US', { 
    timeZone: 'America/Mazatlan',
    dateStyle: 'full',
    timeStyle: 'short'
})}
            `.trim();
            
            // Create mailto link
            const subject = encodeURIComponent(`La Huerta Inquiry — ${formData.property || 'General'} — ${formData.firstName} ${formData.lastName}`);
            const body = encodeURIComponent(emailBody);
            const mailtoLink = `mailto:tyson@ricardoamigo.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            if (successMessage) {
                successMessage.classList.add('show');
                contactForm.reset();
                
                setTimeout(() => {
                    successMessage.classList.remove('show');
                }, 5000);
            }
        });
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for fade-in
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    
    const header = document.querySelector('.header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(250, 248, 245, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
        } else {
            header.style.background = 'rgba(250, 248, 245, 0.95)';
            header.style.boxShadow = '0 1px 0 rgba(42, 37, 33, 0.08)';
        }
        
        lastScroll = currentScroll;
    });
});
    
    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.name.value,
                email: this.email.value,
                phone: this.phone.value,
                property: this.property.value,
                message: this.message.value
            };
            
            // Create email body
            const emailBody = `
New Inquiry — La Huerta San Sebastián

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
INQUIRY DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Property of Interest: ${formData.property}

Message:
${formData.message || 'No additional message provided.'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString('en-US', { 
    timeZone: 'America/Mazatlan',
    dateStyle: 'full',
    timeStyle: 'short'
})}
            `.trim();
            
            // Create mailto link
            const subject = encodeURIComponent(`La Huerta Inquiry — ${formData.property} — ${formData.name}`);
            const body = encodeURIComponent(emailBody);
            const mailtoLink = `mailto:tyson@ricardoamigo.com?subject=${subject}&body=${body}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show subtle confirmation
            showConfirmation();
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });
    }
    
    function showConfirmation() {
        const confirmation = document.createElement('div');
        confirmation.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #2A2521;
            color: #FFFCF7;
            padding: 2rem 3rem;
            font-family: 'PP Fraktion Mono', monospace;
            font-size: 0.875rem;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        confirmation.textContent = 'Opening email client...';
        
        document.body.appendChild(confirmation);
        
        setTimeout(() => {
            confirmation.style.opacity = '1';
        }, 10);
        
        setTimeout(() => {
            confirmation.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(confirmation);
            }, 300);
        }, 2500);
    }
    
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe residence showcases
    document.querySelectorAll('.residence-showcase').forEach(residence => {
        fadeObserver.observe(residence);
    });
    
    // Navigation background on scroll
    const nav = document.querySelector('.nav-minimal');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'rgba(250, 248, 245, 0.98)';
            nav.style.boxShadow = '0 1px 0 rgba(42, 37, 33, 0.08)';
        } else {
            nav.style.background = 'rgba(250, 248, 245, 0.95)';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Image loading (no fade animation)
    const images = document.querySelectorAll('img[src]');
    images.forEach(img => {
        if (!img.complete) {
            img.style.opacity = '0';
            img.addEventListener('load', () => {
                img.style.opacity = '1';
                img.style.transition = 'opacity 0.3s ease';
            });
        }
    });
});
