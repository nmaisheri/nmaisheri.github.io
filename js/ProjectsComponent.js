const { useState } = React;

const ProjectsSection = () => {
    const [projects] = useState([
        {
            id: 1,
            title: "Interactive Website Portfolio",
            description: "A modern, responsive portfolio website with interactive particle animations and smooth transitions to provide an engaging user experience.",
            details: "Built entirely with HTML, CSS, JavaScript, and React, this project showcases my skills in front-end development and design.",
            technologies: ["HTML/CSS", "JavaScript", "Canvas API", "Responsive Design", "React"],
            links: {
                live: "https://nmaisheri.github.io/",
                code: "https://github.com/nmaisheri/nmaisheri.github.io"
            }
        },
        {
            id: 2,
            title: "Autonomous Obstacle-Traversing Vehicle",
            description: "Co-Lead a team of 8 to design and build a self-navigating vehicle. Integrated sensors, dual motors, and servo arms with custom firmware.",
            details: "Presented the final system and design tradeoffs in a 15-minute technical showcase to an audience of over 200.",
            technologies: ["Arduino", "C++", "Autodesk", "3D Printing", "Sensor Integration"],
            type: "Academic Project"
        },
        {
            id: 3,
            title: "Java Data Structures & Algorithms Suite",
            description: "A comprehensive suite of data structures and algorithms implemented in Java, designed to help students understand core concepts through interactive visualizations and hands-on coding exercises.",
            details: "Utilizes JavaFX for the front-end and a custom-built server for handling user interactions and data storage.",
            technologies: ["Java", "JavaFX", "Data Structures", "Algorithms", "Interactive UI"],
            type: "Academic Project"
        },
        {
            id: 4,
            title: "Test Execution Monitor",
            description: "Developed a real-time pytest automation dashboard using Python, HTML, CSS, and JavaScript to monitor 10,000+ test executions with live status updates and marker-based filtering.",
            details: "Implemented interactive error visualization, responsive UI design, and modular code architecture with separated CSS/JavaScript files for enhanced maintainability and scalability.",
            technologies: ["Python", "HTML/CSS", "JavaScript", "Real-time Dashboard"],
            links: {
                code: "https://github.com/nmaisheri/Test_Execution_Report"
            }
        }
    ]);

    const ProjectCard = ({ project }) => (
        React.createElement('div', { className: 'project' },
            React.createElement('div', { className: 'project-header' },
                React.createElement('h3', null, project.title),
                React.createElement('div', { className: 'project-links' },
                    project.links?.live && React.createElement('a', {
                        href: project.links.live,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'project-link live'
                    }, 'View Live'),
                    project.links?.code && React.createElement('a', {
                        href: project.links.code,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'project-link code'
                    }, 'View Code'),
                    project.type && React.createElement('span', { className: 'project-date' }, project.type)
                )
            ),
            React.createElement('div', { className: 'project-description' },
                React.createElement('p', null, project.description),
                React.createElement('p', null, project.details),
                React.createElement('div', { className: 'project-tech' },
                    project.technologies.map((tech, index) =>
                        React.createElement('span', { key: index, className: 'tech-tag' }, tech)
                    )
                )
            )
        )
    );

    return React.createElement('section', { id: 'projects' },
        React.createElement('h2', null, 'Featured Projects'),
        React.createElement('p', null, "Here are some of the projects I've worked on:"),
        projects.map(project =>
            React.createElement(ProjectCard, { key: project.id, project: project })
        )
    );
};

// Render the component
ReactDOM.render(React.createElement(ProjectsSection), document.getElementById('projects-container'));