const { useState } = React;
const { createRoot } = ReactDOM;

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
        React.createElement('div', { 
            className: 'project',
            style: {
                background: 'rgba(163, 177, 138, 0.1)',
                border: '1px solid rgba(88, 129, 87, 0.3)',
                borderRadius: '15px',
                padding: '30px',
                margin: '40px 0',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none' // Remove shadow
            }
        },
            React.createElement('div', { 
                className: 'project-header',
                style: {
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '15px',
                    flexWrap: 'wrap',
                    gap: '15px',
                    minHeight: '40px'
                }
            },
                React.createElement('h3', { 
                    style: { 
                        color: '#344E41', 
                        margin: '0',
                        fontSize: '1.4em',
                        fontWeight: '500',
                        fontFamily: '"Montserrat", sans-serif',
                        flex: '1',
                        lineHeight: '1.2'
                    } 
                }, project.title),
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
                            border: '1px solid #588157',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '36px',
                            background: '#588157',
                            color: 'white',
                            boxShadow: 'none' // Remove shadow
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
                            border: '1px solid #588157',
                            whiteSpace: 'nowrap',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '36px',
                            background: 'transparent',
                            color: '#588157',
                            boxShadow: 'none' // Remove shadow
                        }
                    }, 'View Code'),
                    project.type && React.createElement('span', { 
                        className: 'project-date',
                        style: {
                            color: '#3A5A40',
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
                        color: '#3A5A40'
                    } 
                }, project.description),
                React.createElement('p', { 
                    style: { 
                        textAlign: 'left', 
                        fontSize: '1.1em', 
                        lineHeight: '1.6', 
                        marginBottom: '20px',
                        color: '#3A5A40',
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
                        borderTop: '1px solid rgba(88, 129, 87, 0.3)'
                    }
                },
                    project.technologies.map((tech, index) =>
                        React.createElement('span', { 
                            key: index, 
                            className: 'tech-tag',
                            style: {
                                background: 'rgba(88, 129, 87, 0.2)',
                                color: '#344E41',
                                padding: '4px 12px',
                                borderRadius: '15px',
                                fontSize: '0.8em',
                                fontWeight: '400',
                                fontFamily: '"Montserrat", sans-serif',
                                border: '1px solid rgba(88, 129, 87, 0.4)',
                                transition: 'all 0.3s ease',
                                boxShadow: 'none' // Remove shadow
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
            background: 'rgba(163, 177, 138, 0.15) !important', // Stronger green background
            borderRadius: '20px',
            border: '1px solid rgba(88, 129, 87, 0.2)',
            position: 'relative',
            backdropFilter: 'blur(15px)',
            boxShadow: 'none' // Remove shadow
        }
    },
        React.createElement('h2', { 
            style: { 
                fontSize: '2.5em', 
                margin: '40px 0 20px', 
                textAlign: 'center', 
                color: '#344E41', 
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
                color: '#3A5A40', 
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
const container = document.getElementById('projects-container');
const root = createRoot(container);
root.render(React.createElement(ProjectsSection));