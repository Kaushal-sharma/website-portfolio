const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  menuToggle.textContent = open ? "✕" : "☰";
});
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.textContent = "☰";
}));
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); obs.unobserve(entry.target); } });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();

// Form submission.
document.getElementById("contactForm").addEventListener("submit", async event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;

  const data = new FormData(form);

  try {
  const leadUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeNBtqmyiZ1AbmWrbN4AYynFI8fHy2UD6hpeOo3O_-lu-bZMg/formResponse";
  const params = new URLSearchParams();

  params.append("entry.1257747404", data.get("firstName"));
  params.append("entry.1935953515", data.get("lastName"));
  params.append("entry.753153344", data.get("email"));
  params.append("entry.1793494837", data.get("phone"));
  params.append("entry.1387975046", data.get("service"));
  params.append("entry.981337565", data.get("message"));

  await fetch(leadUrl, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: params.toString(),
  });
  } catch (error) {
    console.error("Error submitting form data to Google Forms:", error);
  }
});