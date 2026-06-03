
// MENU MOBILE
const navToggle = document.querySelector(".nav-toggle");
const mainNav = document.querySelector(".main-nav");
const navMenu = document.getElementById("nav-menu");

if (navToggle && mainNav && navMenu) {
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// YEAR IN FOOTER
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// BOOKING FORM VALIDATION
const bookingForm = document.querySelector(".booking-form");
const successMessage = document.getElementById("booking-success");

function setError(id, message) {
  const errorSpan = document.querySelector(`.form-error[data-for="${id}"]`);
  const field = document.getElementById(id);
  if (errorSpan && field) {
    errorSpan.textContent = message || "";
    field.classList.toggle("has-error", Boolean(message));
  }
}

if (bookingForm) {
  bookingForm.addEventListener("submit", (e) => {
    let valid = true;

    const fields = [
      "booking-name",
      "booking-email",
      "booking-phone",
      "booking-service",
      "booking-date",
      "booking-time"
    ];

    fields.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      if (!el.value.trim()) {
        setError(id, "This field is required.");
        valid = false;
      } else {
        setError(id, "");
      }
    });

    const email = document.getElementById("booking-email");
    if (email && email.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        setError("booking-email", "Please enter a valid email address.");
        valid = false;
      }
    }

    const phone = document.getElementById("booking-phone");
    if (phone && phone.value.trim()) {
      const phoneRegex = /^[0-9+()\s.-]{6,}$/;
      if (!phoneRegex.test(phone.value.trim())) {
        setError("booking-phone", "Please enter a valid phone number.");
        valid = false;
      }
    }

    if (!valid) {
      e.preventDefault();
      if (successMessage) successMessage.textContent = "";
      return;
    }
    // If valid, let the form submit to FormSubmit (email + calendar)
  });
}

// SIMPLE GALLERY FILTER (optional, works with placeholders)
const filterButtons = document.querySelectorAll(".gallery-filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.getAttribute("data-filter");

    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    galleryItems.forEach((item) => {
      const category = item.getAttribute("data-category");
      if (filter === "all" || category === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});
