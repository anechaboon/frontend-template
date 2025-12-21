const GLOBAL_STATUS = Object.freeze({
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
})

const TICKET_STATUS = Object.freeze({
    open: 'Open',
    in_progress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
})

const GLOBAL_PRIORITIES = Object.freeze({
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
})

const PRIORITY_COLORS = Object.freeze({
    low: 'green',
    medium: 'blue',
    high: 'red',
    urgent: '#e111e1',
})

export { GLOBAL_PRIORITIES, GLOBAL_STATUS, PRIORITY_COLORS, TICKET_STATUS };

