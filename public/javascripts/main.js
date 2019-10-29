$(() => {
    // Run with web worker
    const worker1 = new Worker('/scripts/main-worker.js'),
        worker2 = new Worker('/scripts/main-worker.js'),
        promise_fn1 = new Promise((resolve, reject) => {
            resolve(0);
        }),
        promise_fn2 = new Promise((resolve, reject) => {
            resolve(0);
        })
    document.getElementById('start').addEventListener('click', () => {
        var beginTime;
        beginTime = +new Date();
        console.log(`setTimeout1: ${beginTime}`);
        //-- timeout
        setTimeout(() => {
            for (var i = 0; i < 1000; i++) {
                for (var j = 0; j < 1000; j++) {
                    for (var k = 0; k < 1000; k++) {
                    }
                }
                if (i == 999) {
                    var endTime = +new Date();
                    console.log("setTimeout1 時間共花費" + (endTime - beginTime) + "ms");
                }
            }
        }, 0);
        console.log(`setTimeout2: ${beginTime}`);
        setTimeout(() => {
            for (var i = 0; i < 1000; i++) {
                for (var j = 0; j < 1000; j++) {
                    for (var k = 0; k < 1000; k++) {
                    }
                }
                if (i == 999) {
                    var endTime = +new Date();
                    console.log("setTimeout2 時間共花費" + (endTime - beginTime) + "ms");
                }
            }
        }, 0);
        //-- promise
        beginTime = +new Date();
        console.log(`promise_fn1: ${beginTime}`);
        promise_fn1.then(() => {
            for (var i = 0; i < 1000; i++) {
                for (var j = 0; j < 1000; j++) {
                    for (var k = 0; k < 1000; k++) {
                    }
                }
                if (i == 999) {
                    var endTime = +new Date();
                    console.log("promise_fn1 時間共花費" + (endTime - beginTime) + "ms");
                }
            }
        })
        console.log(`promise_fn2: ${beginTime}`);
        promise_fn2.then(() => {
            for (var i = 0; i < 1000; i++) {
                for (var j = 0; j < 1000; j++) {
                    for (var k = 0; k < 1000; k++) {
                    }
                }
                if (i == 999) {
                    var endTime = +new Date();
                    console.log("promise_fn2 時間共花費" + (endTime - beginTime) + "ms");
                }
            }
        })
        //-- webworker
        beginTime = +new Date();
        console.log(`worker1: ${beginTime}`);
        worker1.postMessage({ time: beginTime, name: 1 })
        console.log(`worker2: ${beginTime}`);
        worker2.postMessage({ time: beginTime, name: 2 })
        //----
    });
    //----
    //-- close worker
    document.getElementById('close1').addEventListener('click', () => {
        worker1.terminate();
        worker2.terminate();
    });
    //----
    worker1.onmessage = e => {
        console.log(`Worker1 says: "${e.data}"`);
    };
    worker2.onmessage = e => {
        console.log(`Worker2 says: "${e.data}"`);
    };
})
