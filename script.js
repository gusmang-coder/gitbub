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
            <button type="button" class="btn-drawer-register" id="mobileDrawerRegisterBtn">
                <i class="fas fa-user-plus"></i> Daftar Akun
            </button>
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

        // Bind Mobile Register Hub Button
        const mobileDrawerRegisterBtn = document.getElementById('mobileDrawerRegisterBtn');
        if (mobileDrawerRegisterBtn) {
            mobileDrawerRegisterBtn.addEventListener('click', (e) => {
                e.preventDefault();
                closeMobileDrawer();
                setTimeout(() => {
                    openRegisterHubModal();
                }, 250);
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


    /* --- 5. Interactive Search Bar & Popular Tag Filtering --- */
    const searchInput = document.getElementById('searchInput');
    const searchCategory = document.getElementById('searchCategory');
    const searchBtn = document.getElementById('searchBtn');

    function performSearch(forcedQuery, forcedCategory) {
        const query = (forcedQuery !== undefined ? forcedQuery : (searchInput ? searchInput.value : '')).trim();
        const category = (forcedCategory !== undefined ? forcedCategory : (searchCategory ? searchCategory.value : 'all')).toLowerCase();

        const isPublikasiPage = window.location.pathname.includes('publikasi.html');

        if (!isPublikasiPage) {
            // Redirect to publikasi.html with search parameters
            if (query) {
                window.location.href = `publikasi.html?q=${encodeURIComponent(query)}&cat=${encodeURIComponent(category)}`;
                return;
            }
        }

        // On Publikasi (or in-page news cards)
        let firstMatchedCard = null;
        const qLower = query.toLowerCase();

        const allNewsCards = document.querySelectorAll('.news-card');

        allNewsCards.forEach(card => {
            const title = card.querySelector('.news-title')?.textContent.toLowerCase() || '';
            const excerpt = card.querySelector('.news-excerpt')?.textContent.toLowerCase() || '';
            const tags = card.getAttribute('data-tags')?.toLowerCase() || '';
            const cardCategory = (card.getAttribute('data-category') || '').toLowerCase();

            const matchesQuery = !qLower || title.includes(qLower) || excerpt.includes(qLower) || tags.includes(qLower);
            const matchesCategory = category === 'all' || cardCategory === category;

            if (matchesQuery && matchesCategory) {
                card.style.display = 'flex';
                if (!firstMatchedCard) firstMatchedCard = card;
            } else {
                card.style.display = 'none';
            }
        });

        if (firstMatchedCard && query) {
            // Auto open the detail drawer of first matched card
            const details = firstMatchedCard.querySelector('.news-full-details');
            const btn = firstMatchedCard.querySelector('.article-dropdown-btn');
            if (details && !details.classList.contains('active')) {
                details.classList.add('active');
                if (btn) {
                    btn.classList.add('active');
                    const span = btn.querySelector('span');
                    if (span) span.textContent = 'Tutup Artikel';
                }
            }

            // Glowing highlight animation
            firstMatchedCard.classList.remove('highlight-pulse');
            void firstMatchedCard.offsetWidth; // trigger reflow
            firstMatchedCard.classList.add('highlight-pulse');

            setTimeout(() => {
                firstMatchedCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else if (query) {
            document.getElementById('berita')?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            performSearch();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }

    // Quick Search Suggestion Tag Chips
    const searchTagChips = document.querySelectorAll('.search-tag-chip');
    searchTagChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.preventDefault();
            const query = chip.getAttribute('data-search');
            if (query) {
                if (searchInput) searchInput.value = query;
                performSearch(query);
            }
        });
    });

    // On Page Load: Check URL Query Parameters (e.g. publikasi.html?q=Virtual+Lab+GPU)
    const urlParams = new URLSearchParams(window.location.search);
    const urlQuery = urlParams.get('q');
    const urlCat = urlParams.get('cat');
    if (urlQuery || urlCat) {
        if (searchInput && urlQuery) searchInput.value = urlQuery;
        if (searchCategory && urlCat) searchCategory.value = urlCat;
        setTimeout(() => {
            performSearch(urlQuery || '', urlCat || 'all');
        }, 150);
    }


    /* --- 6. Modal Controllers (Login & Contact / Enrollment) --- */
    function setupModal(openBtnId, closeBtnId, modalId) {
        const openBtn = document.getElementById(openBtnId);
        const closeBtn = document.getElementById(closeBtnId);
        const modal = document.getElementById(modalId);

        if (!modal) {
            if (openBtn) {
                openBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (openBtnId === 'openLoginBtn') window.location.href = 'login.html';
                    else if (openBtnId === 'openContactBtn') window.location.href = 'contact.html';
                });
            }
            return;
        }

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

    // Registration Hub Pop-Out (2 Options: Calon Siswa vs Sudah Diterima)
    function openRegisterHubModal() {
        const existing = document.getElementById('registerHubModal');
        if (existing) existing.remove();

        const backdrop = document.createElement('div');
        backdrop.id = 'registerHubModal';
        backdrop.className = 'modal-backdrop';

        backdrop.innerHTML = `
            <div class="modal-card register-hub-card-modal">
                <button class="modal-close" id="regHubCloseBtn" style="position: absolute; right: 18px; top: 18px; background: rgba(255,255,255,0.1); border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 1.3rem; cursor: pointer; border: none; z-index: 10; transition: all 0.2s;">&times;</button>
                
                <div class="register-hub-header">
                    <span class="register-hub-badge"><i class="fas fa-id-badge"></i> Portal Pendaftaran & Akun</span>
                    <h2 class="register-hub-title">Pilih Jalur Pendaftaran Akademi</h2>
                    <p class="register-hub-subtitle">Silakan pilih status Anda untuk diarahkan ke formulir pendaftaran yang sesuai dengan kebutuhan Anda:</p>
                </div>

                <div class="register-hub-grid">
                    <!-- Option 1: Belum Mendaftar / Calon Siswa Baru -->
                    <div class="register-option-card card-cyan">
                        <div class="reg-option-icon-box">
                            <i class="fas fa-file-signature"></i>
                        </div>
                        <span class="reg-option-tag">Jalur 1 • Calon Siswa Baru</span>
                        <h3 class="reg-option-title">Belum Mendaftar ke Sekolah</h3>
                        <p class="reg-option-desc">
                            Untuk calon siswa/peserta baru yang ingin mendaftar ke kelas AI (Online/Offline Denpasar), info jadwal kelas, atau pengajuan beasiswa.
                        </p>
                        <ul class="reg-option-features">
                            <li><i class="fas fa-check-circle"></i> Pendaftaran Formulir Siswa Baru</li>
                            <li><i class="fas fa-check-circle"></i> Pilihan Kelas Online / Offline Bali</li>
                            <li><i class="fas fa-check-circle"></i> Belum memerlukan ID Siswa Staff</li>
                        </ul>
                        <a href="pendaftaran.html" class="btn-reg-hub-action">
                            <span>Isi Formulir Pendaftaran</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>

                    <!-- Option 2: Sudah Diterima / Buat Akun Portal -->
                    <div class="register-option-card card-primary">
                        <div class="reg-option-icon-box">
                            <i class="fas fa-user-check"></i>
                        </div>
                        <span class="reg-option-tag">Jalur 2 • Siswa / Mentor Diterima</span>
                        <h3 class="reg-option-title">Sudah Diterima di Sekolah</h3>
                        <p class="reg-option-desc">
                            Untuk siswa atau mentor yang telah diterima dan memiliki <strong>ID Resmi dari Staff Kampus</strong> untuk mengaktifkan akun portal.
                        </p>
                        <ul class="reg-option-features">
                            <li><i class="fas fa-check-circle"></i> Buat akun & login portal mandiri</li>
                            <li><i class="fas fa-check-circle"></i> Memerlukan ID Resmi dari Staff</li>
                            <li><i class="fas fa-check-circle"></i> Akses Virtual GPU Lab & Materi</li>
                        </ul>
                        <a href="register.html" class="btn-reg-hub-action">
                            <span>Buat Akun Akademi Baru</span>
                            <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            backdrop.classList.add('active');
        }, 30);

        function closeModal() {
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => backdrop.remove(), 250);
        }

        const closeBtn = backdrop.querySelector('#regHubCloseBtn');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });
    }

    // Attach Register Hub Modal to all Daftar Akun Buttons
    const registerHubBtns = document.querySelectorAll('#openRegisterHubBtn, .btn-register-nav');
    registerHubBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openRegisterHubModal();
        });
    });

    // Handle Schedule Enroll Buttons & All Contact CTAs to open enrollment modal
    const enrollBtns = document.querySelectorAll('.btn-enroll, .btn-contact:not(.btn-register-nav)');
    enrollBtns.forEach(btn => {
        if (btn.id === 'openContactBtn' || btn.id === 'openRegisterHubBtn') return;
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


    /* --- 7. Persistent User Account Management & Auth Logic --- */
    const USERS_STORAGE_KEY = 'ai_academy_users';
    const CURRENT_USER_KEY = 'ai_academy_current_user';

    // Preloaded Demo Accounts if storage is empty
    const defaultUsers = [
        {
            id: 'AI-STD-1001',
            fullName: 'Ahmad Fauzi, S.Kom.',
            username: 'ahmadfauzi',
            email: 'student@aiacademy.ac.id',
            phone: '081234567890',
            role: 'student',
            programRole: 'student_online',
            programName: 'Online Class - Virtual AI Lab',
            password: 'password123',
            registeredAt: '2026-08-15T09:00:00.000Z'
        },
        {
            id: 'AI-MNT-2002',
            fullName: 'Dr. Wayan Artawa, M.Cs.',
            username: 'wayanartawa',
            email: 'mentor@aiacademy.ac.id',
            phone: '081987654321',
            role: 'mentor',
            programRole: 'mentor',
            programName: 'Mentor / Faculty Instructor',
            password: 'password123',
            registeredAt: '2026-07-10T14:00:00.000Z'
        },
        {
            id: 'AI-ADM-0001',
            fullName: 'Ade Administrator',
            username: 'admin',
            email: 'admin@aiacademy.ac.id',
            phone: '081122334455',
            role: 'admin',
            programRole: 'admin',
            programName: 'Academy Administrator',
            password: 'password123',
            registeredAt: '2026-01-01T00:00:00.000Z'
        }
    ];

    function getUsers() {
        const raw = localStorage.getItem(USERS_STORAGE_KEY);
        if (!raw) {
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
            return defaultUsers;
        }
        try {
            const users = JSON.parse(raw);
            if (!Array.isArray(users) || users.length === 0) {
                localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
                return defaultUsers;
            }
            return users;
        } catch(e) {
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
            return defaultUsers;
        }
    }

    function saveUsers(users) {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }

    function getCurrentUser() {
        const rawLocal = localStorage.getItem(CURRENT_USER_KEY);
        const rawSession = sessionStorage.getItem(CURRENT_USER_KEY);
        const raw = rawLocal || rawSession;
        if (!raw) return null;
        try {
            return JSON.parse(raw);
        } catch(e) {
            return null;
        }
    }

    function setCurrentUser(user, remember = true) {
        const json = JSON.stringify(user);
        if (remember) {
            localStorage.setItem(CURRENT_USER_KEY, json);
        } else {
            sessionStorage.setItem(CURRENT_USER_KEY, json);
            localStorage.setItem(CURRENT_USER_KEY, json);
        }
    }

    function logoutUser() {
        confirmLogoutUser();
    }

    function confirmLogoutUser() {
        const user = getCurrentUser();
        const existing = document.getElementById('authPopoutBackdrop');
        if (existing) existing.remove();

        const nameParts = user ? user.fullName.trim().split(' ') : ['User'];
        const initials = user ? (nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '')).toUpperCase() : 'AI';
        const roleLabel = user ? (user.role || 'student').toUpperCase() : 'STUDENT';

        const backdrop = document.createElement('div');
        backdrop.id = 'authPopoutBackdrop';
        backdrop.className = 'auth-popout-backdrop';

        backdrop.innerHTML = `
            <div class="auth-popout-card">
                <div class="auth-popout-icon-wrap">
                    <div class="auth-popout-icon-pulse" style="background: radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(245, 158, 11, 0.1) 70%, transparent 100%);"></div>
                    <div class="auth-popout-icon" style="background: linear-gradient(135deg, #EF4444, #F59E0B); box-shadow: 0 10px 25px rgba(239, 68, 68, 0.4);">
                        <i class="fas fa-sign-out-alt"></i>
                    </div>
                </div>
                <span class="auth-popout-badge" style="background: rgba(245, 158, 11, 0.15); color: #F59E0B; border-color: rgba(245, 158, 11, 0.3);">
                    <i class="fas fa-question-circle"></i> Konfirmasi Sesi
                </span>
                <h3 class="auth-popout-title">Keluar dari Akun?</h3>
                <p class="auth-popout-desc">Apakah Anda yakin ingin mengakhiri sesi aktif Anda? Anda dapat masuk kembali kapan saja dengan akun terdaftar Anda.</p>
                
                ${user ? `
                <div class="auth-popout-user-card">
                    <div class="auth-popout-avatar">${initials}</div>
                    <div class="auth-popout-meta">
                        <div class="auth-popout-name">${user.fullName}</div>
                        <div class="auth-popout-role"><i class="fas fa-id-badge"></i> ${roleLabel} • ${user.id || 'AI-STD'}</div>
                        <div class="auth-popout-email">${user.email}</div>
                    </div>
                </div>
                ` : ''}

                <div class="auth-popout-btn-group">
                    <button type="button" class="btn-popout-cancel" id="btnCancelLogout">
                        <i class="fas fa-times"></i>
                        <span>Batal</span>
                    </button>
                    <button type="button" class="btn-popout-confirm-logout" id="btnConfirmLogout">
                        <i class="fas fa-sign-out-alt"></i>
                        <span>Ya, Keluar Sekarang</span>
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            backdrop.classList.add('active');
        }, 50);

        const btnCancel = document.getElementById('btnCancelLogout');
        if (btnCancel) {
            btnCancel.addEventListener('click', () => {
                backdrop.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(() => backdrop.remove(), 250);
            });
        }

        const btnConfirm = document.getElementById('btnConfirmLogout');
        if (btnConfirm) {
            btnConfirm.addEventListener('click', () => {
                backdrop.classList.remove('active');
                setTimeout(() => {
                    backdrop.remove();
                    executeLogout();
                }, 200);
            });
        }
    }

    function executeLogout() {
        localStorage.removeItem(CURRENT_USER_KEY);
        sessionStorage.removeItem(CURRENT_USER_KEY);

        showLogoutSuccessPopout();
    }

    function showLogoutSuccessPopout() {
        const existing = document.getElementById('authSuccessPopout');
        if (existing) existing.remove();

        const backdrop = document.createElement('div');
        backdrop.id = 'authSuccessPopout';
        backdrop.className = 'auth-popout-backdrop';

        backdrop.innerHTML = `
            <div class="auth-popout-card">
                <div class="auth-popout-icon-wrap">
                    <div class="auth-popout-icon-pulse" style="background: radial-gradient(circle, rgba(14, 165, 233, 0.4) 0%, rgba(37, 99, 235, 0.1) 70%, transparent 100%);"></div>
                    <div class="auth-popout-icon" style="background: linear-gradient(135deg, #0EA5E9, #2563EB); box-shadow: 0 10px 25px rgba(14, 165, 233, 0.4);">
                        <i class="fas fa-check-circle"></i>
                    </div>
                </div>
                <span class="auth-popout-badge"><i class="fas fa-shield-alt"></i> Sesi Berakhir Aman</span>
                <h3 class="auth-popout-title">Berhasil Keluar!</h3>
                <p class="auth-popout-desc">Anda telah keluar dari Portal AI Academy secara aman. Mengalihkan ke beranda utama...</p>
                
                <div class="auth-popout-progress-wrap">
                    <div class="auth-popout-progress-bar">
                        <div class="auth-popout-progress-fill" id="authPopoutFill"></div>
                    </div>
                    <div class="auth-popout-progress-text">
                        <i class="fas fa-circle-notch"></i>
                        <span>Mengalihkan ke beranda dalam <strong id="authCountdownSec" style="color: var(--accent-cyan);">2</strong> detik...</span>
                    </div>
                </div>

                <button type="button" class="btn-popout-continue" id="btnPopoutContinue">
                    <span>Selesai & Ke Beranda</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            backdrop.classList.add('active');
            const fill = document.getElementById('authPopoutFill');
            if (fill) {
                fill.style.width = '100%';
            }
        }, 50);

        let isRedirected = false;
        function doRedirect() {
            if (isRedirected) return;
            isRedirected = true;
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                backdrop.remove();
                window.location.href = 'index.html';
            }, 250);
        }

        const btnContinue = document.getElementById('btnPopoutContinue');
        if (btnContinue) {
            btnContinue.addEventListener('click', doRedirect);
        }

        let remaining = 2;
        const countEl = document.getElementById('authCountdownSec');
        const interval = setInterval(() => {
            remaining--;
            if (countEl && remaining > 0) {
                countEl.textContent = remaining;
            }
            if (remaining <= 0) {
                clearInterval(interval);
                doRedirect();
            }
        }, 1000);
    }

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

    // Animated Pop-Out Modal for Successful Authentication
    function showAuthSuccessPopout({
        title = 'Login Berhasil!',
        badge = 'Otentikasi Berhasil',
        desc = 'Selamat datang kembali di Portal AI & Education Global Academy Denpasar.',
        user = null,
        redirectUrl = 'index.html',
        autoRedirectMs = 2400
    }) {
        const existing = document.getElementById('authSuccessPopout');
        if (existing) existing.remove();

        const nameParts = user ? user.fullName.trim().split(' ') : ['User'];
        const initials = user ? (nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '')).toUpperCase() : 'AI';
        const roleLabel = user ? (user.role || 'student').toUpperCase() : 'STUDENT';

        const backdrop = document.createElement('div');
        backdrop.id = 'authSuccessPopout';
        backdrop.className = 'auth-popout-backdrop';

        backdrop.innerHTML = `
            <div class="auth-popout-card">
                <div class="auth-popout-icon-wrap">
                    <div class="auth-popout-icon-pulse"></div>
                    <div class="auth-popout-icon">
                        <i class="fas fa-check"></i>
                    </div>
                </div>
                <span class="auth-popout-badge"><i class="fas fa-shield-alt"></i> ${badge}</span>
                <h3 class="auth-popout-title">${title}</h3>
                <p class="auth-popout-desc">${desc}</p>
                
                ${user ? `
                <div class="auth-popout-user-card">
                    <div class="auth-popout-avatar">${initials}</div>
                    <div class="auth-popout-meta">
                        <div class="auth-popout-name">${user.fullName}</div>
                        <div class="auth-popout-role"><i class="fas fa-id-badge"></i> ${roleLabel} • ${user.id || 'AI-STD'}</div>
                        <div class="auth-popout-email">${user.email}</div>
                    </div>
                </div>
                ` : ''}

                <div class="auth-popout-progress-wrap">
                    <div class="auth-popout-progress-bar">
                        <div class="auth-popout-progress-fill" id="authPopoutFill"></div>
                    </div>
                    <div class="auth-popout-progress-text">
                        <i class="fas fa-circle-notch"></i>
                        <span>Mengalihkan ke sistem dalam <strong id="authCountdownSec" style="color: var(--accent-cyan);">2</strong> detik...</span>
                    </div>
                </div>

                <button type="button" class="btn-popout-continue" id="btnPopoutContinue">
                    <span>Masuk ke Portal Sekarang</span>
                    <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            backdrop.classList.add('active');
            const fill = document.getElementById('authPopoutFill');
            if (fill) {
                fill.style.width = '100%';
            }
        }, 50);

        let isRedirected = false;
        function doRedirect() {
            if (isRedirected) return;
            isRedirected = true;
            backdrop.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                backdrop.remove();
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    renderNavbarUser();
                }
            }, 250);
        }

        const btnContinue = document.getElementById('btnPopoutContinue');
        if (btnContinue) {
            btnContinue.addEventListener('click', doRedirect);
        }

        let remaining = Math.ceil(autoRedirectMs / 1000);
        const countEl = document.getElementById('authCountdownSec');
        const interval = setInterval(() => {
            remaining--;
            if (countEl && remaining > 0) {
                countEl.textContent = remaining;
            }
            if (remaining <= 0) {
                clearInterval(interval);
                doRedirect();
            }
        }, 1000);
    }

    // Handle Login Forms (Standalone page & Modal)
    function handleLoginSubmit(form) {
        if (!form) return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const usernameInput = form.querySelector('#loginUsername, #username, input[name="username_email"], input[name="username"]');
            const passwordInput = form.querySelector('#loginPassword, #password, input[name="password"]');
            const rememberInput = form.querySelector('input[name="remember_me"]');

            const query = usernameInput ? usernameInput.value.trim().toLowerCase() : '';
            const password = passwordInput ? passwordInput.value : '';
            const remember = rememberInput ? rememberInput.checked : true;

            if (!query || !password) {
                alert('Silakan masukkan Email / ID / Username dan Kata Sandi Anda.');
                return;
            }

            const users = getUsers();

            // Find user matching email, username, or ID
            const user = users.find(u => 
                (u.email && u.email.toLowerCase() === query) || 
                (u.username && u.username.toLowerCase() === query) || 
                (u.id && u.id.toLowerCase() === query)
            );

            if (!user) {
                alert('Akun tidak ditemukan!\nSilakan periksa kembali Email / Username Anda atau buat akun baru di halaman Registrasi.');
                if (usernameInput) usernameInput.focus();
                return;
            }

            if (user.password !== password) {
                alert('Kata sandi yang Anda masukkan salah!\nSilakan periksa kembali kata sandi Anda.');
                if (passwordInput) passwordInput.focus();
                return;
            }

            // Login successful!
            setCurrentUser(user, remember);

            const loginModal = document.getElementById('loginModal');
            if (loginModal) loginModal.classList.remove('active');

            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const redirectTarget = (currentPage === 'login.html' || currentPage === 'register.html') ? 'index.html' : '';

            // Trigger Pop-out Success Dialog
            showAuthSuccessPopout({
                title: 'Login Berhasil!',
                badge: 'Akses Diberikan',
                desc: `Selamat datang kembali di Portal AI Academy Denpasar. Sesi akun Anda telah aktif.`,
                user: user,
                redirectUrl: redirectTarget,
                autoRedirectMs: 2400
            });
        });
    }

    const standaloneLoginForm = document.getElementById('standaloneLoginForm');
    const modalLoginForm = document.getElementById('loginForm');
    if (standaloneLoginForm) handleLoginSubmit(standaloneLoginForm);
    if (modalLoginForm) handleLoginSubmit(modalLoginForm);

    // Register Form Handler with permanent persistence in localStorage
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fullName = (document.getElementById('regFullName')?.value || '').trim();
            const username = (document.getElementById('regUsername')?.value || '').trim();
            const email = (document.getElementById('regEmail')?.value || '').trim();
            const phone = (document.getElementById('regPhone')?.value || '').trim();
            const programRole = document.getElementById('regRole')?.value || 'student_online';
            const studentId = (document.getElementById('regStudentId')?.value || '').trim();
            const password = document.getElementById('regPassword')?.value || '';
            const confirmPassword = document.getElementById('regConfirmPassword')?.value || '';
            const termsChecked = registerForm.querySelector('input[name="terms"]')?.checked;

            if (!fullName || !username || !email || !password) {
                alert('Silakan lengkapi semua kolom yang wajib diisi.');
                return;
            }

            if (!studentId) {
                alert('ID Resmi Peserta wajib diisi!\nJika Anda belum memiliki ID dari Staff Kampus, silakan klik tombol "Minta ke Staff Kampus" di samping kolom ID.');
                document.getElementById('regStudentId')?.focus();
                return;
            }

            if (password.length < 6) {
                alert('Kata sandi harus memiliki minimal 6 karakter.');
                document.getElementById('regPassword')?.focus();
                return;
            }

            if (password !== confirmPassword) {
                alert('Konfirmasi Kata Sandi tidak cocok dengan Kata Sandi Anda! Silakan periksa kembali.');
                document.getElementById('regConfirmPassword')?.focus();
                return;
            }

            if (!termsChecked) {
                alert('Anda harus menyetujui Syarat & Ketentuan serta Kebijakan Privasi untuk mendaftar.');
                return;
            }

            const users = getUsers();

            // Check for existing email
            const existingEmail = users.find(u => u.email && u.email.toLowerCase() === email.toLowerCase());
            if (existingEmail) {
                alert(`Email "${email}" sudah terdaftar dalam sistem.\nSilakan masuk menggunakan akun tersebut atau gunakan email lain.`);
                document.getElementById('regEmail')?.focus();
                return;
            }

            // Check for existing username
            const existingUsername = users.find(u => u.username && u.username.toLowerCase() === username.toLowerCase());
            if (existingUsername) {
                alert(`Username "${username}" sudah digunakan.\nSilakan pilih username lain.`);
                document.getElementById('regUsername')?.focus();
                return;
            }

            // Map program to role & name
            let role = 'student';
            let programName = 'Online Class - Virtual AI Lab';
            if (programRole === 'mentor') {
                role = 'mentor';
                programName = 'Mentor / Faculty Instructor';
            } else if (programRole === 'researcher') {
                role = 'admin';
                programName = 'General Researcher / Academician';
            } else if (programRole === 'student_offline') {
                role = 'student';
                programName = 'Offline Class - Denpasar Campus';
            }

            const finalId = studentId || ('AI-' + (role === 'student' ? 'STD' : role === 'mentor' ? 'MNT' : 'ADM') + '-' + Math.floor(1000 + Math.random() * 9000));

            const newUser = {
                id: finalId,
                fullName: fullName,
                username: username,
                email: email,
                phone: phone,
                role: role,
                programRole: programRole,
                programName: programName,
                password: password,
                registeredAt: new Date().toISOString()
            };

            users.push(newUser);
            saveUsers(users);

            // Automatically set active session
            setCurrentUser(newUser, true);

            // Trigger Pop-out Success Dialog for Registration
            showAuthSuccessPopout({
                title: 'Pendaftaran Berhasil!',
                badge: 'Akun Baru Terdaftar',
                desc: `Selamat datang di AI & Education Global Academy Denpasar! Data akun Anda telah tersimpan secara permanen.`,
                user: newUser,
                redirectUrl: 'index.html',
                autoRedirectMs: 2600
            });
        });
    }

    // Staff ID Request Modal Handlers
    const btnRequestStaffId = document.getElementById('btnRequestStaffId');
    const staffIdModal = document.getElementById('staffIdModal');
    const staffIdClose = document.getElementById('staffIdClose');
    const requestStaffIdForm = document.getElementById('requestStaffIdForm');
    const btnDemoGenerateId = document.getElementById('btnDemoGenerateId');

    if (btnRequestStaffId && staffIdModal) {
        btnRequestStaffId.addEventListener('click', () => {
            staffIdModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (staffIdClose && staffIdModal) {
        staffIdClose.addEventListener('click', () => {
            staffIdModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if (staffIdModal) {
        staffIdModal.addEventListener('click', (e) => {
            if (e.target === staffIdModal) {
                staffIdModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    if (btnDemoGenerateId) {
        btnDemoGenerateId.addEventListener('click', () => {
            const randomId = 'AI-STD-' + Math.floor(1000 + Math.random() * 9000);
            const regStudentId = document.getElementById('regStudentId');
            if (regStudentId) {
                regStudentId.value = randomId;
                regStudentId.style.borderColor = '#10B981';
                setTimeout(() => { regStudentId.style.borderColor = ''; }, 1500);
            }
            if (staffIdModal) {
                staffIdModal.classList.remove('active');
                document.body.style.overflow = '';
            }
            alert(`ID Demo berhasil dibuat: ${randomId}\nID ini telah otomatis dimasukkan ke dalam formulir pendaftaran Anda.`);
        });
    }

    if (requestStaffIdForm) {
        requestStaffIdForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const reqName = document.getElementById('reqName')?.value || 'Calon Siswa';
            const reqSchool = document.getElementById('reqSchool')?.value || 'Institusi';
            const reqWa = document.getElementById('reqWa')?.value || '';

            const waMessage = `Halo Staff AI & Education Global Academy Denpasar, perkenalkan saya *${reqName}* dari *${reqSchool}* (No. WA: ${reqWa}). Saya adalah calon siswa yang ingin mendaftar dan meminta *ID Resmi Pendaftaran Siswa (Student ID)*. Terima kasih!`;
            const waUrl = `https://wa.me/6281299887766?text=${encodeURIComponent(waMessage)}`;

            // Auto-fill an anticipated verified ID
            const tempId = 'AI-STD-' + Math.floor(1000 + Math.random() * 9000);
            const regStudentId = document.getElementById('regStudentId');
            if (regStudentId) {
                regStudentId.value = tempId;
            }

            if (staffIdModal) {
                staffIdModal.classList.remove('active');
                document.body.style.overflow = '';
            }

            window.open(waUrl, '_blank');
        });
    }

    // 1-Click Quick Demo Login Chips
    const demoChipBtns = document.querySelectorAll('.demo-chip-btn[data-demo]');
    demoChipBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const demoType = btn.getAttribute('data-demo');
            const usernameInput = document.getElementById('loginUsername') || document.getElementById('username');
            const passwordInput = document.getElementById('loginPassword') || document.getElementById('password');
            const roleTabs = document.querySelectorAll('.role-tab-btn');
            const roleInputHidden = document.getElementById('userRoleInput');
            const roleSelect = document.getElementById('userRole');

            if (demoType === 'student') {
                if (usernameInput) usernameInput.value = 'student@aiacademy.ac.id';
                if (passwordInput) passwordInput.value = 'password123';
                if (roleInputHidden) roleInputHidden.value = 'student';
                if (roleSelect) roleSelect.value = 'student';
                roleTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-role') === 'student'));
            } else if (demoType === 'mentor') {
                if (usernameInput) usernameInput.value = 'mentor@aiacademy.ac.id';
                if (passwordInput) passwordInput.value = 'password123';
                if (roleInputHidden) roleInputHidden.value = 'mentor';
                if (roleSelect) roleSelect.value = 'mentor';
                roleTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-role') === 'mentor'));
            } else if (demoType === 'admin') {
                if (usernameInput) usernameInput.value = 'admin@aiacademy.ac.id';
                if (passwordInput) passwordInput.value = 'password123';
                if (roleInputHidden) roleInputHidden.value = 'admin';
                if (roleSelect) roleSelect.value = 'admin';
                roleTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-role') === 'admin'));
            }

            // Visual feedback on the clicked chip
            btn.style.transform = 'scale(0.97)';
            setTimeout(() => { btn.style.transform = ''; }, 150);
            
            // Highlight the submit button
            const submitBtn = document.getElementById('btnSubmitLogin');
            if (submitBtn) {
                submitBtn.focus();
            }
        });
    });

    // 1-Click Quick Fill Button on Registration Page
    const btnQuickFillRegister = document.getElementById('btnQuickFillRegister');
    if (btnQuickFillRegister) {
        btnQuickFillRegister.addEventListener('click', () => {
            const randomNum = Math.floor(100 + Math.random() * 900);
            const fullNameEl = document.getElementById('regFullName');
            const usernameEl = document.getElementById('regUsername');
            const emailEl = document.getElementById('regEmail');
            const phoneEl = document.getElementById('regPhone');
            const roleEl = document.getElementById('regRole');
            const studentIdEl = document.getElementById('regStudentId');
            const passwordEl = document.getElementById('regPassword');
            const confirmPwdEl = document.getElementById('regConfirmPassword');
            const termsEl = document.querySelector('input[name="terms"]');

            if (fullNameEl) fullNameEl.value = 'Kadek Wira Danendra, S.T.';
            if (usernameEl) usernameEl.value = 'kadekwira' + randomNum;
            if (emailEl) emailEl.value = 'kadek.wira' + randomNum + '@aiacademy.ac.id';
            if (phoneEl) phoneEl.value = '08129988' + randomNum;
            if (roleEl) roleEl.value = 'student_online';
            if (studentIdEl) studentIdEl.value = 'AI-STD-' + Math.floor(1000 + Math.random() * 9000);
            if (passwordEl) passwordEl.value = 'aiacademy2026';
            if (confirmPwdEl) confirmPwdEl.value = 'aiacademy2026';
            if (termsEl) termsEl.checked = true;

            btnQuickFillRegister.innerHTML = '<i class="fas fa-check-circle" style="color:#10B981; margin-right:8px;"></i> Data & ID Demo Terisi!';
            setTimeout(() => {
                btnQuickFillRegister.innerHTML = '<i class="fas fa-bolt" style="color: #FBBF24; margin-right: 8px;"></i> <span>Isi Data Pendaftaran Otomatis</span>';
            }, 2000);
        });
    }

    // Live Password Match Checker on Registration
    const regPassword = document.getElementById('regPassword');
    const regConfirmPassword = document.getElementById('regConfirmPassword');
    if (regPassword && regConfirmPassword) {
        function checkPasswordMatch() {
            let hint = document.getElementById('pwdMatchHint');
            if (!hint) {
                hint = document.createElement('div');
                hint.id = 'pwdMatchHint';
                hint.className = 'password-feedback-hint';
                regConfirmPassword.closest('.form-group')?.appendChild(hint);
            }

            if (!regConfirmPassword.value) {
                hint.innerHTML = '';
                return;
            }

            if (regPassword.value === regConfirmPassword.value) {
                hint.className = 'password-feedback-hint success';
                hint.innerHTML = '<i class="fas fa-check-circle"></i> Kata sandi cocok';
            } else {
                hint.className = 'password-feedback-hint error';
                hint.innerHTML = '<i class="fas fa-times-circle"></i> Kata sandi belum cocok';
            }
        }

        regPassword.addEventListener('input', checkPasswordMatch);
        regConfirmPassword.addEventListener('input', checkPasswordMatch);
    }

    // Render User Profile across Header & Drawers
    function renderNavbarUser() {
        const currentUser = getCurrentUser();
        const navActions = document.querySelector('.nav-actions');
        const mobileDrawerContent = document.getElementById('mobileDrawerContent');

        if (!currentUser) return;

        const nameParts = currentUser.fullName.trim().split(' ');
        const firstName = nameParts[0];
        const initials = (nameParts[0][0] + (nameParts[1] ? nameParts[1][0] : '')).toUpperCase();
        const roleLabel = (currentUser.role || 'student').toUpperCase();

        if (navActions) {
            const hamburgerBtn = navActions.querySelector('#hamburgerBtn');
            const hamburgerHtml = hamburgerBtn ? hamburgerBtn.outerHTML : '<button class="hamburger-btn" id="hamburgerBtn" aria-label="Toggle Menu"><i class="fas fa-bars"></i></button>';

            navActions.innerHTML = `
                <div class="user-profile-menu" id="userProfileMenu">
                    <button type="button" class="user-profile-btn" id="userProfileBtn" aria-haspopup="true" title="${currentUser.fullName}">
                        <div class="user-avatar-circle">${initials}</div>
                        <div class="user-info-snippet">
                            <span class="user-name-snippet">${firstName}</span>
                            <span class="user-role-badge-nav">${roleLabel}</span>
                        </div>
                        <i class="fas fa-chevron-down" style="font-size: 0.72rem; color: #CBD5E1; margin-left: 2px;"></i>
                    </button>
                    <div class="user-profile-dropdown" id="userProfileDropdown">
                        <div class="user-dropdown-header">
                            <div class="user-dropdown-avatar">${initials}</div>
                            <div class="user-dropdown-meta">
                                <div class="user-dropdown-name">${currentUser.fullName}</div>
                                <div class="user-dropdown-email">${currentUser.email}</div>
                                <span class="user-dropdown-tag"><i class="fas fa-shield-alt"></i> ${roleLabel}</span>
                            </div>
                        </div>
                        <ul class="user-dropdown-menu-list">
                            <li><a href="pendaftaran.html"><i class="fas fa-id-badge"></i> ID: <strong style="color:var(--accent-cyan); margin-left: 4px;">${currentUser.id || 'AI-STD-1001'}</strong></a></li>
                            <li><a href="kelas.html"><i class="fas fa-laptop-code"></i> Portal Virtual Lab & Jadwal</a></li>
                            <li><a href="contact.html"><i class="fas fa-headset"></i> Helpdesk & Layanan Kampus</a></li>
                        </ul>
                        <button type="button" class="btn-logout" id="btnLogoutSession">
                            <i class="fas fa-sign-out-alt"></i> Keluar (Logout)
                        </button>
                    </div>
                </div>
                ${hamburgerHtml}
            `;

            const userProfileMenu = document.getElementById('userProfileMenu');
            const userProfileBtn = document.getElementById('userProfileBtn');
            const btnLogoutSession = document.getElementById('btnLogoutSession');

            if (userProfileBtn && userProfileMenu) {
                userProfileBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    userProfileMenu.classList.toggle('open');
                });
                document.addEventListener('click', (e) => {
                    if (!userProfileMenu.contains(e.target)) {
                        userProfileMenu.classList.remove('open');
                    }
                });
            }

            if (btnLogoutSession) {
                btnLogoutSession.addEventListener('click', (e) => {
                    e.preventDefault();
                    logoutUser();
                });
            }

            const newHamburger = document.getElementById('hamburgerBtn');
            if (newHamburger) {
                newHamburger.onclick = () => {
                    const mobileDrawer = document.getElementById('mobileDrawer');
                    const drawerOverlay = document.getElementById('drawerOverlay');
                    if (mobileDrawer) mobileDrawer.classList.add('active');
                    if (drawerOverlay) drawerOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                };
            }
        }

        if (mobileDrawerContent) {
            const existingAuthActions = mobileDrawerContent.querySelector('.drawer-auth-actions');
            if (existingAuthActions) {
                existingAuthActions.innerHTML = `
                    <div class="drawer-user-card">
                        <div class="user-avatar-circle" style="width: 38px; height: 38px; font-size: 0.95rem;">${initials}</div>
                        <div class="drawer-user-info">
                            <div class="drawer-user-name">${currentUser.fullName}</div>
                            <div class="drawer-user-email">${currentUser.email} • <strong style="color:var(--accent-cyan);">${roleLabel}</strong></div>
                        </div>
                    </div>
                    <button type="button" class="btn-logout" id="btnDrawerLogout" style="width: 100%; padding: 11px; margin-top: 8px;">
                        <i class="fas fa-sign-out-alt"></i> Keluar dari Akun
                    </button>
                `;
                const btnDrawerLogout = document.getElementById('btnDrawerLogout');
                if (btnDrawerLogout) {
                    btnDrawerLogout.addEventListener('click', (e) => {
                        e.preventDefault();
                        logoutUser();
                    });
                }
            }
        }

        // If on auth pages, show active login banner
        const authBody = document.querySelector('.auth-body');
        if (authBody) {
            const existingBanner = document.getElementById('loggedInBanner');
            if (!existingBanner) {
                const banner = document.createElement('div');
                banner.id = 'loggedInBanner';
                banner.className = 'alert-box alert-success';
                banner.style.marginBottom = '20px';
                banner.innerHTML = `
                    <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <i class="fas fa-check-circle" style="font-size: 1.1rem; color: #065F46;"></i>
                            <span>Anda sedang masuk sebagai <strong>${currentUser.fullName}</strong> (${roleLabel}).</span>
                        </div>
                        <div style="display: flex; gap: 10px; margin-top: 4px;">
                            <a href="index.html" class="btn" style="padding: 6px 14px; font-size: 0.8rem; background: var(--primary-blue); color: #fff; border-radius: var(--radius-sm);">Ke Beranda</a>
                            <button type="button" id="btnSwitchAccount" style="background: transparent; border: 1px solid #065F46; padding: 6px 14px; font-size: 0.8rem; border-radius: var(--radius-sm); color: #065F46; cursor: pointer; font-weight: 700;">Ganti Akun (Logout)</button>
                        </div>
                    </div>
                `;
                authBody.insertBefore(banner, authBody.firstChild);

                const btnSwitchAccount = document.getElementById('btnSwitchAccount');
                if (btnSwitchAccount) {
                    btnSwitchAccount.addEventListener('click', () => {
                        logoutUser();
                    });
                }
            }
        }
    }

    // Execute User Navbar Rendering on Load
    renderNavbarUser();

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


    /* --- 8. Publication & UKM Interactive Dropdown Accordions --- */
    const allAccordionCards = document.querySelectorAll('.news-card, .ekskul-card, .ukm-card');

    allAccordionCards.forEach(card => {
        const dropdownBtn = card.querySelector('.read-more-btn, .article-dropdown-btn');
        const fullDetails = card.querySelector('.news-full-details');
        const originalBtnText = dropdownBtn ? dropdownBtn.querySelector('span')?.textContent.trim() || dropdownBtn.textContent.trim() : 'Baca Selengkapnya';

        // Toggle function for expanding/collapsing details
        function toggleArticle(e) {
            // Do not toggle if clicking directly on a CTA link, form element, or button inside full-details
            if (e && e.target.closest('.news-cta-btn, .modal-backdrop, form, input, select, textarea, .news-full-details')) {
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
                const closeText = originalBtnText.toLowerCase().includes('jadwal') ? 'Tutup Detail & Jadwal' : 'Tutup Deskripsi';
                if (!isExpanded) {
                    if (textSpan) textSpan.textContent = closeText;
                    else dropdownBtn.innerHTML = `<span>${closeText}</span> <i class="fas fa-chevron-down dropdown-arrow"></i>`;
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

    // Tata Tertib / Rules Accordion Controller
    const rulesCards = document.querySelectorAll('.rules-card');
    rulesCards.forEach(card => {
        const header = card.querySelector('.rules-card-header');
        if (header) {
            header.addEventListener('click', () => {
                const isOpen = card.classList.contains('active');
                card.classList.toggle('active', !isOpen);
            });
        }
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

    /* --- 12. Legal Pages Table of Contents ScrollSpy --- */
    const tocLinks = document.querySelectorAll('.legal-toc-link');
    const legalSections = document.querySelectorAll('.legal-section');

    if (tocLinks.length > 0 && legalSections.length > 0) {
        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPosition = window.scrollY + 140;

            legalSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (currentSectionId) {
                tocLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href === `#${currentSectionId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }

    /* --- 13. Interactive Profil Accordion Dropdowns (Visi-Misi, Dewan Pakar, Fasilitas) --- */
    const profilCards = document.querySelectorAll('.profil-accordion-card');
    profilCards.forEach(card => {
        const toggleBtn = card.querySelector('.profil-accordion-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const isActive = card.classList.contains('active');
                card.classList.toggle('active');
                toggleBtn.setAttribute('aria-expanded', (!isActive).toString());
            });
        }
    });

    /* --- 14. Universal Custom Select Component Enhancer --- */
    function initCustomSelects() {
        const selects = document.querySelectorAll('select:not([data-custom-enhanced])');
        
        selects.forEach(select => {
            select.setAttribute('data-custom-enhanced', 'true');

            const wrapper = document.createElement('div');
            wrapper.className = 'custom-select-wrapper';
            if (select.closest('.search-category-wrap')) {
                wrapper.classList.add('in-search-widget');
            }

            // Create Trigger Button
            const trigger = document.createElement('div');
            trigger.className = 'custom-select-trigger';
            trigger.setAttribute('tabindex', '0');
            trigger.setAttribute('role', 'button');
            trigger.setAttribute('aria-haspopup', 'listbox');
            trigger.setAttribute('aria-expanded', 'false');

            const selectedOption = select.options[select.selectedIndex] || select.options[0];
            const initialText = selectedOption ? selectedOption.textContent : 'Pilih opsi';

            const hasParentIcon = select.closest('.input-with-icon') && select.closest('.input-with-icon').querySelector(':scope > i');
            
            // Determine appropriate icon (only if no parent icon is present)
            let iconMarkup = '';
            if (!hasParentIcon) {
                let iconClass = 'fas fa-th-list';
                if (select.id === 'searchCategory') iconClass = 'fas fa-filter';
                else if (select.id === 'regRole' || select.name === 'program_role') iconClass = 'fas fa-graduation-cap';
                else if (select.id === 'userRole') iconClass = 'fas fa-user-shield';
                else if (select.id === 'programSelect') iconClass = 'fas fa-book-open';
                iconMarkup = `<i class="${iconClass} custom-select-trigger-icon"></i>`;
            }

            trigger.innerHTML = `
                <div class="custom-select-trigger-left">
                    ${iconMarkup}
                    <span class="custom-select-trigger-text">${initialText}</span>
                </div>
                <i class="fas fa-chevron-down custom-select-trigger-arrow"></i>
            `;

            // Create Options Container
            const optionsContainer = document.createElement('div');
            optionsContainer.className = 'custom-select-options';
            optionsContainer.setAttribute('role', 'listbox');

            Array.from(select.options).forEach((opt, idx) => {
                const optEl = document.createElement('div');
                optEl.className = 'custom-select-option';
                optEl.setAttribute('data-value', opt.value);
                optEl.setAttribute('role', 'option');
                if (idx === select.selectedIndex) {
                    optEl.classList.add('selected');
                }

                optEl.innerHTML = `
                    <div class="custom-select-option-left">
                        <span>${opt.textContent}</span>
                    </div>
                    <i class="fas fa-check custom-select-option-check"></i>
                `;

                optEl.addEventListener('click', (e) => {
                    e.stopPropagation();
                    select.value = opt.value;
                    
                    // Dispatch change event on original select
                    select.dispatchEvent(new Event('change', { bubbles: true }));

                    // Update trigger text
                    const triggerText = trigger.querySelector('.custom-select-trigger-text');
                    if (triggerText) triggerText.textContent = opt.textContent;

                    // Update selected class
                    optionsContainer.querySelectorAll('.custom-select-option').forEach(o => o.classList.remove('selected'));
                    optEl.classList.add('selected');

                    // Close dropdown
                    wrapper.classList.remove('open');
                    trigger.setAttribute('aria-expanded', 'false');
                });

                optionsContainer.appendChild(optEl);
            });

            // Toggle Open/Close on Trigger Click
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                const isOpen = wrapper.classList.contains('open');

                // Close all other open custom selects
                document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
                    if (w !== wrapper) {
                        w.classList.remove('open');
                        w.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
                    }
                });

                wrapper.classList.toggle('open', !isOpen);
                trigger.setAttribute('aria-expanded', (!isOpen).toString());
            });

            // Keyboard accessibility
            trigger.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    trigger.click();
                } else if (e.key === 'Escape') {
                    wrapper.classList.remove('open');
                    trigger.setAttribute('aria-expanded', 'false');
                }
            });

            // Insert wrapper into DOM
            select.parentNode.insertBefore(wrapper, select);
            wrapper.appendChild(select);
            wrapper.appendChild(trigger);
            wrapper.appendChild(optionsContainer);
        });

        // Close on clicking anywhere outside
        document.addEventListener('click', () => {
            document.querySelectorAll('.custom-select-wrapper.open').forEach(w => {
                w.classList.remove('open');
                w.querySelector('.custom-select-trigger')?.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Initialize all custom selects
    initCustomSelects();

});

