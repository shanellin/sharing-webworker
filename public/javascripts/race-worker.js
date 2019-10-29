onmessage = function (e) {
    if (e.data !== '') {
        while (e.data.origin < 100) {
            let temp = e.data.delay;
            temp >= 50 ? temp = Math.floor(Math.random() * e.data.delay) : null;
            for (var i = 0; i < 1000; i++) {
                for (var j = 0; j < 1000; j++) {
                    for (var k = 0; k < temp; k++) {
                    }
                }
                if (i == 999) {
                    e.data.origin = e.data.origin + e.data.add;
                    postMessage(e.data.origin);
                    console.log(`webworker_${e.data.name}`);
                }
            }
        }
    }
}
