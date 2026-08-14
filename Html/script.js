// =====================================
// IYUNGA SECONDARY SCHOOL
// JAVASCRIPT INTERACTIONS
// =====================================

document.addEventListener("DOMContentLoaded", function () {

    // =====================================
    // 1. FIX / CREATE NAVIGATION
    // =====================================

    const header = document.querySelector("header");
    const menuList = header.querySelector("ul");

    // Create a nav element around the existing menu
    if (menuList && !header.querySelector("nav")) {
        const nav = document.createElement("nav");
        menuList.parentNode.insertBefore(nav, menuList);
        nav.appendChild(menuList);
    }

    const nav = document.querySelector("nav");
    const navList = document.querySelector("nav ul");

    // Create mobile menu button
    const menuButton = document.createElement("button");

    menuButton.className = "menu-button";
    menuButton.innerHTML = "☰ Menu";
    menuButton.setAttribute("aria-label", "Open navigation menu");

    nav.insertBefore(menuButton, navList);

    // Mobile menu toggle
    menuButton.addEventListener("click", function () {
        navList.classList.toggle("show-menu");

        if (navList.classList.contains("show-menu")) {
            menuButton.innerHTML = "✕ Close";
        } else {
            menuButton.innerHTML = "☰ Menu";
        }
    });


    // =====================================
    // 2. SMOOTH SCROLLING
    // =====================================

    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");
            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                // Close mobile menu
                navList.classList.remove("show-menu");
                menuButton.innerHTML = "☰ Menu";
            }
        });

    });


    // =====================================
    // 3. ACTIVE NAVIGATION LINK
    // =====================================

    const sections = document.querySelectorAll("main section");

    function updateActiveLink() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navLinks.forEach(function (link) {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === "#" + currentSection) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveLink);

    updateActiveLink();


    // =====================================
    // 4. SCROLL REVEAL ANIMATION
    // =====================================

    sections.forEach(function (section) {
        section.classList.add("reveal");
    });

    const revealObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }

            });

        },
        {
            threshold: 0.15
        }
    );

    sections.forEach(function (section) {
        revealObserver.observe(section);
    });


    // =====================================
    // 5. BACK TO TOP BUTTON
    // =====================================

    const topButton = document.createElement("button");

    topButton.id = "backToTop";
    topButton.innerHTML = "↑";
    topButton.title = "Back to top";
    topButton.setAttribute("aria-label", "Back to top");

    document.body.appendChild(topButton);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }

    });

    topButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // =====================================
    // 6. BUTTON CLICK ANIMATION
    // =====================================

    document.querySelectorAll("button").forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.add("clicked");

            setTimeout(function () {
                button.classList.remove("clicked");
            }, 200);

        });

    });


    // =====================================
    // 7. INTERACTIVE OBJECTIVES
    // =====================================

    const aboutSection = document.querySelector("#about");
    const visionSection = document.querySelector("#our\\ vision");

    // Find the objectives list even if the original HTML
    // does not have the .objectives class
    const headings = document.querySelectorAll("h3");

    let objectivesList = null;

    headings.forEach(function (heading) {

        if (heading.textContent.trim().toLowerCase() === "our objectives") {
            objectivesList = heading.nextElementSibling;
        }

    });

    if (objectivesList && objectivesList.tagName === "UL") {

        const objectiveButton = document.createElement("button");

        objectiveButton.textContent = "Hide Objectives";
        objectiveButton.className = "action-button";

        objectivesList.parentNode.insertBefore(
            objectiveButton,
            objectivesList
        );

        objectiveButton.addEventListener("click", function () {

            if (objectivesList.style.display === "none") {

                objectivesList.style.display = "block";
                objectiveButton.textContent = "Hide Objectives";

            } else {

                objectivesList.style.display = "none";
                objectiveButton.textContent = "Show Objectives";

            }

        });

    }


    // =====================================
    // 8. ANIMATE OBJECTIVE ITEMS
    // =====================================

    if (objectivesList) {

        const objectiveItems = objectivesList.querySelectorAll("li");

        objectiveItems.forEach(function (item, index) {

            item.style.transition = "0.3s ease";

            item.addEventListener("click", function () {

                item.classList.toggle("selected");

            });

        });

    }


    // =====================================
    // 9. ANIMATE FACILITIES
    // =====================================

    const facilities = document.querySelectorAll("#facilities li");

    facilities.forEach(function (facility) {

        facility.addEventListener("click", function () {

            this.classList.toggle("facility-selected");

        });

    });


    // =====================================
    // 10. INTERACTIVE TABLE ROWS
    // =====================================

    const tableRows = document.querySelectorAll("table tr");

    tableRows.forEach(function (row, index) {

        if (index !== 0) {

            row.addEventListener("click", function () {

                // Remove selection from other rows
                tableRows.forEach(function (otherRow) {
                    otherRow.classList.remove("row-selected");
                });

                // Select clicked row
                this.classList.add("row-selected");

            });

        }

    });


    // =====================================
    // 11. NEWS ARTICLES
    // =====================================

    const articles = document.querySelectorAll("article");

    articles.forEach(function (article) {

        article.addEventListener("click", function () {

            articles.forEach(function (otherArticle) {
                otherArticle.classList.remove("article-selected");
            });

            this.classList.add("article-selected");

        });

    });


    // =====================================
    // 12. FOOTER YEAR
    // =====================================

    const footer = document.querySelector("footer");

    if (footer) {

        const paragraphs = footer.querySelectorAll("p");

        if (paragraphs.length > 0) {

            paragraphs[0].innerHTML =
                `&copy; ${new Date().getFullYear()} Iyunga Secondary School. All Rights Reserved.`;

        }

    }


    // =====================================
    // 13. WELCOME ANIMATION
    // =====================================

    const homeSection = document.querySelector("#home");

    if (homeSection) {

        homeSection.classList.add("welcome-animation");

    }


    console.log("Iyunga Secondary School website loaded successfully.");

});