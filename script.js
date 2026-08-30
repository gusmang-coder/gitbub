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


    /* --- 2. Mobile Drawer Navigation Toggle & Dynamic Menu --- */
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

        // Enhance dropdown items in mobile drawer with interactive accordion
        const drawerDropdownItems = mobileDrawerContent.querySelectorAll('.nav-item.dropdown');
        drawerDropdownItems.forEach(item => {
            const mainLink = item.querySelector('.nav-link');
            if (mainLink) {
                mainLink.addEventListener('click', (e) => {
                    e.preventDefault();
                    const isOpen = item.classList.contains('open');
                    // Optional: close other open dropdowns for accordion effect
                    drawerDropdownItems.forEach(other => {
                        if (other !== item) other.classList.remove('open');
                    });
                    item.classList.toggle('open', !isOpen);
                });
            }
        });

        // Add Sign In and Registration CTA actions inside Mobile Drawer
        const drawerActions = document.createElement('div');
        drawerActions.className = 'drawer-auth-actions';
        drawerActions.innerHTML = `
            <button class="btn-drawer-login" id="mobileDrawerLoginBtn">
                <i class="far fa-user"></i> Portal Student (Sign In)
            </button>
            <a href="pendaftaran.html" class="btn-drawer-register" id="mobileDrawerRegisterBtn">
                <i class="fas fa-user-plus"></i> Daftar Sekarang
            </a>
        `;
        mobileDrawerContent.appendChild(drawerActions);

        // Bind Mobile Sign In Button
        const mobileDrawerLoginBtn = document.getElementById('mobileDrawerLoginBtn');
        if (mobileDrawerLoginBtn) {
            mobileDrawerLoginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeMobileDrawer();
                const loginModal = document.getElementById('loginModal');
                if (loginModal) {
                    setTimeout(() => {
                        loginModal.classList.add('active');
                        document.body.style.overflow = 'hidden';
                    }, 250);
                } else {
                    window.location.href = 'login.html';
                }
            });
        }

        // Close drawer when clicking any standard leaf link inside mobile drawer
        const drawerNavLinks = mobileDrawerContent.querySelectorAll('.dropdown-menu a, .nav-item:not(.dropdown) a');
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


    /* --- 8. Publication Interactive Dropdown Accordions & News Handling --- */
    const allNewsCards = document.querySelectorAll('.news-card');

    allNewsCards.forEach(card => {
        const dropdownBtn = card.querySelector('.read-more-btn');
        const fullDetails = card.querySelector('.news-full-details');
        const originalBtnText = dropdownBtn ? dropdownBtn.querySelector('span')?.textContent || dropdownBtn.textContent.trim() : 'Baca Selengkapnya';

        // Toggle function for expanding/collapsing article details
        function toggleArticle(e) {
            // Do not toggle if clicking directly on a CTA link, form element, or button inside full-details
            if (e && e.target.closest('.news-cta-btn, .modal-backdrop, form, input, select, textarea')) {
                return;
            }

            // If card has href and NO full-details (e.g. basic redirect card), allow standard navigation
            if (!fullDetails && card.hasAttribute('data-href')) {
                window.location.href = card.getAttribute('data-href');
                return;
            }

            if (!fullDetails) return;

            const isExpanded = card.classList.contains('expanded');
            
            // Toggle expanded class
            card.classList.toggle('expanded', !isExpanded);

            // Update button text and chevron
            if (dropdownBtn) {
                const textSpan = dropdownBtn.querySelector('span');
                if (!isExpanded) {
                    if (textSpan) textSpan.textContent = 'Tutup Deskripsi';
                    else dropdownBtn.innerHTML = '<span>Tutup Deskripsi</span> <i class="fas fa-chevron-down dropdown-arrow"></i>';
                } else {
                    if (textSpan) textSpan.textContent = originalBtnText;
                    else dropdownBtn.innerHTML = `<span>${originalBtnText}</span> <i class="fas fa-chevron-down dropdown-arrow"></i>`;
                }
            }

            // Smoothly scroll to keep card visible if opening on mobile
            if (!isExpanded && window.innerWidth < 768) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 150);
            }
        }

        // Bind dropdown button click
        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleArticle(e);
            });
        }

        // Bind card header/body click to also toggle accordion if fullDetails exists
        if (fullDetails) {
            card.addEventListener('click', (e) => {
                // If clicked an anchor with valid href that isn't javascript:void, let it navigate
                if (e.target.closest('a:not(.article-dropdown-btn)')) return;
                toggleArticle(e);
            });
        }

        // Handle inner CTA buttons inside full details (e.g. "Daftar Beasiswa Ini", "Ikuti Workshop")
        const innerCtaBtns = card.querySelectorAll('.news-cta-btn');
        innerCtaBtns.forEach(cta => {
            cta.addEventListener('click', (e) => {
                const href = cta.getAttribute('href');
                if (href && href !== '#' && !href.startsWith('javascript:')) {
                    return; // native link to pendaftaran.html
                }
                e.preventDefault();
                e.stopPropagation();
                const title = card.querySelector('.news-title')?.textContent.trim() || 'Publikasi AI Academy';
                const contactModal = document.getElementById('contactModal');
                const contactMessage = document.getElementById('contactMessage');
                if (contactModal) {
                    if (contactMessage) {
                        contactMessage.value = `Saya berminat mendaftar / informasi untuk: ${title}. Mohon informasi jadwal dan panduan pendaftarannya.`;
                    }
                    contactModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                } else {
                    window.location.href = 'pendaftaran.html';
                }
            });
        });
    });


    /* --- 9. Feature Card Accordions (Partners & Admission Tracks) --- */
    const allFeatureCards = document.querySelectorAll('.feature-card');

    allFeatureCards.forEach(card => {
        const dropdownBtn = card.querySelector('.feature-dropdown-btn');
        const fullDetails = card.querySelector('.feature-full-details');
        if (!fullDetails) return;

        const originalBtnText = dropdownBtn ? dropdownBtn.querySelector('span')?.textContent || dropdownBtn.textContent.trim() : 'Baca Selengkapnya';

        function toggleFeature(e) {
            if (e && e.target.closest('a, button:not(.feature-dropdown-btn), form, input, select, textarea')) {
                return;
            }

            const isExpanded = card.classList.contains('expanded');
            card.classList.toggle('expanded', !isExpanded);

            if (dropdownBtn) {
                const textSpan = dropdownBtn.querySelector('span');
                if (!isExpanded) {
                    if (textSpan) textSpan.textContent = 'Tutup Deskripsi';
                    else dropdownBtn.innerHTML = '<span>Tutup Deskripsi</span> <i class="fas fa-chevron-down dropdown-arrow"></i>';
                } else {
                    if (textSpan) textSpan.textContent = originalBtnText;
                    else dropdownBtn.innerHTML = `<span>${originalBtnText}</span> <i class="fas fa-chevron-down dropdown-arrow"></i>`;
                }
            }

            if (!isExpanded && window.innerWidth < 768) {
                setTimeout(() => {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 150);
            }
        }

        if (dropdownBtn) {
            dropdownBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleFeature(e);
            });
        }

        card.addEventListener('click', (e) => {
            if (e.target.closest('a, button:not(.feature-dropdown-btn)')) return;
            toggleFeature(e);
        });
    });


    /* --- 10. Unified Contact & Support Portal Interactivity --- */
    // Dual-Mode Form Tabs (Inquiry vs Technical Support Ticket)
    const formTabBtns = document.querySelectorAll('.form-tab-btn');
    const inquiryPanel = document.getElementById('inquiryFormPanel');
    const supportPanel = document.getElementById('supportTicketPanel');

    formTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            formTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const targetMode = btn.getAttribute('data-tab');

            if (inquiryPanel && supportPanel) {
                if (targetMode === 'support') {
                    inquiryPanel.style.display = 'none';
                    supportPanel.style.display = 'block';
                } else {
                    inquiryPanel.style.display = 'block';
                    supportPanel.style.display = 'none';
                }
            }
        });
    });

    // Support Search Hero Input
    const supportSearchInput = document.getElementById('supportSearchInput');
    const supportSearchBtn = document.getElementById('supportSearchBtn');
    const faqItems = document.querySelectorAll('.faq-item');

    function filterFAQs() {
        if (!supportSearchInput) return;
        const query = supportSearchInput.value.trim().toLowerCase();
        let found = false;

        faqItems.forEach(item => {
            const questionText = item.querySelector('.faq-question span')?.textContent.toLowerCase() || '';
            const answerText = item.querySelector('.faq-answer')?.textContent.toLowerCase() || '';

            if (!query || questionText.includes(query) || answerText.includes(query)) {
                item.style.display = 'block';
                if (query) {
                    item.classList.add('active');
                    found = true;
                }
            } else {
                item.style.display = 'none';
                item.classList.remove('active');
            }
        });

        if (query && found) {
            document.getElementById('faq-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    if (supportSearchBtn) supportSearchBtn.addEventListener('click', filterFAQs);
    if (supportSearchInput) {
        supportSearchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') filterFAQs();
            else if (supportSearchInput.value.trim() === '') filterFAQs();
        });
    }

    // Unified Contact and Support Page Form Submissions
    const contactPageForm = document.getElementById('contactPageForm');
    if (contactPageForm) {
        contactPageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Terima kasih! Pesan Anda telah diterima oleh Tim Admissions & Akademik. Kami akan merespon via WhatsApp / Email dalam 1x24 jam.');
            contactPageForm.reset();
        });
    }

    const supportTicketForm = document.getElementById('supportTicketForm');
    if (supportTicketForm) {
        supportTicketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const ticketId = 'TICK-' + Math.floor(100000 + Math.random() * 900000);
            alert(`Tiket Bantuan Teknis Berhasil Dibuat!\nNomor Tiket Anda: ${ticketId}\nTim Helpdesk Virtual Lab AI Academy sedang memproses tiket Anda.`);
            supportTicketForm.reset();
        });
    }

    const mainRegistrationForm = document.getElementById('mainRegistrationForm');
    if (mainRegistrationForm) {
        mainRegistrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Pendaftaran Berhasil Dikirim! Akun Portal Mahasiswa dan panduan kelas akan segera dikirimkan ke Email & WhatsApp Anda.');
            mainRegistrationForm.reset();
        });
    }


    /* --- 11. Active Page Highlight & FAQ Accordion --- */
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

