
export interface PathType {
    [key: string]: string;
}

const instance : PathType = {
    default: '/',
    admin: 'admin',
    home: 'home',
    login: 'login',
    register: 'register',
    forgotPassword: 'forgotPassword',
    senOTP: 'sendOTP',
    staff: 'staff',
    food: 'food',
    calendarWork: 'calendarWork',
    createCalendar: 'createCalendar',
    updateCalendar: 'updateCalendar/:id'
};

export default instance;