// Инициализация AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация библиотеки анимаций
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true,
        offset: 100
    });

    // Управление музыкальным плеером
    const audioPlayer = document.getElementById('background-music');
    const playPauseBtn = document.getElementById('play-pause');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const prevBtn = document.getElementById('prev-track');
    const nextBtn = document.getElementById('next-track');
    const volumeSlider = document.getElementById('volume-slider');
    const volumeIcon = document.getElementById('volume-icon');
    const trackTitle = document.getElementById('track-title');
    
    // Список треков
    const tracks = [
        {
            title: 'Шиншилла любит молоко',
            src: 'music/Шиншилла любит молоко.mp3',
            type: 'audio/mpeg'
        },
        {
            title: 'Побег Шиншиллы',
            src: 'music/Побег Шиншиллы.mp3',
            type: 'audio/mpeg'
        },
        {
            title: 'Новогодняя шиншилла',
            src: 'music/Новогодняя шиншилла.mp4',
            type: 'audio/mp4'
        }
    ];
    
    // Текущий индекс трека
    let currentTrackIndex = 0;
    
    // Функция для загрузки трека
    function loadTrack(trackIndex) {
        if (trackIndex >= 0 && trackIndex < tracks.length) {
            currentTrackIndex = trackIndex;
            const track = tracks[currentTrackIndex];
            
            // Обновляем источник аудио
            const audioSource = audioPlayer.querySelector('source');
            audioSource.src = track.src;
            audioSource.type = track.type;
            
            // Обновляем название трека
            trackTitle.textContent = track.title;
            
            // Перезагружаем аудио
            audioPlayer.load();
            
            // Автоматически воспроизводим
            playAudio();
        }
    }
    
    // Функция для воспроизведения аудио
    function playAudio() {
        audioPlayer.play().then(() => {
            playPauseIcon.className = 'fas fa-pause';
        }).catch(error => {
            console.log('Автоматическое воспроизведение заблокировано браузером:', error);
            playPauseIcon.className = 'fas fa-play';
        });
    }
    
    // Функция для паузы аудио
    function pauseAudio() {
        audioPlayer.pause();
        playPauseIcon.className = 'fas fa-play';
    }
    
    // Функция для переключения воспроизведения/паузы
    function togglePlayPause() {
        if (audioPlayer.paused) {
            playAudio();
        } else {
            pauseAudio();
        }
    }
    
    // Функция для перехода к предыдущему треку
    function prevTrack() {
        let newIndex = currentTrackIndex - 1;
        if (newIndex < 0) {
            newIndex = tracks.length - 1;
        }
        loadTrack(newIndex);
    }
    
    // Функция для перехода к следующему треку
    function nextTrack() {
        let newIndex = currentTrackIndex + 1;
        if (newIndex >= tracks.length) {
            newIndex = 0;
        }
        loadTrack(newIndex);
    }
    
    // Функция для обновления иконки громкости
    function updateVolumeIcon(volume) {
        if (volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }
    
    // Обработчики событий
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevTrack);
    nextBtn.addEventListener('click', nextTrack);
    
    volumeSlider.addEventListener('input', function() {
        const volume = parseFloat(this.value);
        audioPlayer.volume = volume;
        updateVolumeIcon(volume);
    });
    
    volumeIcon.addEventListener('click', function() {
        if (audioPlayer.volume > 0) {
            audioPlayer.volume = 0;
            volumeSlider.value = 0;
            volumeIcon.className = 'fas fa-volume-mute';
        } else {
            audioPlayer.volume = 0.7;
            volumeSlider.value = 0.7;
            volumeIcon.className = 'fas fa-volume-up';
        }
    });
    
    // Автоматическое воспроизведение при загрузке страницы
    playAudio();
    
    // Обработка окончания трека
    audioPlayer.addEventListener('ended', function() {
        nextTrack();
    });

    // Управление бургер-меню
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    // Функция для переключения состояния меню
    function toggleMenu() {
        burgerMenu.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Блокировка прокрутки страницы при открытом меню
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    // Обработчик клика по бургер-иконке
    burgerMenu.addEventListener('click', toggleMenu);
    
    // Обработчик клика по оверлею
    overlay.addEventListener('click', toggleMenu);
    
    // Закрытие меню при клике на ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                toggleMenu();
            }
        });
    });
    
    // Закрытие меню при изменении размера окна
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Анимация для элементов при прокрутке
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Обработка отправки формы
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Здесь можно добавить логику отправки формы
            alert('Спасибо за сообщение! Мы свяжемся с вами в ближайшее время.');
            this.reset();
        });
    }
});
