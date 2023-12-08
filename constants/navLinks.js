export const captain = userId => [
    {
        text: "Find crew members",
        link: "/crewmembers"
    },
    {
        text: "Your Trips",
        link: "/trips"
    },
    {
        text: "Applications",
        link: "/applications"
    },
    {
        text: "Inbox",
        link: "/inbox"
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
        text: "Inbox",
        link: "/inbox"
    },
    {
        text: "Profile",
        link: `/profile/crewmember/${userId}`
    },
    {
        text: "Logout"
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
