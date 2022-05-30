var logic = require('../src/logic')

var ti = new Date('2022-05-30T12:18:05.851Z')

describe("Logic Tests", () => {
    test('Negative time invalid', () => {
        var tprev = new Date('2022-05-30T12:17:05.851Z')
        expect(logic.calculateAmount(ti,tprev)).toBe(-1)
    })
    test('Same time invalid', () => {
        var tsame = new Date('2022-05-30T12:18:05.851Z')
        expect(logic.calculateAmount(ti,tsame)).toBe(-1)
    })
    test('Within Minute', () => {
        var twithinMinute = new Date('2022-05-30T12:18:06.851Z')
        expect(logic.calculateAmount(ti,twithinMinute)).toBe(10)
    })
    test('Within Hour', () => {
        var twithinHour = new Date('2022-05-30T12:18:06.851Z')
        expect(logic.calculateAmount(ti,twithinHour)).toBe(10)
    })
    test('Next but still one hour', () => {
        var tafter = new Date('2022-05-30T13:02:06.851Z')
        expect(logic.calculateAmount(ti,tafter)).toBe(10)
    })
    test('Some hours', () => {
        var tafter = new Date('2022-05-30T13:22:06.851Z')
        expect(logic.calculateAmount(ti,tafter)).toBe(20)
    })
    test('Some hours II', () => {
        var tafter = new Date('2022-05-30T15:22:06.851Z')
        expect(logic.calculateAmount(ti,tafter)).toBe(40)
    })
    test('Just below 24', () => {
        var tafter = new Date('2022-05-31T12:16:06.851Z')
        expect(logic.calculateAmount(ti,tafter)).toBe(240)
    })
    test('Just below 24', () => {
        var tafter = new Date('2022-05-31T12:50:06.851Z')
        expect(logic.calculateAmount(ti,tafter)).toBe(250)
    })
});