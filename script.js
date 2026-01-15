// MiniMax Landing Page - JavaScript for FOMO, Countdown, and Interactivity

document.addEventListener('DOMContentLoaded', function() {

    // ===== COUNTDOWN TIMER =====
    function initCountdown() {
        // Set end date to 2 days and some hours from now
        const now = new Date();
        const endDate = new Date(now.getTime() + (2 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (37 * 60 * 1000));

        // Store in localStorage to persist across page loads
        if (!localStorage.getItem('minimax_countdown_end')) {
            localStorage.setItem('minimax_countdown_end', endDate.getTime());
        }

        const storedEnd = parseInt(localStorage.getItem('minimax_countdown_end'));

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = storedEnd - now;

            if (distance < 0) {
                // Reset countdown if expired
                localStorage.removeItem('minimax_countdown_end');
                location.reload();
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update header countdown
            document.getElementById('days').textContent = String(days).padStart(2, '0');
            document.getElementById('hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

            // Update final countdown
            document.getElementById('final-days').textContent = String(days).padStart(2, '0');
            document.getElementById('final-hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('final-minutes').textContent = String(minutes).padStart(2, '0');
            document.getElementById('final-seconds').textContent = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    initCountdown();

    // ===== FOMO POPUPS - REALISTIC RANDOM TIMING =====
    const fomoData = [
        { name: 'Chen Wei (陈伟)', location: 'Shanghai, China', action: 'just signed up for Pro Plan', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
        { name: 'Zhang Mei (张梅)', location: 'Beijing, China', action: 'claimed 10% discount', image: 'https://randomuser.me/api/portraits/women/44.jpg' },
        { name: 'Liu Yang (刘洋)', location: 'Shenzhen, China', action: 'upgraded to Enterprise', image: 'https://randomuser.me/api/portraits/men/22.jpg' },
        { name: 'Wang Fang (王芳)', location: 'Hangzhou, China', action: 'just started free trial', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
        { name: 'Li Ming (李明)', location: 'Guangzhou, China', action: 'saved $847 this month', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
        { name: 'Huang Lei (黄磊)', location: 'Chengdu, China', action: 'just signed up', image: 'https://randomuser.me/api/portraits/men/67.jpg' },
        { name: 'Zhou Jie (周杰)', location: 'Wuhan, China', action: 'referred 3 friends', image: 'https://randomuser.me/api/portraits/men/55.jpg' },
        { name: 'Li Na (李娜)', location: 'Nanjing, China', action: 'claimed New Year bonus', image: 'https://randomuser.me/api/portraits/women/33.jpg' },
        { name: 'Wu Hong (吴红)', location: 'Xi\'an, China', action: 'just upgraded', image: 'https://randomuser.me/api/portraits/women/25.jpg' },
        { name: 'Sun Tao (孙涛)', location: 'Suzhou, China', action: 'activated Pro features', image: 'https://randomuser.me/api/portraits/men/36.jpg' },
        { name: 'Ma Lin (马琳)', location: 'Tianjin, China', action: 'saved $1,200 already', image: 'https://randomuser.me/api/portraits/women/42.jpg' },
        { name: 'Zhao Jun (赵军)', location: 'Qingdao, China', action: 'just got API key', image: 'https://randomuser.me/api/portraits/men/28.jpg' },
        { name: 'Xu Wei (徐伟)', location: 'Dalian, China', action: 'completed first project', image: 'https://randomuser.me/api/portraits/men/41.jpg' },
        { name: 'Tang Min (唐敏)', location: 'Xiamen, China', action: 'just subscribed', image: 'https://randomuser.me/api/portraits/women/51.jpg' },
        { name: 'Gao Feng (高峰)', location: 'Ningbo, China', action: 'invited team members', image: 'https://randomuser.me/api/portraits/men/52.jpg' },
        { name: 'Lin Jing (林静)', location: 'Changsha, China', action: 'claimed 10% OFF', image: 'https://randomuser.me/api/portraits/women/38.jpg' },
        { name: 'Yang Chen (杨晨)', location: 'Foshan, China', action: 'started coding plan', image: 'https://randomuser.me/api/portraits/men/62.jpg' },
        { name: 'Deng Li (邓丽)', location: 'Dongguan, China', action: 'just registered', image: 'https://randomuser.me/api/portraits/women/48.jpg' },
        { name: 'Luo Wei (罗伟)', location: 'Zhengzhou, China', action: 'upgraded plan', image: 'https://randomuser.me/api/portraits/men/73.jpg' },
        { name: 'Jiang Hua (蒋华)', location: 'Jinan, China', action: 'activated API access', image: 'https://randomuser.me/api/portraits/women/56.jpg' }
    ];

    const timeAgoOptions = ['just now', '1 minute ago', '2 minutes ago', '3 minutes ago', '5 minutes ago', 'moments ago'];

    let fomoQueue = [...fomoData];
    let isShowingFomo = false;

    function shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function getRandomTime() {
        return timeAgoOptions[Math.floor(Math.random() * timeAgoOptions.length)];
    }

    function showFomoPopup() {
        if (isShowingFomo) return;

        // Reshuffle when queue is empty
        if (fomoQueue.length === 0) {
            fomoQueue = shuffleArray(fomoData);
        }

        const data = fomoQueue.pop();
        isShowingFomo = true;

        const container = document.getElementById('fomo-container');
        const popup = document.createElement('div');
        popup.className = 'fomo-popup';
        popup.innerHTML = `
            <img src="${data.image}" alt="${data.name}">
            <div class="fomo-content">
                <div class="fomo-name">${data.name}</div>
                <div class="fomo-action">${data.action}</div>
                <div class="fomo-time">${data.location} • ${getRandomTime()}</div>
            </div>
        `;

        container.appendChild(popup);

        // Remove popup after animation
        setTimeout(() => {
            popup.remove();
            isShowingFomo = false;
        }, 5000);
    }

    // Random intervals between 3-8 seconds for realistic feel
    function scheduleNextFomo() {
        const randomDelay = Math.random() * 5000 + 3000; // 3-8 seconds
        setTimeout(() => {
            showFomoPopup();
            scheduleNextFomo();
        }, randomDelay);
    }

    // Start FOMO popups after 3 second delay
    setTimeout(() => {
        shuffleArray(fomoData);
        fomoQueue = shuffleArray(fomoData);
        showFomoPopup();
        scheduleNextFomo();
    }, 3000);

    // ===== ANIMATED COUNTERS =====
    function animateCounters() {
        const counters = document.querySelectorAll('.loss-number');

        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            if (!target) return;

            const prefix = counter.textContent.includes('$') ? '$' : '';
            let current = 0;
            const increment = target / 100;
            const duration = 2000;
            const stepTime = duration / 100;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    counter.textContent = prefix + Math.floor(current).toLocaleString();
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.textContent = prefix + target.toLocaleString();
                }
            };

            // Start when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }

    animateCounters();

    // ===== EXIT INTENT POPUP =====
    let exitShown = false;

    document.addEventListener('mouseout', function(e) {
        if (exitShown) return;

        // Detect if mouse is leaving the viewport from the top
        if (e.clientY < 10 && e.relatedTarget === null) {
            document.getElementById('exit-popup').classList.add('active');
            exitShown = true;
        }
    });

    // Close exit popup
    document.querySelector('.close-popup').addEventListener('click', function() {
        document.getElementById('exit-popup').classList.remove('active');
    });

    // Close on background click
    document.getElementById('exit-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== SPOTS LEFT COUNTER =====
    function updateSpotsLeft() {
        const spotsElement = document.querySelector('.spots-left strong');
        if (spotsElement) {
            let spots = parseInt(localStorage.getItem('minimax_spots') || '47');

            // Randomly decrease spots occasionally
            if (Math.random() < 0.1) {
                spots = Math.max(12, spots - 1);
                localStorage.setItem('minimax_spots', spots);
            }

            spotsElement.textContent = spots + ' spots left';
        }
    }

    setInterval(updateSpotsLeft, 30000); // Update every 30 seconds

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Add fade-in animation to cards
    document.querySelectorAll('.problem-card, .feature-card, .testimonial-card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        fadeInObserver.observe(el);
    });

    // ===== BUTTON CLICK TRACKING =====
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            // Add a quick pulse effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 100);
        });
    });

    // ===== LIVE VISITOR COUNT =====
    function updateVisitorCount() {
        const baseVisitors = 127;
        const variance = Math.floor(Math.random() * 30) - 15;
        const currentVisitors = baseVisitors + variance;

        // Could display this somewhere if needed
        console.log('Current visitors:', currentVisitors);
    }

    setInterval(updateVisitorCount, 10000);

    // ===== PRELOAD IMAGES =====
    fomoData.forEach(data => {
        const img = new Image();
        img.src = data.image;
    });

});
