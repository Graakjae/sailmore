export const captain = userId => [
    {
        text: "Find crew members",
        link: "/crewmembers"
    },
    {
        text: "Applications",
        link: "/applications"
    },

    {
        text: "Profile",
        link: `/profile/captain/${userId}`
    },
    {
        text: "Create Trip",
        link: `/create-trip`
    }
];

export const crewmembers = userId => [
    {
        text: "Discover Trips",
        link: "/trips"
    },
    {
        text: "Your applications",
        link: "/your-applications"
    },
    {
        text: "Profile",
        link: `/profile/crew/${userId}`
    }
];

export const loggedout = [
    {
        text: "Discover Trips",
        link: "/trips"
    },
    {
        text: "Find crew members",
        link: "/crewmembers"
    },
    {
        text: "Login",
        link: "/login"
    },
    {
        text: "Signup",
        link: "/signup"
    }
];
