/* ==========================================
   ARTIFICIAL INTELLIGENCE & EDUCATION GLOBAL ACADEMY DENPASAR
   Interactive Application Logic & Event Handlers
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. Animated Stats Counters --- */
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    function animateCounters() {
        if (hasAnimated) return;

        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            if (!target) return;
            const duration = 1600; // ms
            const step = Math.max(1, Math.floor(duration / target));
            let current = 0;

            const counter = setInterval(() => {
                current += Math.ceil(target / 40);
                if (current >= target) {
                    stat.textContent = target.toLocaleString('id-ID');
                    clearInterval(counter);
                } else {
                    stat.textContent = current.toLocaleString('id-ID');
                }
            }, step);
        });

        hasAnimated = true;
    }

    const statsSection = document.querySelector('.stats-row');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
            }
        }, { threshold: 0.4 });
        observer.observe(statsSection);
    } else {
        setTimeout(animateCounters, 300);
    }


    /* --- 2. Mobile Drawer Navigation Toggle --- */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const drawerClose = document.getElementById('drawerClose');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const mobileDrawerContent = document.getElementById('mobileDrawerContent');

    const navMenu = document.getElementById('navMenu');
    if (navMenu && mobileDrawerContent) {
        mobileDrawerContent.innerHTML = '';
        const clonedMenu = navMenu.cloneNode(true);
        mobileDrawerContent.appendChild(clonedMenu);

        // Close drawer when clicking any nav link inside mobile drawer
        const drawerNavLinks = mobileDrawerContent.querySelectorAll('a');
        drawerNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileDrawer();
            });
        });
    }

    function openMobileDrawer() {
        if (mobileDrawer) mobileDrawer.classList.add('active');
        if (drawerOverlay) drawerOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', openMobileDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeMobileDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeMobileDrawer);


    /* --- 3. Class Schedule Tabs (Online Class vs Offline Class) --- */
    const tabScheduleBtns = document.querySelectorAll('.tab-schedule-btn');
    const scheduleCards = document.querySelectorAll('.schedule-card');
    const dayChips = document.querySelectorAll('.day-chip');

    let currentMode = 'online';
    let currentDay = 'all';

    function filterSchedules() {
        scheduleCards.forEach(card => {
            const cardMode = card.getAttribute('data-mode');
            const cardDay = card.getAttribute('data-day');

            const matchesMode = !cardMode || cardMode === currentMode;
            const matchesDay = currentDay === 'all' || !cardDay || cardDay.toLowerCase() === currentDay.toLowerCase();

            if (matchesMode && matchesDay) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    tabScheduleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabScheduleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const mode = btn.getAttribute('data-schedule-mode');
            if (mode) currentMode = mode;
            filterSchedules();
        });
    });

    dayChips.forEach(chip => {
        chip.addEventListener('click', () => {
            dayChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            const day = chip.getAttribute('data-day');
            if (day) currentDay = day;
            filterSchedules();
        });
    });

    if (scheduleCards.length > 0) {
        filterSchedules();
    }


    /* --- 4. Filter News & Publications by Category Tabs --- */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const newsCards = document.querySelectorAll('.news-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            newsCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });


    /* --- 5. Interactive Search Bar Filtering --- */
    const searchInput = document.getElementById('searchInput');
    const searchCategory = document.getElementById('searchCategory');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch() {
        if (!searchInput) return;
        const query = searchInput.value.trim().toLowerCase();
        const category = searchCategory ? searchCategory.value.toLowerCase() : 'all';

        let foundSchedule = false;
        scheduleCards.forEach(card => {
            const title = card.querySelector('.schedule-title')?.textContent.toLowerCase() || '';
            const meta = card.querySelector('.schedule-meta-info')?.textContent.toLowerCase() || '';
            if (query && (title.includes(query) || meta.includes(query))) {
                card.style.display = 'flex';
                foundSchedule = true;
            }
        });

        if (foundSchedule) {
            document.getElementById('schedules')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        newsCards.forEach(card => {
            const title = card.querySelector('.news-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.news-excerpt')?.textContent.toLowerCase() || '';
            const cardCategory = card.getAttribute('data-category');

            const matchesQuery = !query || title.includes(query) || excerpt.includes(query);
            const matchesCategory = category === 'all' || cardCategory === category;

            if (matchesQuery && matchesCategory) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });

        if (query) {
            document.getElementById('berita')?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (searchBtn) searchBtn.addEventListener('click', performSearch);
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }


    /* --- 6. Modal Controllers (Login & Contact / Enrollment) --- */
    function setupModal(openBtnId, closeBtnId, modalId) {
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = document.getElementById(closeBtnId);
        const modal = document.getElementById(modalId);

        if (!modal) return;

        if (openBtn) {
            openBtn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    setupModal('openLoginBtn', 'loginClose', 'loginModal');
    setupModal('openContactBtn', 'contactClose', 'contactModal');

    // Handle Schedule Enroll Buttons & All Contact CTAs to open enrollment modal
    const enrollBtns = document.querySelectorAll('.btn-enroll, .btn-contact');
    enrollBtns.forEach(btn => {
        if (btn.id === 'openContactBtn') return; // Handled by setupModal
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.schedule-card, .feature-card, .news-card');
            const contactModal = document.getElementById('contactModal');
            const contactMessage = document.getElementById('contactMessage');
            if (contactModal) {
                if (card) {
                    const courseTitle = card.querySelector('.schedule-title, .feature-title, .news-title')?.textContent || 'Program AI';
                    if (contactMessage) {
                        contactMessage.value = `Saya berminat mendaftar kelas: ${courseTitle}. Mohon informasi pendaftaran lebih lanjut.`;
                    }
                }
                contactModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            } else {
                window.location.href = 'pendaftaran.html';
            }
        });
    });


    /* --- 7. Form Submission Handlers & Auth Logic --- */
    // Password visibility toggle handler
    const togglePasswordBtns = document.querySelectorAll('.toggle-password-btn');
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const input = btn.previousElementSibling || btn.parentElement.querySelector('input');
            if (input) {
                const isPassword = input.type === 'password';
                input.type = isPassword ? 'text' : 'password';
                const icon = btn.querySelector('i');
                if (icon) {
                    icon.className = isPassword ? 'fas fa-eye-slash' : 'fas fa-eye';
                }
            }
        });
    });

    // Role switcher tabs on Login page
    const roleTabBtns = document.querySelectorAll('.role-tab-btn');
    const roleInputHidden = document.getElementById('userRoleInput');
    roleTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            roleTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const selectedRole = btn.getAttribute('data-role');
            if (roleInputHidden && selectedRole) {
                roleInputHidden.value = selectedRole;
            }
        });
    });

    // Login Form Handler (Client-side Demo fallback)
    const loginForm = document.getElementById('loginForm');
    const standaloneLoginForm = document.getElementById('standaloneLoginForm');
    const targetLoginForm = standaloneLoginForm || loginForm;

    if (targetLoginForm) {
        targetLoginForm.addEventListener('submit', (e) => {
            const actionAttr = targetLoginForm.getAttribute('action');
            // If action is login.php or external PHP backend, let standard form POST proceed
            if (actionAttr && actionAttr.endsWith('.php')) {
                return true; 
            }
            // Demo fallback if no PHP server running
            e.preventDefault();
            const roleEl = document.getElementById('userRole') || document.getElementById('userRoleInput');
            const role = roleEl ? roleEl.value : 'student';
            alert(`Selamat datang! Anda berhasil masuk ke Portal AI Global Academy Denpasar sebagai ${role.toUpperCase()}.`);
            const loginModal = document.getElementById('loginModal');
            if (loginModal) loginModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Register Form Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        const passwordInput = document.getElementById('regPassword');
        const confirmPasswordInput = document.getElementById('regConfirmPassword');

        registerForm.addEventListener('submit', (e) => {
            if (passwordInput && confirmPasswordInput) {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    e.preventDefault();
                    alert('Konfirmasi Kata Sandi tidak cocok dengan Kata Sandi Anda! Silakan periksa kembali.');
                    confirmPasswordInput.focus();
                    return false;
                }
            }

            const actionAttr = registerForm.getAttribute('action');
            if (actionAttr && actionAttr.endsWith('.php')) {
                return true;
            }

            e.preventDefault();
            alert('Pendaftaran berhasil! Akun Anda telah dibuat di AI Global Academy Denpasar. Silakan masuk dengan email dan kata sandi Anda.');
            window.location.href = 'login.html';
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pendaftaran / Pesan Anda telah berhasil dikirim! Tim Admissions AI & Education Global Academy Denpasar akan menghubungi Anda dalam 1x24 jam.');
            const contactModal = document.getElementById('contactModal');
            if (contactModal) contactModal.classList.remove('active');
            document.body.style.overflow = '';
            contactForm.reset();
        });
    }


    /* --- 8. Read More Buttons Popup --- */
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.news-card');
            if (card) {
                const title = card.querySelector('.news-title')?.textContent || 'Berita AI Academy';
                const excerpt = card.querySelector('.news-excerpt')?.textContent || 'Informasi lengkap mengenai berita dan event akademi.';
                alert(`${title}\n\n${excerpt}`);
            }
        });
    });


    /* --- 9. Active Page Highlight & FAQ Accordion --- */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-list .nav-item');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                item.classList.add('active');
            } else if (href && !href.startsWith('#') && href !== currentPage) {
                item.classList.remove('active');
            }
        }
    });

    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.closest('.faq-item');
            if (!item) return;
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

});

