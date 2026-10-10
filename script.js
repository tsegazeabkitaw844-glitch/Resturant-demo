const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!isExpanded));
    navToggle.setAttribute('aria-label', isExpanded ? 'Open navigation' : 'Close navigation');
    siteNav.classList.toggle('is-open', !isExpanded);
  });

  siteNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open navigation');
      siteNav.classList.remove('is-open');
    }
  });
}

const filterButtons = document.querySelectorAll('.filter-button');
const menuItems = document.querySelectorAll('.menu-item');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle('is-selected', isSelected);
      filterButton.setAttribute('aria-pressed', String(isSelected));
    });
    menuItems.forEach((item) => {
      item.hidden = filter !== 'all' && item.dataset.category !== filter;
    });
  });
});

const bookingForm = document.querySelector('#booking-form');
if (bookingForm) {
  const dateInput = bookingForm.querySelector('input[name="date"]');
  const today = new Date();
  const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  dateInput.min = localDate;

  bookingForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const status = document.querySelector('#form-status');
    const date = new Date(`${formData.get('date')}T00:00:00`).toLocaleDateString(undefined, {
      weekday: 'long', month: 'long', day: 'numeric'
    });
    status.textContent = `Thanks, ${formData.get('name')}! Your table request for ${formData.get('guests')} on ${date} at ${formData.get('time')} is ready. Please call +251 911 234 567 to confirm your booking.`;
    status.classList.add('is-visible');
  });
}
