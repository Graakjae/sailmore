export const captain = userId => [
    {
        text: "Find crew members",
        link: "/CrewMembers"
    },
    {
        text: "Your Trips",
        link: "/TripsOverview"
    },
    {
        text: "Applications",
        link: "/Applications"
    },
    {
        text: "Inbox",
        link: "/Inbox"
    },
    {
        text: "Profile",
        link: `/profile_captain/${userId}`
    }
];

export const crewmembers = [
    {
        text: "Discover Trips",
        link: "/TripsOverview"
    },
    {
        text: "Your applications",
        link: "/Applications"
    },
    {
        text: "Inbox",
        link: "/Inbox"
    },
    {
        text: "Profile",
        link: "/Profile"
    },
    {
        text: "Logout"
    }
];

export const loggedout = [
    {
        text: "Discover Trips",
        link: "/TripsOverview"
    },
    {
        text: "Find crew members",
        link: "/CrewMembers"
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
