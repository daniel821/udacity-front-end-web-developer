var bio = {
    "name": "Daniel Lin",
    "role": "DevOps Engineer",
    "biopic": "images/dan.jpg",
    "welcomeMessage": "DevOps Engineer with strong passion in Web Development!",
    "skills": [
        "General: Awesomeness, DevOps, Agile, Scrum",
        "Programming: Python, Ruby, JavaScript",
        "Cloud Computing: Linux, AWS, VMware",
        "Web Development: CSS/HTML, Flask, jQuery, AngularJS",
        "Database: PostgresSQL",
        "CI/CD: Ansible, Tower, Docker, Bamboo",
    ],
    "contacts": {
        "mobile": "(+61) 433-333-333",
        "email": "daniel.lin.821@gmail.com",
        "github": "https://github.com/daniel821",
        "location": "Sydney"
    },
    "display": function() {
        $("#header").prepend(HTMLheaderRole.replace("%data%", bio.role))
            .prepend(HTMLheaderName.replace("%data%", bio.name))
            .append(HTMLbioPic.replace("%data%", bio.biopic))
            .append(HTMLwelcomeMsg.replace("%data%", bio.welcomeMessage));

        $("#topContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile))
            .append(HTMLemail.replace("%data%", bio.contacts.email))
            .append(HTMLgithub.replace("%data%", bio.contacts.github))
            .append(HTMLlocation.replace("%data%", bio.contacts.location));

        $("#footerContacts").append(HTMLmobile.replace("%data%", bio.contacts.mobile))
            .append(HTMLemail.replace("%data%", bio.contacts.email))
            .append(HTMLgithub.replace("%data%", bio.contacts.github))
            .append(HTMLlocation.replace("%data%", bio.contacts.location));

        if (bio.skills.length > 0) {
            $("#header").append(HTMLskillsStart);

            bio.skills.forEach(function(skill) {
                var formattedSkill = HTMLskills.replace("%data%", skill);
                $("#skills").append(formattedSkill);
            });
        }
    }
};

var work = {
    "jobs": [{
        "employer": "Telstra",
        "title": "Platform Automation Engineer",
        "location": "Sydney",
        "dates": "May 2014 - Present",
        "description": "TBA"
    }, {
        "employer": "Telstra",
        "title": "Monitoring Technology Specialist",
        "location": "Adelaide",
        "dates": "March 2012 - May 2014",
        "description": "TBA"
    }, {
        "employer": "Voiteck",
        "title": "Linux System Administrator",
        "location": "Adelaide",
        "dates": "February 2011 - March 2012",
        "description": "TBA"
    }, ],
    "display": function() {
        work.jobs.forEach(function(job) {
            $("#workExperience").append(HTMLworkStart);
            var Employer = HTMLworkEmployer.replace("%data%", job.employer);
            var Title = HTMLworkTitle.replace("%data%", job.title);

            $(".work-entry:last").append(Employer + Title)
                .append(HTMLworkDates.replace("%data%", job.dates))
                .append(HTMLworkLocation.replace("%data%", job.location))
                .append(HTMLworkDescription.replace("%data%", job.description));
        });
    }
};

var projects = {
    "projects": [{
        "title": "Udacity - Full Stack Web Developer Nanodegree",
        "dates": "2016",
        "images": ["images/fsnd.jpg"],
        "description": "Learn how to create server-side, data-driven web applications that support any front-end and can scale to support hundreds of thousands of users."
    }],
    "display": function() {
        // for (var p in projects.projects) {
        projects.projects.forEach(function(project) {
            $("#projects").append(HTMLprojectStart.replace("%data%", project));
            $(".project-entry:last").append(HTMLprojectTitle.replace("%data%", project.title))
                .append(HTMLprojectDates.replace("%data%", project.dates))
                .append(HTMLprojectDescription.replace("%data%", project.description));
            project.images.forEach(function(image) {
                $(".project-entry:last").append(HTMLprojectImage.replace("%data%", image));
            });
        });
    }
};

var education = {
    "schools": [{
        "name": "University of South Australia",
        "location": "Adelaide, SA, AUS",
        "degree": "Bachelor's",
        "majors": ["Information and Communication Technology"],
        "dates": "2008 - 2010",
    }, {
        "name": "Kansai College of Business & Languages",
        "location": "Osaka, Japan",
        "degree": "Diploma",
        "majors": ["Japanese Studies"],
        "dates": "2015",
    }],
    "onlineCourse": [{
        "school": "Udacity",
        "title": "Full Stack Web Developer",
        "date": "2016",
        "url": "https://www.udacity.com/"
    }],
    "display": function() {
        education.schools.forEach(function(s) {
            $("#education").append(HTMLschoolStart.replace("%data%", s));
            $(".education-entry:last").append(HTMLschoolName.replace("%data%", s.name))
                .append(HTMLschoolDates.replace("%data%", s.dates))
                .append(HTMLschoolLocation.replace("%data%", s.location))
                .append(HTMLschoolMajor.replace("%data%", s.majors));
        });

        education.onlineCourse.forEach(function(s) {
            $("#education-entry:last").append(HTMLonlineClasses.replace("%data%", s));
            $(".education-entry:last").append(HTMLonlineTitle.replace("%data%", s.title))
                .append(HTMLonlineSchool.replace("%data%", s.school))
                .append(HTMLonlineDates.replace("%data%", s.date))
                .append(HTMLonlineURL.replace("%data%", s.url));
        });
    }
};

bio.display();
work.display();
projects.display();
education.display();

$("#mapDiv").append(googleMap);
