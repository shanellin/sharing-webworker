onmessage = function (e) {
    if (e.data !== '') {
        for (var i = 0; i < 1000; i++) {
            for (var j = 0; j < 1000; j++) {
                for (var k = 0; k < 1000; k++) {
                }
            }
            if (i == 999) {
                var endTime = +new Date();
                console.log(`webworker_${e.data.name} 時間共花費${endTime - e.data.time}ms`);
            }
        }
    }
}
