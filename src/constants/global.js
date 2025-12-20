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

export { GLOBAL_PRIORITIES, GLOBAL_STATUS, TICKET_STATUS };

