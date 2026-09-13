      // Mobile menu
      document
        .getElementById("mobileMenuBtn")
        .addEventListener("click", function () {
          document.getElementById("mobileMenu").classList.toggle("hidden");
        });

      // Scroll reveal
      const revealEls = document.querySelectorAll(".reveal");
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) entry.target.classList.add("active");
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
      );
      revealEls.forEach((el) => revealObserver.observe(el));

      // Like button
      function toggleLike(btn) {
        btn.classList.toggle("liked");
        const icon = btn.querySelector("i");
        const count = btn.querySelector(".like-count");
        if (btn.classList.contains("liked")) {
          icon.classList.remove("far");
          icon.classList.add("fas");
          count.textContent = "31 likes";
        } else {
          icon.classList.remove("fas");
          icon.classList.add("far");
          count.textContent = "30 likes";
        }
      }

      // Buy button
      function buyItem(btn) {
        const original = btn.textContent;
        btn.textContent = "Added!";
        btn.style.backgroundColor = "#4a7c59";
        setTimeout(() => {
          btn.textContent = original;
          btn.style.backgroundColor = "";
        }, 1500);
      }

      // Shake slider (mobile)
      const slider = document.getElementById("shakeSlider");
      const dots = document.querySelectorAll(".pagination-dot");
      let isDragging = false,
        startX = 0,
        scrollStart = 0,
        currentIndex = 0,
        isMobile = window.innerWidth < 768;

      function updateDots(index) {
        dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
        currentIndex = index;
      }
      function getCardWidth() {
        const card = slider.querySelector(".shake-card");
        return card ? card.offsetWidth : window.innerWidth;
      }
      function snapToCard(index) {
        if (!isMobile) return;
        const width = getCardWidth();
        slider.scrollTo({ left: index * width, behavior: "smooth" });
        updateDots(index);
      }

      slider.addEventListener(
        "touchstart",
        (e) => {
          if (!isMobile) return;
          isDragging = true;
          slider.classList.add("dragging");
          startX = e.touches[0].pageX;
          scrollStart = slider.scrollLeft;
        },
        { passive: true },
      );
      slider.addEventListener(
        "touchend",
        () => {
          if (!isMobile || !isDragging) return;
          isDragging = false;
          slider.classList.remove("dragging");
          const width = getCardWidth();
          const newIndex = Math.round(slider.scrollLeft / width);
          snapToCard(Math.max(0, Math.min(newIndex, 5)));
        },
        { passive: true },
      );
      slider.addEventListener(
        "touchmove",
        (e) => {
          if (!isMobile || !isDragging) return;
          const x = e.touches[0].pageX;
          const walk = (startX - x) * 1.2;
          slider.scrollLeft = scrollStart + walk;
        },
        { passive: true },
      );

      slider.addEventListener("mousedown", (e) => {
        if (!isMobile) return;
        isDragging = true;
        slider.classList.add("dragging");
        startX = e.pageX;
        scrollStart = slider.scrollLeft;
      });
      slider.addEventListener("mouseleave", () => {
        if (!isMobile || !isDragging) return;
        isDragging = false;
        slider.classList.remove("dragging");
        const width = getCardWidth();
        const newIndex = Math.round(slider.scrollLeft / width);
        snapToCard(Math.max(0, Math.min(newIndex, 5)));
      });
      slider.addEventListener("mouseup", () => {
        if (!isMobile || !isDragging) return;
        isDragging = false;
        slider.classList.remove("dragging");
        const width = getCardWidth();
        const newIndex = Math.round(slider.scrollLeft / width);
        snapToCard(Math.max(0, Math.min(newIndex, 5)));
      });
      slider.addEventListener("mousemove", (e) => {
        if (!isMobile || !isDragging) return;
        e.preventDefault();
        const x = e.pageX;
        const walk = (startX - x) * 1.2;
        slider.scrollLeft = scrollStart + walk;
      });

      slider.addEventListener(
        "scroll",
        () => {
          if (!isMobile || isDragging) return;
          const width = getCardWidth();
          const newIndex = Math.round(slider.scrollLeft / width);
          if (newIndex !== currentIndex && newIndex >= 0 && newIndex <= 5)
            updateDots(newIndex);
        },
        { passive: true },
      );

      dots.forEach((dot, index) =>
        dot.addEventListener("click", () => {
          if (!isMobile) return;
          snapToCard(index);
        }),
      );

      window.addEventListener("resize", () => {
        const wasMobile = isMobile;
        isMobile = window.innerWidth < 768;
        if (wasMobile && !isMobile) slider.scrollLeft = 0;
      });

      // Blog card click feedback
      document.querySelectorAll(".blog-card").forEach((card) => {
        card.addEventListener("click", (e) => {
          if (e.target.tagName === "BUTTON") return;
          card.style.transform = "scale(0.98)";
          setTimeout(() => (card.style.transform = ""), 150);
        });
      });
      document.querySelectorAll(".read-more-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          const original = btn.textContent;
          btn.textContent = "Loading...";
          btn.style.background = "#6B5A45";
          setTimeout(() => {
            btn.textContent = original;
            btn.style.background = "";
          }, 1200);
        });
      });

      // Footer link dummy
      document
        .querySelectorAll(".footer-link, .bottom-link")
        .forEach((link) =>
          link.addEventListener("click", (e) => e.preventDefault()),
        );

      // Parallax effect hero image
      const parallaxImg = document.querySelector(".parallax-img");
      window.addEventListener("scroll", () => {
        if (parallaxImg)
          parallaxImg.style.transform = `translateY(${window.pageYOffset * 0.1}px)`;
      });

      // Smooth anchor
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target)
            target.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      });

      // category card pulse
      document.querySelectorAll(".category-card").forEach((card) => {
        card.addEventListener("click", () => {
          card.style.transform = "scale(0.98)";
          setTimeout(() => (card.style.transform = ""), 150);
        });
      });


      

        // ===== Scroll Reveal =====
        // const revealEls = document.querySelectorAll('.reveal');
        // const revealObserver = new IntersectionObserver((entries) => {
        //     entries.forEach(entry => {
        //         if (entry.isIntersecting) {
        //             entry.target.classList.add('active');
        //         }
        //     });
        // }, { threshold: 0.1 });

        // revealEls.forEach(el => revealObserver.observe(el));

        // ===== Heart Toggle =====
        function toggleHeart(icon) {
            icon.classList.toggle('liked');
            if (icon.classList.contains('liked')) {
                icon.style.transform = 'scale(1.3)';
                setTimeout(() => icon.style.transform = '', 200);
            }
        }

        // ===== See More Button =====
        function seeMore(btn) {
            const original = btn.textContent;
            btn.textContent = 'Loading...';
            btn.style.background = '#6B5A45';
            setTimeout(() => {
                btn.textContent = original;
                btn.style.background = '';
            }, 1200);
        }

        // ===== DESKTOP SLIDER =====
        const track = document.getElementById('sliderTrack');
        const cards = document.querySelectorAll('.service-card');
        const totalCards = cards.length;
        let currentSlide = 0;
        let cardsPerView = 3;

        function updateCardsPerView() {
            const w = window.innerWidth;
            if (w < 768) {
                cardsPerView = 1;
            } else if (w < 1024) {
                cardsPerView = 2;
            } else {
                cardsPerView = 3;
            }
        }

        function goToSlide(index) {
            updateCardsPerView();
            const maxSlide = Math.ceil(totalCards / cardsPerView) - 1;
            currentSlide = Math.max(0, Math.min(index, maxSlide));

            const cardWidth = cards[0].offsetWidth;
            const gap = 20;
            track.style.transform = `translateX(-${currentSlide * (cardWidth * cardsPerView + gap * cardsPerView)}px)`;

            updateDesktopDots();
            updateArrowStates(maxSlide);
        }

        function updateArrowStates(maxSlide) {
            document.getElementById('prevBtn').disabled = currentSlide === 0;
            document.getElementById('nextBtn').disabled = currentSlide >= maxSlide;
        }

        function updateDesktopDots() {
            const dots = document.querySelectorAll('#paginationDots .pagination-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentSlide);
            });
        }

        // ===== MOBILE TOUCH SLIDER =====
        // const slider = document.getElementById('serviceSlider');
        // let isDragging = false;
        // let startX = 0;
        // let scrollStart = 0;
        // let currentMobileIndex = 0;

        slider.addEventListener('touchstart', (e) => {
            if (window.innerWidth >= 768) return;
            isDragging = true;
            slider.classList.add('dragging');
            startX = e.touches[0].pageX;
            scrollStart = slider.scrollLeft;
        }, { passive: true });

        slider.addEventListener('touchend', () => {
            if (window.innerWidth >= 768 || !isDragging) return;
            isDragging = false;
            slider.classList.remove('dragging');
            snapToNearest();
        }, { passive: true });

        slider.addEventListener('touchmove', (e) => {
            if (window.innerWidth >= 768 || !isDragging) return;
            const x = e.touches[0].pageX;
            const walk = (startX - x) * 1.2;
            slider.scrollLeft = scrollStart + walk;
        }, { passive: true });

        // Mouse drag for testing
        slider.addEventListener('mousedown', (e) => {
            if (window.innerWidth >= 768) return;
            isDragging = true;
            slider.classList.add('dragging');
            startX = e.pageX;
            scrollStart = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 768 || !isDragging) return;
            isDragging = false;
            slider.classList.remove('dragging');
            snapToNearest();
        });

        slider.addEventListener('mouseup', () => {
            if (window.innerWidth >= 768 || !isDragging) return;
            isDragging = false;
            slider.classList.remove('dragging');
            snapToNearest();
        });

        slider.addEventListener('mousemove', (e) => {
            if (window.innerWidth >= 768 || !isDragging) return;
            e.preventDefault();
            const x = e.pageX;
            const walk = (startX - x) * 1.2;
            slider.scrollLeft = scrollStart + walk;
        });

        function snapToNearest() {
            if (window.innerWidth >= 768) return;
            const card = slider.querySelector('.service-card');
            const cardWidth = card.offsetWidth;
            const newIndex = Math.round(slider.scrollLeft / cardWidth);
            const clamped = Math.max(0, Math.min(newIndex, 5));
            snapToCard(clamped);
        }

        function snapToCard(index) {
            if (window.innerWidth >= 768) return;
            const card = slider.querySelector('.service-card');
            const cardWidth = card.offsetWidth;
            slider.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
            updateMobileDots(index);
            currentMobileIndex = index;
        }

        function updateMobileDots(index) {
            const dots = document.querySelectorAll('#mobileDots .pagination-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        slider.addEventListener('scroll', () => {
            if (window.innerWidth >= 768 || isDragging) return;
            const card = slider.querySelector('.service-card');
            const cardWidth = card.offsetWidth;
            const newIndex = Math.round(slider.scrollLeft / cardWidth);
            if (newIndex !== currentMobileIndex && newIndex >= 0 && newIndex <= 5) {
                updateMobileDots(newIndex);
                currentMobileIndex = newIndex;
            }
        }, { passive: true });

        // Init
        updateCardsPerView();
        updateArrowStates(Math.ceil(totalCards / cardsPerView) - 1);

        window.addEventListener('resize', () => {
            updateCardsPerView();
            if (window.innerWidth >= 768) {
                track.style.transform = `translateX(-${currentSlide * (cards[0].offsetWidth * cardsPerView + 20 * cardsPerView)}px)`;
            }
        });
    

        

    // ===== Carousel Scroll =====
    function scrollCarousel(type, direction) {
        const carousel = document.getElementById(type + 'Carousel');
        const scrollAmount = 300;
        carousel.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
    }

    // ===== Wishlist Toggle =====
    function toggleWishlist(btn) {
        btn.classList.toggle('active');
        const icon = btn.querySelector('i');
        if (btn.classList.contains('active')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
        }
    }

    // ===== Newsletter Subscribe =====
    function handleSubscribe(e) {
        e.preventDefault();
        const btn = e.target.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#5c4033';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            e.target.reset();
        }, 2000);
    }

   
