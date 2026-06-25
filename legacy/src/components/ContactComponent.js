const { useState } = React;
const { createRoot } = ReactDOM;

const ContactSection = () => {
    const [contactMethods] = useState([
        {
            id: 'email',
            icon: 'fas fa-envelope',
            title: 'Email',
            value: 'maisherinipun@gmail.com',
            link: 'mailto:maisherinipun@gmail.com'
        },
        {
            id: 'phone',
            icon: 'fas fa-phone',
            title: 'Phone',
            value: '(240) 665-9411',
            link: 'tel:+12406659411'
        },
        {
            id: 'location',
            icon: 'fas fa-map-marker-alt',
            title: 'Location',
            value: 'College Park, MD',
            link: null
        }
    ]);

    const [socialLinks] = useState([
        {
            id: 'linkedin',
            icon: 'fab fa-linkedin-in',
            title: 'LinkedIn',
            url: 'https://www.linkedin.com/in/nipun-maisheri/',
            className: 'linkedin'
        },
        {
            id: 'github',
            icon: 'fab fa-github',
            title: 'GitHub',
            url: 'https://github.com/nmaisheri',
            className: 'github'
        },
        {
            id: 'email',
            icon: 'fas fa-envelope',
            title: 'Email',
            url: 'mailto:maisherinipun@gmail.com',
            className: 'email'
        }
    ]);

    const ContactCard = ({ method }) => (
        React.createElement('div', {
            className: 'contact-card',
            style: {
                background: 'rgba(163, 177, 138, 0.1)',
                border: '1px solid rgba(88, 129, 87, 0.3)',
                borderRadius: '15px',
                padding: '30px',
                textAlign: 'center',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)',
                boxShadow: 'none'
            }
        },
            React.createElement('i', {
                className: method.icon,
                style: {
                    fontSize: '2.5em',
                    color: '#588157',
                    marginBottom: '20px',
                    display: 'block'
                }
            }),
            React.createElement('h3', {
                style: {
                    color: '#344E41',
                    marginBottom: '15px',
                    fontWeight: '500',
                    fontFamily: '"Montserrat", sans-serif'
                }
            }, method.title),
            method.link ? 
                React.createElement('p', null,
                    React.createElement('a', {
                        href: method.link,
                        style: {
                            color: '#3A5A40',
                            textDecoration: 'none',
                            transition: 'color 0.3s ease',
                            fontFamily: '"Montserrat", sans-serif'
                        }
                    }, method.value)
                ) :
                React.createElement('p', {
                    style: {
                        color: '#3A5A40',
                        fontFamily: '"Montserrat", sans-serif'
                    }
                }, method.value)
        )
    );

    const SocialLink = ({ social }) => (
        React.createElement('a', {
            href: social.url,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: `social-link ${social.className}`,
            style: {
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                borderRadius: '25px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                background: 'rgba(163, 177, 138, 0.1)',
                border: '1px solid rgba(88, 129, 87, 0.3)',
                color: '#3A5A40',
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: '500',
                boxShadow: 'none'
            }
        },
            React.createElement('i', {
                className: social.icon,
                style: {
                    fontSize: '1.2em',
                    color: '#588157'
                }
            }),
            React.createElement('span', null, social.title)
        )
    );

    return React.createElement('div', null,
        // Contact Info Section
        React.createElement('section', {
            id: 'contact-info',
            style: {
                margin: '120px 0',
                padding: '60px 40px',
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
            }, "Let's Connect"),
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
            }, "I'm always interested in new opportunities and collaborations. Feel free to reach out!"),
            React.createElement('div', {
                className: 'contact-methods',
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '30px',
                    marginTop: '40px'
                }
            },
                contactMethods.map(method =>
                    React.createElement(ContactCard, { key: method.id, method: method })
                )
            )
        ),

        // Social Media Section
        React.createElement('section', {
            id: 'social-media',
            style: {
                margin: '120px 0',
                padding: '60px 40px',
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
            }, "Find Me Online"),
            React.createElement('div', {
                className: 'social-links',
                style: {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    marginTop: '40px'
                }
            },
                socialLinks.map(social =>
                    React.createElement(SocialLink, { key: social.id, social: social })
                )
            )
        ),

        // Resume Download Section
        React.createElement('section', {
            id: 'resume-download',
            style: {
                margin: '120px 0',
                padding: '60px 40px',
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
            }, "Resume"),
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
            }, "Interested in my background and experience? Download my resume below."),
            React.createElement('div', {
                className: 'resume-card',
                style: {
                    background: 'rgba(163, 177, 138, 0.1)',
                    border: '1px solid rgba(88, 129, 87, 0.3)',
                    borderRadius: '15px',
                    padding: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '30px',
                    flexWrap: 'wrap',
                    backdropFilter: 'blur(10px)',
                    boxShadow: 'none'
                }
            },
                React.createElement('div', {
                    className: 'resume-preview',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '20px',
                        flex: '1'
                    }
                },
                    React.createElement('i', {
                        className: 'fas fa-file-pdf',
                        style: {
                            fontSize: '3em',
                            color: '#588157'
                        }
                    }),
                    React.createElement('div', {
                        className: 'resume-info'
                    },
                        React.createElement('p', {
                            className: 'file-info',
                            style: {
                                color: '#3A5A40',
                                opacity: '0.8',
                                fontSize: '0.9em',
                                margin: '0',
                                fontFamily: '"Montserrat", sans-serif',
                                fontStyle: 'italic'
                            }
                        }, "Updated August 2025")
                    )
                ),
                React.createElement('a', {
                    href: '../assets/documents/resume.pdf', // Updated path
                    download: 'Resume.pdf',
                    className: 'download-btn',
                    style: {
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '12px 24px',
                        background: '#588157',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '25px',
                        transition: 'all 0.3s ease',
                        fontFamily: '"Montserrat", sans-serif',
                        fontWeight: '500',
                        border: '1px solid #588157',
                        boxShadow: 'none'
                    }
                },
                    React.createElement('i', {
                        className: 'fas fa-download'
                    }),
                    'Download Resume'
                )
            )
        )
    );
};

// Use createRoot instead of ReactDOM.render
const container = document.getElementById('contact-container');
const root = createRoot(container);
root.render(React.createElement(ContactSection));