import {checkForName} from '../src/client/js/nameChecker'


describe('Test, the function "checkForName()" should exist' , () => {
    test('It should return true',  () => {
        expect(checkForName).toBeDefined();
    });
});
