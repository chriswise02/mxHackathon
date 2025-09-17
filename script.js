function getNextFriday() {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysUntilFriday = (5 - dayOfWeek + 7) % 7;

    if (daysUntilFriday === 0 && now.getHours() >= 0) {
        const nextWeek = new Date(now);
        nextWeek.setDate(now.getDate() + 7);
        return nextWeek;
    }

    const nextFriday = new Date(now);
    nextFriday.setDate(now.getDate() + (daysUntilFriday || 7));
    nextFriday.setHours(0, 0, 0, 0);

    return nextFriday;
}

function updateCountdown() {
    const nextFriday = getNextFriday();
    const now = new Date();
    const timeDiff = nextFriday - now;

    if (timeDiff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        return;
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
}

function addInteractivity() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);

            if (button.classList.contains('btn-primary')) {
                console.log('Starting Dash Friday experience...');
            } else {
                console.log('Learning more about Dash Fridays...');
            }
        });
    });
}

function addScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const animatedElements = document.querySelectorAll('.feature, .countdown');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateCountdown();
    setInterval(updateCountdown, 60000);
    addInteractivity();
    addScrollAnimation();

    setTimeout(() => {
        document.querySelectorAll('.feature, .countdown').forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});