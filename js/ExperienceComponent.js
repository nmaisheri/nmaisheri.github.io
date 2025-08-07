const { useState } = React;

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
                "Designed and implemented a high-performance test automation dashboard capable of processing 10,000+ test cases with real-time status visualization",
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
        }
    ]);

    const [skills] = useState({
        "Programming Languages": ["Python", "Java", "JavaScript", "C++", "HTML/CSS", "Swift"],
        "Frameworks & Tools": ["SwiftUI", "Git", "Jira", "Arduino", "Pytest", "React"],
        "Technologies": ["AWS", "Azure", "Test Automation", "AV Systems", "3D Printing"]
    });

    const ExperienceCard = ({ experience }) => (
        React.createElement('div', { className: 'experience-item' },
            React.createElement('div', { className: 'experience-header' },
                React.createElement('h3', null, experience.title),
                React.createElement('div', { className: 'company-info' },
                    React.createElement('span', { className: 'company' }, experience.company),
                    React.createElement('span', { className: 'duration' }, experience.duration),
                    React.createElement('span', { className: 'location' }, experience.location)
                )
            ),
            React.createElement('div', { className: 'experience-description' },
                React.createElement('p', null, experience.description),
                React.createElement('ul', { className: 'achievements' },
                    experience.achievements.map((achievement, index) =>
                        React.createElement('li', { key: index }, achievement)
                    )
                )
            )
        )
    );

    const SkillCategory = ({ category, skillList }) => (
        React.createElement('div', { className: 'skill-category' },
            React.createElement('h4', null, category),
            React.createElement('p', null, skillList.join(', '))
        )
    );

    return React.createElement('section', { id: 'experience' },
        React.createElement('h2', null, 'Professional Experience'),
        React.createElement('p', null, "Here's where I've gained valuable experience and contributed to meaningful projects:"),
        
        // Experience items
        experiences.map(experience =>
            React.createElement(ExperienceCard, { key: experience.id, experience: experience })
        ),
        
        // Skills section
        React.createElement('div', { className: 'skills' },
            React.createElement('h3', null, 'Technical Skills'),
            React.createElement('div', { className: 'skills-grid' },
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
        React.createElement('div', { className: 'resume-download' },
            React.createElement('p', null,
                'Want to learn more about my background? ',
                React.createElement('a', {
                    href: 'assets/resume.pdf',
                    target: '_blank',
                    style: { color: '#e54ed0' }
                }, 'Download my resume')
            )
        )
    );
};

// Render the component
ReactDOM.render(React.createElement(ExperienceSection), document.getElementById('experience-container'));