$(() => {
    //-- init
    const worker1 = new Worker('/scripts/race-worker.js'),
        worker2 = new Worker('/scripts/race-worker.js'),
        promise_fn1 = new Promise((resolve, reject) => {
            resolve(0);
        }),
        promise_fn2 = new Promise((resolve, reject) => {
            resolve(0);
        }),
        final_winner = (count, animal) => {
            document.getElementById(animal).style.marginLeft = `${count}%`;
            (count >= 100 && document.getElementById('winner').textContent == '') ? document.getElementById('winner').textContent = `${animal} wins` : null;
        },
        reset_game = () => {
            document.getElementById('winner').textContent = '';
            count1 = 0;
            count2 = 0;
            document.getElementById("turtle").style.marginLeft = `${count1}%`;
            document.getElementById("rabbit").style.marginLeft = `${count2}%`;
        }
    let count1 = 0, count2 = 0;
    //----
    //-- promise
    document.getElementById('Without_worker').addEventListener('click', () => {
        promise_fn1.then(() => {
            while (count1 < 100) {
                for (var i = 0; i < 1000; i++) {
                    for (var j = 0; j < 1000; j++) {
                        for (var k = 0; k < 50; k++) {
                        }
                    }
                    if (i == 999) {
                        count1 = count1 + 2;
                        final_winner(count1, 'turtle');
                        console.log("async_1");
                    }
                }
            }
        })
        promise_fn2.then(() => {
            while (count2 < 100) {
                let temp = Math.floor(Math.random() * 150);
                for (var i = 0; i < 1000; i++) {
                    for (var j = 0; j < 1000; j++) {
                        for (var k = 0; k < temp; k++) {
                        }
                    }
                    if (i == 999) {
                        count2 = count2 + 5;
                        final_winner(count2, 'rabbit');
                        console.log("async_2");
                    }
                }
            }
        })
    });
    //-- webworker
    document.getElementById('With_worker').addEventListener('click', () => {
        worker1.postMessage({animal: 'turtle', name: 1, origin: 0, add: 2, delay: 50})
        worker2.postMessage({animal: 'rabbit', name: 2, origin: 0, add: 5, delay: 150})
    });
    //----
    //-- reset game
    document.getElementById('reset_game').addEventListener('click', () => {
        reset_game();
    });
    //----
    //-- close worker
    document.getElementById('close2').addEventListener('click', () => {
        worker1.terminate();
        worker2.terminate();
    });
    //----
    //-- DOM
    worker1.onmessage = e => {
        final_winner(e.data, 'turtle');
    };
    worker2.onmessage = e => {
        final_winner(e.data, 'rabbit');
    };
})
