// ---------- Menu search (menu.html) ----------
const searchBox = document.getElementById('menuSearch');

if (searchBox) {
  searchBox.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();
    const rows = document.querySelectorAll('.menu-table tbody tr');
    let visible = 0;

    rows.forEach(function (row) {
      const match = row.textContent.toLowerCase().includes(query);
      row.style.display = match ? '' : 'none';
      if (match) visible++;
    });

    document.getElementById('noResults').classList.toggle('d-none', visible > 0);
  });
}

// ---------- Booking form validation (contact.html) ----------
const form = document.getElementById('bookingForm');

if (form) {
  // Don't allow booking dates in the past
  const dateInput = document.getElementById('date');
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const fields = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    fields.forEach(function (field) {
      if (field.checkValidity()) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
      } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        isValid = false;
      }
    });

    if (isValid) {
      const name = document.getElementById('name').value.trim();
      const date = document.getElementById('date').value;
      const time = document.getElementById('time').value;
      const success = document.getElementById('formSuccess');

      success.textContent =
        'Thank you, ' + name + '! Your table request for ' + date + ' at ' + time +
        ' has been received. We will confirm shortly.';
      success.classList.remove('d-none');

      form.reset();
      fields.forEach(function (f) { f.classList.remove('is-valid'); });
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
}
