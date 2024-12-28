document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.querySelector(".navbar");
    const menuToggle = document.querySelector(".menu-toggle");
    const navbarLinks = document.querySelector(".navbar-links");

    if (menuToggle && navbarLinks) {
        menuToggle.addEventListener("click", () => {
            navbarLinks.classList.toggle("active");
        });
    }

    if (document.body.classList.contains("about-page") && navbar) {
        navbar.style.backgroundColor = "rgba(58, 54, 54, 0.66)";
        navbar.style.position = "fixed";
        navbar.style.top = "0";
        navbar.style.left = "0";
        navbar.style.right = "0";
        navbar.style.zIndex = "1000";
    }

    const featuredSection = document.querySelector("#featured-destinations");
    const backToTopButton = document.querySelector('.back-to-top');
    const scrollGuide = document.getElementById("scroll-guide");
    const header = document.querySelector("header");

    if (navbar || backToTopButton || scrollGuide || featuredSection || header) {
        window.addEventListener("scroll", () => {
            const scrollPosition = window.scrollY;
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const headerHeight = header ? header.offsetHeight : 0;
            const featuredTop = featuredSection ? featuredSection.getBoundingClientRect().top : Infinity;

            if (!document.body.classList.contains("about-page") && navbar) {
                if (featuredTop <= navbarHeight) {
                    navbar.style.backgroundColor = "rgba(58, 54, 54, 0.66)";
                    navbar.classList.add("scrolled");
                } else {
                    navbar.style.backgroundColor = "rgba(0, 0, 0, 0)";
                    navbar.classList.remove("scrolled");
                }
            }

            if (scrollGuide) {
                scrollGuide.style.display = scrollPosition < headerHeight ? "block" : "none";
                if (featuredTop <= 0) {
                    scrollGuide.style.display = "none";
                }
            }

            if (backToTopButton) {
                const documentHeight = document.documentElement.scrollHeight;
                const windowHeight = window.innerHeight;

                backToTopButton.style.display = (scrollPosition + windowHeight >= documentHeight - 250) ? "block" : "none";
            }
        });
    }

    if (backToTopButton) {
        backToTopButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    document.querySelectorAll('.destination-img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        });

        img.addEventListener('mouseleave', () => {
            img.style.transform = 'scale(1)';
        });

        img.addEventListener('click', () => {
            const imageUrl = img.style.backgroundImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
            showFullScreenPreview(imageUrl);
        });
    });

    window.showOverlay = (title, images, description) => {
        const overlayTitle = document.getElementById('overlay-title');
        const overlayText = document.getElementById('overlay-text');
        const overlayImagesContainer = document.getElementById('overlay-images');
        const overlay = document.getElementById('overlay');

        if (overlayTitle && overlayText && overlayImagesContainer && overlay) {
            overlayTitle.innerText = title;
            overlayText.innerText = description;

            overlayImagesContainer.innerHTML = '';
            images.forEach((imageSrc) => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = title;
                img.classList.add('overlay-image');
                img.onclick = () => showFullScreenPreview(imageSrc);
                overlayImagesContainer.appendChild(img);
            });

            overlay.style.display = 'flex';
        }
    };

    window.closeOverlay = () => {
        const overlay = document.getElementById('overlay');
        if (overlay) overlay.style.display = 'none';
    };

    window.showFullScreenPreview = (imageSrc) => {
        const fullScreenOverlay = document.getElementById('full-screen-overlay');
        const fullScreenImage = document.getElementById('full-screen-image');

        if (fullScreenOverlay && fullScreenImage) {
            fullScreenImage.src = imageSrc;
            fullScreenOverlay.style.display = 'flex';
        }
    };

    const fullScreenOverlay = document.getElementById('full-screen-overlay');
    if (fullScreenOverlay) {
        fullScreenOverlay.onclick = () => {
            fullScreenOverlay.style.display = 'none';
        };
    }

    const burgerMenu = document.getElementById('burger-menu');
    const burgerMenuContent = document.getElementById('burger-menu-content');

    burgerMenu.addEventListener('click', () => {
        if (burgerMenuContent.style.right === '0px') {
            burgerMenuContent.style.right = '-300px';
        } else {
            burgerMenuContent.style.right = '0px';
        }
    });

    document.addEventListener('click', (e) => {
        if (!burgerMenu.contains(e.target) && !burgerMenuContent.contains(e.target)) {
            burgerMenuContent.style.right = '-300px';
        }
    });

    const form = document.getElementById("contact-form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const overlay = document.getElementById("overlay");
    const closeOverlayButton = document.getElementById("close-overlay");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        
        let valid = true;

        if (nameField.value.trim() === "") {
            nameField.classList.add("error");
            valid = false;
        } else {
            nameField.classList.remove("error");
            nameField.classList.add("success");
        }

        if (emailField.value.trim() === "" || !emailField.value.includes("@")) {
            emailField.classList.add("error");
            valid = false;
        } else {
            emailField.classList.remove("error");
            emailField.classList.add("success");
        }

        if (messageField.value.trim() === "") {
            messageField.classList.add("error");
            valid = false;
        } else {
            messageField.classList.remove("error");
            messageField.classList.add("success");
        }

        if (valid) {
            overlay.style.display = "flex";
        }
    });

    closeOverlayButton.addEventListener("click", () => {
        overlay.style.display = "none";
        form.reset();
        nameField.classList.remove("success");
        emailField.classList.remove("success");
        messageField.classList.remove("success");
    });

});
