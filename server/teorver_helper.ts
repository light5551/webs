import * as fs from 'fs';
import express from 'express';

export default class TeorverHelper {

    static NormalDistr(count:number, sold:number, cost:number)
    {
        const newcost = this.NormalFunc(sold/(count+sold), 1);
        return newcost * 2.5 * cost;
    }

    static NormalFunc(x:number, sigma:number)
    {
        return (1/(sigma*Math.sqrt(2*Math.PI)))*Math.exp(-(Math.pow(x,2))/(2*sigma*sigma))
    }

    static PriceTimeout(cost:number)
    {
        setInterval(() => {

        })
    }

}
