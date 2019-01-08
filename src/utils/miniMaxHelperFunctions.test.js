import {returnIndexOfAvailableMoves} from './miniMaxHelperFunctions';

describe('test', () => {
    
    var state1 = {
        squares: [null, null, null, null, null, null, null, null, null],
        xIsNext: true,
        isPvp: true,
        tick: 0,
        points: 0
    };

    var state2 = {
        squares: ['x', null, null, null, null, null, null, null, null],
        xIsNext: true,
        isPvp: true,
        tick: 1,
        points: 0
    };

    var state3 = {
        squares: ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        xIsNext: true,
        isPvp: true,
        tick: 1,
        points: 0
    };



it('if null replace with array index', ()=> {
    expect(returnIndexOfAvailableMoves(state1)).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8])
})

it('there should be no 0 in array', ()=> {
    expect(returnIndexOfAvailableMoves(state2)).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
})

it('it should return an empty array', ()=> {
    expect(returnIndexOfAvailableMoves(state3)).toEqual([]);
})

})
