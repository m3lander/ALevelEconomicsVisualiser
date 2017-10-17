/// <reference path="../../kg.ts" />

module KGAuthor {

    export class EconBudgetLine extends Segment {

        constructor(def, graph) {

            const xIntercept = divideDefs(def.m, def.p1),
                yIntercept = divideDefs(def.m, def.p2),
                priceRatio = divideDefs(def.p1, def.p2);

            def.a = [xIntercept, 0];
            def.b = [0, yIntercept];
            def.stroke = 'green';
            def.strokeWidth = 2;
            def.label = {text: 'BL'};

            if (def.draggable) {
                def.drag = [{
                    'directions': 'xy',
                    'param': paramName(def.m),
                    'expression': addDefs(multiplyDefs('drag.x', def.p1), multiplyDefs('drag.y', def.p2))
                }]
            }

            super(def, graph);

            const subObjects = this.subObjects;

            if (def.handles) {
                subObjects.push(new Point({
                    coordinates: [xIntercept, 0],
                    fill: 'green',
                    r: 4,
                    drag: [{
                        directions: 'x',
                        param: paramName(def.p1),
                        expression: divideDefs(def.m, 'drag.x')
                    }]
                }, graph));
                subObjects.push(new Point({
                    coordinates: [0, yIntercept],
                    fill: 'green',
                    r: 4,
                    drag: [{
                        directions: 'y',
                        param: paramName(def.p2),
                        expression: divideDefs(def.m, 'drag.y')
                    }]
                }, graph));
            }

            if (def.set) {
                subObjects.push(new Area({
                    fill: "green",
                    univariateFunction1: {
                        fn: `${yIntercept} - ${priceRatio}*x`,
                        samplePoints: 2,
                        max: xIntercept
                    },
                    show: def.set
                }, graph));
            }

            if (def.costlier) {
                subObjects.push(new Area({
                    fill: "red",
                    univariateFunction1: {
                        fn: `${yIntercept} - ${priceRatio}*x`,
                        samplePoints: 2
                    },
                    show: def.costlier,
                    above:true
                }, graph));
            }
        }
    }


}