/* =================================
   SIDEBAR
================================= */

const sidebar =
  document.getElementById("sidebar");

const sidebarMenuBtn =
  document.getElementById("sidebarMenuBtn");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");

const sidebarLinks =
  document.querySelectorAll(".sidebar-link");

const menuIcon =
  sidebarMenuBtn.querySelector("i");


/* =================================
   OPEN SIDEBAR
================================= */

function openSidebar() {

  sidebar.classList.add("open");

  sidebarOverlay.classList.add("active");

  sidebarMenuBtn.setAttribute(
    "aria-expanded",
    "true"
  );

  sidebarMenuBtn.setAttribute(
    "aria-label",
    "Close navigation"
  );


  /* Change hamburger to X */

  menuIcon.classList.remove(
    "fa-bars"
  );

  menuIcon.classList.add(
    "fa-xmark"
  );


  /* Prevent background scrolling */

  document.body.style.overflow = "hidden";

}


/* =================================
   CLOSE SIDEBAR
================================= */

function closeSidebar() {

  sidebar.classList.remove("open");

  sidebarOverlay.classList.remove("active");

  sidebarMenuBtn.setAttribute(
    "aria-expanded",
    "false"
  );

  sidebarMenuBtn.setAttribute(
    "aria-label",
    "Open navigation"
  );


  /* Change X back to hamburger */

  menuIcon.classList.remove(
    "fa-xmark"
  );

  menuIcon.classList.add(
    "fa-bars"
  );


  /* Restore scrolling */

  document.body.style.overflow = "";

}


/* =================================
   MENU BUTTON
================================= */

sidebarMenuBtn.addEventListener(
  "click",
  () => {

    if (
      sidebar.classList.contains("open")
    ) {

      closeSidebar();

    } else {

      openSidebar();

    }

  }
);


/* =================================
   OVERLAY
================================= */

sidebarOverlay.addEventListener(
  "click",
  closeSidebar
);


/* =================================
   SIDEBAR LINKS
================================= */

sidebarLinks.forEach((link) => {

  link.addEventListener(
    "click",
    () => {

      sidebarLinks.forEach((item) => {

        item.classList.remove(
          "active"
        );

      });

      link.classList.add(
        "active"
      );

      closeSidebar();

    }
  );

});


/* =================================
   ESCAPE KEY
================================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      closeSidebar();

    }

  }
);


/* =================================
   ACTIVE SECTION
================================= */

const sections =
  document.querySelectorAll(
    "main section[id]"
  );


function updateActiveLink() {

  const scrollPosition =
    window.scrollY + 200;


  sections.forEach((section) => {

    const sectionTop =
      section.offsetTop;

    const sectionHeight =
      section.offsetHeight;

    const sectionId =
      section.getAttribute("id");


    if (
      scrollPosition >= sectionTop &&
      scrollPosition <
        sectionTop + sectionHeight
    ) {

      sidebarLinks.forEach((link) => {

        link.classList.remove(
          "active"
        );

      });


      const activeLink =
        document.querySelector(
          `.sidebar-link[href="#${sectionId}"]`
        );


      if (activeLink) {

        activeLink.classList.add(
          "active"
        );

      }

    }

  });

}


window.addEventListener(
  "scroll",
  updateActiveLink
);


/* =================================
   REVEAL ANIMATION
================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (
          entry.isIntersecting
        ) {

          entry.target.classList.add(
            "active"
          );

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealElements.forEach(
  (element) => {

    revealObserver.observe(
      element
    );

  }
);


/* =================================
   CURRENT YEAR
================================= */

const year =
  document.getElementById("year");


if (year) {

  year.textContent =
    new Date().getFullYear();

}


/* =================================
   WINDOW RESIZE
================================= */

window.addEventListener(
  "resize",
  () => {

    if (
      window.innerWidth > 950
    ) {

      closeSidebar();

    }

  }
);


/* =================================
   INITIALIZE
================================= */

updateActiveLink();