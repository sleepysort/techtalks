var chai = require("chai");
var sinon = require("sinon");
var ex = require("../exercises.js");

describe("Exercise 1: pow()", function () {
    it("returns 1 when exponent is 0", function () {
        var base = 5;
        var expected = 1;

        var actual = ex.pow(base, 0);

        chai.assert.deepEqual(actual, expected);
    });

    it("returns 4 when base is 2 and exp is 2", function () {
        var expected = 4;

        var actual = ex.pow(2, 2);

        chai.assert.deepEqual(actual, expected);
    });

    it("returns 243 when base is 3 and exp is 5", function () {
        var expected = 243;

        var actual = ex.pow(3, 5);

        chai.assert.deepEqual(actual, expected);
    });

    it("returns x when base is x and exp is 1", function () {
        var base = 23;
        var expected = base;

        var actual = ex.pow(base, 1);

        chai.assert.deepEqual(actual, expected);
    });
});

describe("Exercise 2: create2dVector()", function () {
    it("returns correct vector when called with positive numbers", function () {
        var expected = { x: 3, y: 5 };

        var actual = ex.create2dVector(3, 5);

        chai.assert.deepEqual(actual, expected);
    });

    it("returns correct vector when called with negative numbers", function () {
        var expected = { x: -7, y: -32 };

        var actual = ex.create2dVector(-7, -32);

        chai.assert.deepEqual(actual, expected);
    });

    it("returns correct vector when called with zeroes", function () {
        var expected = { x: 0, y: 0 };

        var actual = ex.create2dVector(0, 0);

        chai.assert.deepEqual(actual, expected);
    });
});

describe("Exercise 3: callWithDouble()", function () {
    it("calls cb with 0 when given 0", function () {
        var cb = sinon.spy();

        ex.callWithDouble(0, cb);

        chai.assert.isTrue(cb.calledWith(0));
    });

    it("calls cb with 10 when given 5", function () {
        var cb = sinon.spy();

        ex.callWithDouble(5, cb);

        chai.assert.isTrue(cb.calledWith(10));
    });

    it("calls cb with 5 when given 2.5", function () {
        var cb = sinon.spy();

        ex.callWithDouble(2.5, cb);

        chai.assert.isTrue(cb.calledWith(5));
    });

    it("calls cb with -4 when given -2", function () {
        var cb = sinon.spy();

        ex.callWithDouble(-2, cb);

        chai.assert.isTrue(cb.calledWith(-4));
    });
});

describe("Exercise 4: compose()", function () {
    it("returns f when given f and the identity function", function () {
        var f = function(x) { return 2 * x; };
        var identity = function(x) { return x; };

        var h = ex.compose(f, identity);

        var testVal = 10;
        chai.assert.deepEqual(h(testVal), f(testVal));
    });

    it("returns g when given the identity function and g", function () {
        var identity = function(x) { return x; };
        var g = function(x) { return 2 * x; };

        var h = ex.compose(identity, g);

        var testVal = 13;
        chai.assert.deepEqual(h(testVal), g(testVal));
    });

    it("returns correctly composed zero argument f", function () {
        var f = function() { return 10; };
        var g = function(x) { return 2 * x; };

        var h = ex.compose(f, g);

        chai.assert.deepEqual(h(), 20);
    });

    it("returns correctly composed for same f and g functions", function () {
        var f = function(x) { return 2 * x; };

        var h = ex.compose(f, f);

        chai.assert.deepEqual(h(3), 27);
    });

    it("returns correctly composed string functions", function () {
        var f = function(s) { return s.trim() };
        var g = function(s) { return s.toUpperCase() };

        var h = ex.compose(f, g);

        chai.assert.deepEqual(h("   foo"), "FOO");
    });
});