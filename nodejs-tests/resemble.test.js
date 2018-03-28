/* eslint-env jest*/

const resemble = require("../resemble");
const fs = require("fs");

describe("resemble", () => {
    test("base64", () => {
        const peopleSrc = `data:image/jpeg;base64,${fs.readFileSync(
            "./demoassets/People.jpg",
            "base64"
        )}`;
        const people2Src = `data:image/jpeg;base64,${fs.readFileSync(
            "./demoassets/People2.jpg",
            "base64"
        )}`;

        return new Promise(resolve => {
            resemble(peopleSrc)
                .compareTo(people2Src)
                .onComplete(data => {
                    // console.info('Reached oncomplete for base64String');
                    expect(data.diffBounds.bottom).toEqual(431);
                    expect(data.diffBounds.left).toEqual(22);
                    expect(data.diffBounds.right).toEqual(450);
                    expect(data.diffBounds.top).toEqual(58);
                    expect(data.dimensionDifference.height).toEqual(0);
                    expect(data.dimensionDifference.width).toEqual(0);
                    expect(data.isSameDimensions).toBe(true);
                    expect(data.misMatchPercentage).toEqual("8.66");
                    resolve();
                });
        });
    });

    // this doesn't work on windows

    // test('files', () => {
    //   return new Promise(function(resolve) {
    //       console.log('hello there how are you');
    //     resemble('demoassets/People.jpg')
    //       .compareTo('demoassets/People2.jpg')
    //       .onComplete(function(data) {
    //         // console.info('Reached oncomplete for request_success');
    //         expect(data.diffBounds).toEqual(
    //           expect.objectContaining({
    //             bottom: expect.any(Number),
    //             left: expect.any(Number),
    //             top: expect.any(Number),
    //             right: expect.any(Number)
    //           })
    //         );
    //
    //         expect(data.diffBounds.bottom).toEqual(431);
    //         expect(data.diffBounds.left).toEqual(22);
    //         expect(data.diffBounds.right).toEqual(450);
    //         expect(data.diffBounds.top).toEqual(58);
    //         expect(data.dimensionDifference.height).toEqual(0);
    //         expect(data.dimensionDifference.width).toEqual(0);
    //         expect(data.isSameDimensions).toBe(true);
    //         expect(data.misMatchPercentage).toEqual('8.66');
    //         resolve();
    //       });
    //   });
    // });

    test("file not found", () =>
        new Promise(resolve => {
            resemble("../demoassets/People.jpg")
                .compareTo("../demoassets/404-image.jpg")
                .onComplete(data => {
                    // console.info('Reached oncomplete for request404');
                    // console.log(data);
                    expect(data.error).toEqual(
                        "Error: error while reading from input stream"
                    );
                    resolve();
                });
        }));

    test("node buffers jpg", () => {
        const people = fs.readFileSync("./demoassets/People.jpg");
        const people2 = fs.readFileSync("./demoassets/People2.jpg");

        return new Promise(resolve => {
            resemble(people)
                .compareTo(people2)
                .onComplete(data => {
                    // console.info('Reached oncomplete for base64String');
                    expect(data.diffBounds.bottom).toEqual(431);
                    expect(data.diffBounds.left).toEqual(22);
                    expect(data.diffBounds.right).toEqual(450);
                    expect(data.diffBounds.top).toEqual(58);
                    expect(data.dimensionDifference.height).toEqual(0);
                    expect(data.dimensionDifference.width).toEqual(0);
                    expect(data.isSameDimensions).toBe(true);
                    expect(data.misMatchPercentage).toEqual("8.66");
                    resolve();
                });
        });
    });

    test("node buffers png", () => {
        const people = fs.readFileSync("./demoassets/ghost1.png");
        const people2 = fs.readFileSync("./demoassets/ghost2.png");

        return new Promise(resolve => {
            resemble(people)
                .compareTo(people2)
                .onComplete(data => {
                    // console.info('Reached oncomplete for base64String');
                    expect(data.diffBounds.bottom).toEqual(138);
                    expect(data.diffBounds.left).toEqual(90);
                    expect(data.diffBounds.right).toEqual(157);
                    expect(data.diffBounds.top).toEqual(107);
                    expect(data.dimensionDifference.height).toEqual(0);
                    expect(data.dimensionDifference.width).toEqual(0);
                    expect(data.isSameDimensions).toBe(true);
                    expect(data.misMatchPercentage).toEqual("0.27");
                    resolve();
                });
        });
    });

    test("test partial diff with bounding box", () => {
        const people = fs.readFileSync("./demoassets/ghost1.png");
        const people2 = fs.readFileSync("./demoassets/ghost2.png");

        return new Promise(resolve => {
            resemble.outputSettings({
                boundingBox: {
                    left: 80,
                    top: 80,
                    right: 130,
                    bottom: 130
                }
            });

            resemble(people)
                .compareTo(people2)
                .onComplete(data => {
                    expect(data.misMatchPercentage).toEqual("0.04");
                    resolve();
                });
        });
    });
});
