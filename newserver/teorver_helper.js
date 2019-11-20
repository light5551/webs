"use strict";

module.exports = class TeorverHelper {
    static NormalDistr(count, sold, cost) {
        var newcost = this.NormalFunc(sold / (count + sold), 1);
        return newcost * 2.5 * cost;
    }

    static NormalFunc(x, sigma) {
        return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-(Math.pow(x, 2)) / (2 * sigma * sigma));
    }

    static PriceTimeout(cost){
        setInterval(function () {
        });
    }
}
