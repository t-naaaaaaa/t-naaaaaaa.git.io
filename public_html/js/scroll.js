document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll(".fadeUp");
  const hamburger = document.getElementById("js-hamburger");
  const nav = document.getElementById("js-nav");
  const navLinks = nav.querySelectorAll("a");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  targets.forEach((target) => {
    observer.observe(target);
  });

  hamburger.addEventListener("click", function () {
    console.log("hamburger clicked");
    hamburger.classList.toggle("active");
    nav.classList.toggle("active");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      nav.classList.remove("active");
    });
  });
});
