import reducer from './authReducer';
import * as actionTypes from '../actions/authActionTypes';

describe('authReducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {}))
            .toEqual({
                token: null,
                userId: null,
                error: null,
                loading: false,
                redirectPath: '/'
            });
    });

    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            redirectPath: '/'
        }, {
            type: actionTypes.AUTH_SUCCESS,
            payload: {
                localId: 'localId',
                idToken: 'token'
            }
        })).toEqual(expect.objectContaining({
            token: 'token',
        }));
    })
});