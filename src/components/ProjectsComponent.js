const { useState } = React;
const { createRoot } = ReactDOM;

const ProjectsSection = () => {
    const [projects] = useState([
        {
            id: 1,
            title: "Interactive Website Portfolio",
            date: "August 2025",
            description: "A modern, responsive portfolio website with interactive particle animations and smooth transitions to provide an engaging user experience.",
            details: "Built entirely with HTML, CSS, JavaScript, and React, this project showcases my skills in front-end development and design.",
            technologies: ["HTML/CSS", "JavaScript", "Canvas API", "React"],
            links: {
                live: "https://nmaisheri.github.io/",
                code: "https://github.com/nmaisheri/nmaisheri.github.io"
            }
        },
        {
            id: 2,
            title: "Test Execution Monitor",
            date: "August 2025",
            description: "Developed a real-time pytest automation dashboard using Python, HTML, CSS, and JavaScript to monitor 10,000+ test executions with live status updates and marker-based filtering.",
            details: "Implemented interactive error visualization, responsive UI design, and modular code architecture with separated CSS/JavaScript files for enhanced maintainability and scalability.",
            technologies: ["Python", "HTML/CSS", "JavaScript"],
            links: {
                code: "https://github.com/nmaisheri/Test_Execution_Report"
            }
        },
        {
            id: 3,
            title: "Autonomous Obstacle-Traversing Vehicle",
            date: "April 2025",
            description: "Co-Lead a team of 8 to design and build a self-navigating vehicle. Integrated sensors, dual motors, and servo arms with custom firmware.",
            details: "Presented the final system and design tradeoffs in a 15-minute technical showcase to an audience of over 200.",
            technologies: ["Arduino", "C++", "Autodesk", "3D Printing", "Sensor Integration"],
            type: "Academic Project"
        },
        {
            id: 4,
            title: "Java Data Structures & Algorithms Suite",
            date: "March 2025",
            description: "A comprehensive suite of data structures and algorithms implemented in Java, designed to help students understand core concepts through interactive visualizations and hands-on coding exercises.",
            details: "All User information was saved locally, and generated over 45 different users, helping them learn the basic of object oriented programming",
            technologies: ["Java", "JavaFX", "Data Structures", "Algorithms", "Interactive UI"],
            type: "Academic Project"
        },
        {
            id: 5,
            title: "Smart Clipboard Manager",
            date: "In Progress",
            description: "Built for Mac using Swift and SwiftUI, this clipboard manager allows users to store and manage multiple clipboard items efficiently.",
            details: "Features include search functionality, categorization of clipboard items, summation of text items and images using AI integration, designed to boost productivity.",
            technologies: ["Swift", "SwiftUI", "ChatGPT API"],
            type: "Personal Project"
        }
    ]);

    const ProjectCard = ({ project }) => (
        React.createElement('div', { 
            className: 'project',
            style: {
                background: 'var(--section-bg)',
                border: '1px solid var(--border-color)',
                borderRadius: '15px',
                padding: window.innerWidth <= 768 ? '20px' : '30px',
                margin: window.innerWidth <= 768 ? '20px 0' : '40px 0',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none'
            }
        },
            React.createElement('div', { 
                className: 'project-header',
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                    flexWrap: 'wrap',
                    gap: '15px'
                }
            },
                React.createElement('div', {
                    className: 'project-title-section',
                    style: {
                        flex: '1',
                        minWidth: '250px'
                    }
                },
                    React.createElement('h3', { 
                        style: { 
                            color: 'var(--text-primary)', 
                            margin: '0 0 8px 0',
                            fontSize: '1.4em',
                            fontWeight: '500',
                            fontFamily: '"Montserrat", sans-serif',
                            lineHeight: '1.2'
                        } 
                    }, project.title),
                    React.createElement('div', {
                        className: 'project-date',
                        style: {
                            color: 'var(--accent-primary)',
                            fontSize: '0.95em',
                            fontFamily: '"Montserrat", sans-serif',
                            fontWeight: '400',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                        }
                    },
                        React.createElement('i', {
                            className: 'fa fa-calendar',
                            style: {
                                fontSize: '0.9em',
                                opacity: '0.8'
                            }
                        }),
                        project.date
                    )
                ),
                React.createElement('div', { 
                    className: 'project-links',
                    style: {
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        flexShrink: '0'
                    }
                },
                    project.links?.live && React.createElement('a', {
                        href: project.links.live,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'project-link live',
                        style: {
                            padding: '8px 16px',
                            borderRadius: '20px',
                            textDecoration: 'none',
                            fontSize: '0.9em',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            fontFamily: '"Montserrat", sans-serif',
                            border: '1px solid var(--accent-primary)',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '36px',
                            background: 'var(--accent-primary)',
                            color: 'var(--bg-primary)',
                            boxShadow: 'none'
                        }
                    }, 'View Live'),
                    project.links?.code && React.createElement('a', {
                        href: project.links.code,
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        className: 'project-link code',
                        style: {
                            padding: '8px 16px',
                            borderRadius: '20px',
                            textDecoration: 'none',
                            fontSize: '0.9em',
                            fontWeight: '500',
                            transition: 'all 0.3s ease',
                            fontFamily: '"Montserrat", sans-serif',
                            border: '1px solid var(--accent-primary)',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '36px',
                            background: 'transparent',
                            color: 'var(--accent-primary)',
                            boxShadow: 'none'
                        }
                    }, 'View Code'),
                    project.type && React.createElement('span', { 
                        className: 'project-type',
                        style: {
                            color: 'var(--text-secondary)',
                            opacity: '0.8',
                            fontSize: '0.9em',
                            fontFamily: '"Montserrat", sans-serif',
                            fontStyle: 'italic',
                            whiteSpace: 'nowrap',
                            height: '36px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }
                    }, project.type)
                )
            ),
            React.createElement('div', { className: 'project-description' },
                React.createElement('p', { 
                    style: { 
                        textAlign: 'left', 
                        fontSize: '1.1em', 
                        lineHeight: '1.6', 
                        marginBottom: '15px',
                        color: 'var(--text-secondary)'
                    } 
                }, project.description),
                React.createElement('p', { 
                    style: { 
                        textAlign: 'left', 
                        fontSize: '1.1em', 
                        lineHeight: '1.6', 
                        marginBottom: '20px',
                        color: 'var(--text-secondary)',
                        opacity: '0.9'
                    } 
                }, project.details),
                React.createElement('div', { 
                    className: 'project-tech',
                    style: {
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginTop: '15px',
                        paddingTop: '15px',
                        borderTop: '1px solid var(--border-color)'
                    }
                },
                    project.technologies.map((tech, index) =>
                        React.createElement('span', { 
                            key: index, 
                            className: 'tech-tag',
                            style: {
                                background: 'var(--hover-bg)',
                                color: 'var(--text-primary)',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                fontSize: '0.8em',
                                fontWeight: '400',
                                fontFamily: '"Montserrat", sans-serif',
                                border: '1px solid var(--border-color)',
                                transition: 'all 0.3s ease',
                                boxShadow: 'none'
                            }
                        }, tech)
                    )
                )
            )
        )
    );

    return React.createElement('section', { 
        id: 'projects',
        style: {
            margin: '120px 0',
            padding: '60px 40px',
            background: 'var(--section-bg)',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            position: 'relative',
            backdropFilter: 'blur(15px)',
            boxShadow: 'none'
        }
    },
        React.createElement('h2', { 
            style: { 
                fontSize: '2.5em', 
                margin: '40px 0 20px', 
                textAlign: 'center', 
                color: 'var(--text-primary)', 
                fontWeight: '300', 
                letterSpacing: '2px',
                fontFamily: '"Montserrat", sans-serif'
            } 
        }, 'Featured Projects'),
        React.createElement('p', { 
            style: { 
                lineHeight: '1.8', 
                fontSize: '1.2em', 
                textAlign: 'center', 
                color: 'var(--text-secondary)', 
                fontWeight: '300',
                fontFamily: '"Montserrat", sans-serif',
                marginBottom: '40px'
            } 
        }, "Here are some of the projects I've worked on:"),
        projects.map(project =>
            React.createElement(ProjectCard, { key: project.id, project: project })
        )
    );
};

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('projects');
if (container) {
    const root = createRoot(container);
    root.render(React.createElement(ProjectsSection));
    console.log('Projects component rendered');
} else {
    console.error('Projects container not found');
}