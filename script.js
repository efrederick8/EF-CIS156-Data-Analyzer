
const categoryInput = "Academic";
const statusInput = "All";

const campusEvents = [
    { name: "Club Fair", category: "Student Life", attendance: 180, capacity: 250, status: "Completed" },
    { name: "Cybersecurity Class", category: "Academic", attendance: 75, capacity: 100, status: "Completed" },
    { name: "Basketball Game", category: "Sports", attendance: 420, capacity: 500, status: "Completed" },
    { name: "Career Workshop", category: "Career", attendance: 60, capacity: 80, status: "Completed" },
    { name: "Movie Night", category: "Student Life", attendance: 95, capacity: 120, status: "Scheduled" },
    { name: "Math Help", category: "Academic", attendance: 28, capacity: 35, status: "Completed" },
    { name: "Soccer Game", category: "Sports", attendance: 210, capacity: 300, status: "Scheduled" },
    { name: "Internship Panel", category: "Career", attendance: 0, capacity: 0, status: "Cancelled" },
    { name: "Volunteer Day", category: "Community", attendance: 48, capacity: 60, status: "Completed" },
    { name: "Art Showcase", category: "Arts", attendance: 85, capacity: 100, status: "Scheduled" },
    { name: "Study Seminar", category: "Academic", attendance: 40, capacity: 50, status: "Scheduled" },
    { name: "Open Mic", category: "Arts", attendance: 70, capacity: 90, status: "Completed" }
];

function filterEvents(events, category, status) {
    return events.filter(function(event) {
        return (category === "All" || event.category === category) &&
               (status === "All" || event.status === status);
    });
}

function getAttendanceRates(events) {
    return events.map(function(event) {
        let rate = "N/A";

        if (event.capacity > 0) {
            rate = ((event.attendance / event.capacity) * 100).toFixed(1) + "%";
        }

        return {
            name: event.name,
            category: event.category,
            attendance: event.attendance,
            capacity: event.capacity,
            attendanceRate: rate,
            status: event.status
        };
    });
}

function findEvent(events, name) {
    return events.find(function(event) {
        return event.name === name;
    });
}

function hasZeroCapacity(events) {
    return events.some(function(event) {
        return event.capacity === 0;
    });
}

function validEvents(events) {
    return events.every(function(event) {
        return event.attendance >= 0 &&
               event.capacity >= 0 &&
               event.attendance <= event.capacity;
    });
}

function getTotalAttendance(events) {
    return events.reduce(function(total, event) {
        return total + event.attendance;
    }, 0);
}

function getTotalCapacity(events) {
    return events.reduce(function(total, event) {
        return total + event.capacity;
    }, 0);
}

function sortEvents(events) {
    let sortedEvents = events.slice();

    sortedEvents.sort(function(a, b) {
        if (b.attendance !== a.attendance) {
            return b.attendance - a.attendance;
        }

        return a.name.localeCompare(b.name);
    });

    return sortedEvents;
}

function getSummary(events) {
    let totalAttendance = getTotalAttendance(events);
    let totalCapacity = getTotalCapacity(events);
    let fillRate = "N/A";

    if (totalCapacity > 0) {
        fillRate = ((totalAttendance / totalCapacity) * 100).toFixed(1) + "%";
    }

    return {
        eventCount: events.length,
        totalAttendance: totalAttendance,
        totalCapacity: totalCapacity,
        fillRate: fillRate
    };
}

let filteredEvents = filterEvents(
    campusEvents,
    categoryInput,
    statusInput
);

let sortedEvents = sortEvents(filteredEvents);
let attendanceReport = getAttendanceRates(sortedEvents);
let summary = getSummary(filteredEvents);



if (attendanceReport.length === 0) {
    console.log("No events matched your input.");
} else {
    attendanceReport.forEach(function(event) {
        console.log("Event:", event.name);
        console.log("Category:", event.category);
        console.log("Attendance:", event.attendance);
        console.log("Capacity:", event.capacity);
        console.log("Attendance Rate:", event.attendanceRate);
        console.log("Status:", event.status);
        console.log("--------------------");
    });
}

console.log("SUMMARY");
console.log("Number of Events:", summary.eventCount);
console.log("Total Attendance:", summary.totalAttendance);
console.log("Total Capacity:", summary.totalCapacity);
console.log("Overall Fill Rate:", summary.fillRate);

