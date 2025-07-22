// This file contains the main JavaScript code for handling interactivity on the portfolio website.

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Dynamic content loading for project sections
    const projectSection = document.getElementById('projects');
    fetch('projects.json')
        .then(response => response.json())
        .then(data => {
            data.projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');
                projectDiv.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <a href="${project.link}" target="_blank">View Project</a>
                `;
                projectSection.appendChild(projectDiv);
            });
        })
        .catch(error => console.error('Error loading projects:', error));
});

// Main JavaScript functionality
console.log('Portfolio loaded successfully!');