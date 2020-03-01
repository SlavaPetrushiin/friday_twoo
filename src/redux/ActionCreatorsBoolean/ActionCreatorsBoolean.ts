export const SET_STATUS = 'SET_STATUS';

export interface IStatus {
    type: typeof SET_STATUS,
    name: string
    status: boolean,
    message: string
}

export type BooleanActions = IStatus ;

export const setStatusAC = (name: string, status: boolean, message: string): IStatus => {
    return {type: SET_STATUS, name, status, message}
};