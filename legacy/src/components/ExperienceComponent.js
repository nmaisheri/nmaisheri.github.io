const { useState } = React;
const { createRoot } = ReactDOM;

const ExperienceSection = () => {
    const [experiences] = useState([
        {
            id: 1,
            title: "Software Engineering Intern",
            company: "Sparksoft Corporation",
            duration: "June 2025 - August 2025",
            location: "Columbia, MD",
            description: "Designed and led development of high-performance automation solutions. Focused on test infrastructure, framework development, and codebase optimization.",
            achievements: [
                "Implemented a high-performance test automation dashboard capable of processing 10,000+ test cases with real-time status visualization",
                "Developed a modular Pytest framework with intelligent test randomization, marker-based filtering, and dynamic execution timing to enhance test flexibility",
                "Led a full codebase reorganization focused on modularity and long-term maintainability, significantly improving scalability and developer productivity"
            ]
        },
        {
            id: 2,
            title: "Student IT Worker",
            company: "University of Maryland School of Public Health",
            duration: "Feb 2025 - Present",
            location: "College Park, MD",
            description: "Providing comprehensive IT and audiovisual support for academic operations. Managing technical infrastructure for classes, events, and administrative functions.",
            achievements: [
                "Set up and troubleshoot AV and IT support for classes and in-house events, handling tickets via Jira",
                "Assist professors, guests, and department heads with resolving computer issues efficiently and effectively",
                "Set up, maintain, and test audiovisual and IT systems for classes, seminars, and live events"
            ]
        },
        {
            id: 3,
            title: "Seasonal Production Warehouse Technician",
            company: "Daly Computers",
            duration: "June 2023 - August 2023",
            location: "Frederick, MD",
            description: "Managed logistics and technical operations in a high-volume production environment. Focused on hardware assembly, testing, and quality assurance.",
            achievements: [
                "Configured, imaged, and tested hardware and software components for K-12 schools",
                "Organized and palletized 100s of customer and individual orders",
                "Performed quality assurance and quality control audits"
            ]
        }
    ]);

    const [skills] = useState({
        "Programming Languages": ["Python", "Java", "JavaScript", "C++", "HTML/CSS", "Swift"],
        "Frameworks & Tools": ["SwiftUI", "Git", "Jira", "Arduino", "Pytest", "React"],
        "Technologies": ["AWS", "Azure", "Test Automation", "AV Systems", "3D Printing"]
    });

    const ExperienceCard = ({ experience }) => (
        React.createElement('div', { 
            className: 'experience-item',
            style: {
                background: 'rgba(163, 177, 138, 0.1)',
                border: '1px solid rgba(88, 129, 87, 0.3)',
                borderRadius: '15px',
                padding: '30px',
                margin: '40px 0',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none'
            }
        },
            React.createElement('div', { 
                className: 'experience-header',
                style: {
                    marginBottom: '20px'
                }
            },
                React.createElement('h3', { 
                    style: { 
                        color: '#344E41', 
                        margin: '0 0 15px 0',
                        fontSize: '1.4em',
                        fontWeight: '500',
                        fontFamily: '"Montserrat", sans-serif'
                    } 
                }, experience.title),
                React.createElement('div', { 
                    className: 'company-info',
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                    }
                },
                    React.createElement('span', { 
                        className: 'company',
                        style: {
                            color: '#588157',
                            fontSize: '1.1em',
                            fontWeight: '500',
                            fontFamily: '"Montserrat", sans-serif'
                        }
                    }, experience.company),
                    React.createElement('div', {
                        style: {
                            display: 'flex',
                            gap: '20px',
                            flexWrap: 'wrap',
                            fontSize: '0.95em'
                        }
                    },
                        React.createElement('span', { 
                            className: 'duration',
                            style: {
                                color: '#3A5A40',
                                fontFamily: '"Montserrat", sans-serif',
                                fontWeight: '400'
                            }
                        }, experience.duration),
                        React.createElement('span', { 
                            className: 'location',
                            style: {
                                color: '#3A5A40',
                                opacity: '0.8',
                                fontFamily: '"Montserrat", sans-serif',
                                fontStyle: 'italic'
                            }
                        }, experience.location)
                    )
                )
            ),
            React.createElement('div', { 
                className: 'experience-description',
                style: {
                    borderTop: '1px solid rgba(88, 129, 87, 0.3)',
                    paddingTop: '20px'
                }
            },
                React.createElement('p', { 
                    style: { 
                        textAlign: 'left', 
                        fontSize: '1.1em', 
                        lineHeight: '1.6', 
                        marginBottom: '20px',
                        color: '#3A5A40',
                        fontFamily: '"Montserrat", sans-serif'
                    } 
                }, experience.description),
                React.createElement('ul', { 
                    className: 'achievements',
                    style: {
                        listStyle: 'none',
                        padding: '0',
                        margin: '0'
                    }
                },
                    experience.achievements.map((achievement, index) =>
                        React.createElement('li', { 
                            key: index,
                            style: {
                                position: 'relative',
                                paddingLeft: '25px',
                                marginBottom: '12px',
                                color: '#3A5A40',
                                fontSize: '1em',
                                lineHeight: '1.5',
                                fontFamily: '"Montserrat", sans-serif'
                            }
                        },
                            React.createElement('span', {
                                style: {
                                    position: 'absolute',
                                    left: '0',
                                    top: '8px',
                                    width: '6px',
                                    height: '6px',
                                    borderRadius: '50%',
                                    background: '#588157'
                                }
                            }),
                            achievement
                        )
                    )
                )
            )
        )
    );

    const SkillCategory = ({ category, skillList }) => (
        React.createElement('div', { 
            className: 'skill-category',
            style: {
                background: 'rgba(163, 177, 138, 0.1)',
                border: '1px solid rgba(88, 129, 87, 0.3)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none'
            }
        },
            React.createElement('h4', { 
                style: { 
                    color: '#344E41', 
                    margin: '0 0 12px 0',
                    fontSize: '1.1em',
                    fontWeight: '500',
                    fontFamily: '"Montserrat", sans-serif'
                } 
            }, category),
            React.createElement('div', {
                style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
                }
            },
                skillList.map((skill, index) =>
                    React.createElement('span', {
                        key: index,
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
                            boxShadow: 'none'
                        }
                    }, skill)
                )
            )
        )
    );

    return React.createElement('section', { 
        id: 'experience',
        style: {
            margin: window.innerWidth <= 768 ? '60px 10px' : '120px 0',
            padding: window.innerWidth <= 768 ? '30px 20px' : '60px 40px',
            background: 'rgba(163, 177, 138, 0.08)',
            borderRadius: '20px',
            border: '1px solid rgba(88, 129, 87, 0.2)',
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
                color: '#344E41', 
                fontWeight: '300', 
                letterSpacing: '2px',
                fontFamily: '"Montserrat", sans-serif'
            } 
        }, 'Professional Experience'),
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
        }, "Here's where I've gained valuable experience and contributed to meaningful projects:"),
        
        // Experience items
        experiences.map(experience =>
            React.createElement(ExperienceCard, { key: experience.id, experience: experience })
        ),
        
        // Skills section
        React.createElement('div', { 
            className: 'skills',
            style: {
                marginTop: '60px'
            }
        },
            React.createElement('h3', { 
                style: { 
                    fontSize: '2em', 
                    margin: '40px 0 30px', 
                    textAlign: 'center', 
                    color: '#344E41', 
                    fontWeight: '300', 
                    letterSpacing: '1px',
                    fontFamily: '"Montserrat", sans-serif'
                } 
            }, 'Technical Skills'),
            React.createElement('div', { 
                className: 'skills-grid',
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '25px',
                    marginBottom: '40px'
                }
            },
                Object.entries(skills).map(([category, skillList]) =>
                    React.createElement(SkillCategory, { 
                        key: category, 
                        category: category, 
                        skillList: skillList 
                    })
                )
            )
        ),
        
        // Resume download
        React.createElement('div', { 
            className: 'contact-redirect',
            style: {
                textAlign: 'center',
                marginTop: '40px',
                padding: '30px',
                background: 'rgba(163, 177, 138, 0.1)',
                border: '1px solid rgba(88, 129, 87, 0.3)',
                borderRadius: '15px',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none'
            }
        },
            React.createElement('p', { 
                style: { 
                    fontSize: '1.1em', 
                    color: '#3A5A40',
                    fontFamily: '"Montserrat", sans-serif',
                    margin: '0'
                } 
            },
                'Interested in learning more? ',
                React.createElement('a', {
                    href: 'pages/contact.html',
                    style: { 
                        color: '#588157',
                        textDecoration: 'none',
                        fontWeight: '500',
                        padding: '8px 16px',
                        border: '1px solid #588157',
                        borderRadius: '20px',
                        transition: 'all 0.3s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '10px',
                        background: 'transparent',
                        fontFamily: '"Montserrat", sans-serif',
                        boxShadow: 'none'
                    }
                }, "Let's connect")
            )
        )
    );
};

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('experience');
if (container) {
    const root = createRoot(container);
    root.render(React.createElement(ExperienceSection));
    console.log('Experience component rendered');
} else {
    console.error('Experience container not found');
}