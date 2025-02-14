document.addEventListener("DOMContentLoaded", () => {
    const logoContainer = document.getElementById("logo-container");
    const mainContent = document.getElementById("main-content");
    const footer = document.getElementById("footer");
    const discordBtn = document.getElementById("discord-btn");

    // Initially hide the logo parts
    gsap.set("#logo-body", { opacity: 0, x: -300, y: -300 });
    gsap.set("#logo-wings", { opacity: 0, x: 300, y: -300 });
    gsap.set("#logo-eye", { opacity: 0, scale: 0 });
    gsap.set("#logo-name", { opacity: 0, y: 200 });

    // GSAP Animation Timeline for flying in logo parts
    gsap.timeline()
        .to("#logo-body", { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out" })
        .to("#logo-wings", { opacity: 1, x: 0, y: 0, duration: 1, ease: "power3.out" }, "-=1.3")
        .to("#logo-eye", { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" }, "-=1.3")
        .to("#logo-name", { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=1.2")

        // Eye Glamour Effect (Flashing Star Effect)
        .to("#logo-eye", { scale: 1.3, duration: 0.3, repeat: 1, yoyo: true, ease: "power1.inOut" })
        .to("#logo-eye", { scale: 1, duration: 0.5, ease: "power1.out" })

        // Shrink and move logo to the top
        .to("#logo-container", { scale: 0.3, top: "5%", duration: 1, ease: "power3.out" })
        .to("#logo-container", { opacity: 0, display: "none", duration: 1 })

        // Show the main content with fade-in effect
        .to("#main-content", { display: "block", opacity: 1, duration: 0.3 })
        
        // Trigger background animation
        .add(() => {
            document.body.classList.add('animate-background');
        })

        // Show the footer
        .to("#footer", { display: "block", opacity: 1, duration: 0.3 });

    // Smooth fade-in effect for sections
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                entry.target.classList.remove("hidden");
            } else {
                entry.target.classList.add("hidden");
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Discord button action
    discordBtn.addEventListener("click", () => {
        window.open("https://discord.gg/T23pYpYmCg", "_blank");
    });

    // Carousel functionality
    const images = [
        'assets/sabeh1.png',
        'assets/sabeh2.png',
    ];
    let currentIndex = 0;

    let carouselImage = document.querySelector('.carousel-image');
    const leftButton = document.querySelector('.carousel-button.left');
    const rightButton = document.querySelector('.carousel-button.right');

    function updateImage(index, direction) {
        const newImage = document.createElement('img');
        newImage.src = images[index];
        newImage.classList.add('carousel-image');
        newImage.style.position = 'absolute';
        newImage.style.top = '0';
        newImage.style[direction] = '100%';
        carouselImage.parentElement.appendChild(newImage);

        setTimeout(() => {
            newImage.style[direction] = '0';
            carouselImage.style[direction] = '-100%';
        }, 10);

        setTimeout(() => {
            carouselImage.parentElement.removeChild(carouselImage);
            carouselImage = newImage;
            carouselImage.style.position = 'relative';
            carouselImage.style[direction] = 'auto';
        }, 510); // Duration of the slide transition
    }

    leftButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
        updateImage(currentIndex, 'left');
    });

    rightButton.addEventListener('click', () => {
        currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
        updateImage(currentIndex, 'right');
    });

    // Initialize with the first image
    updateImage(currentIndex, 'right');
});