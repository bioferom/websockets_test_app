document.addEventListener('DOMContentLoaded', function(){
    let socketConfig = {}

    document.getElementById('wsstart').addEventListener('click', startSocket)
    document.getElementById('wsstop').addEventListener('click', stopSocket)

    document.getElementById('tafild').addEventListener ('input', textAreaLogic)
    document.getElementById('tafild').value='{"jsonrpc": "1.0", "id":1, "method": "signup", "params": ["my_login", "q1w2e3", "my_name@gmail.com", "client"]}'

    function startSocket() {
        const socketPath = document.getElementById('wsurl').value
        console.log ('socket path', socketPath)
        socketConfig.path = socketPath
        document.getElementById('wsPathInfo__span').innerHTML = socketPath
        document.getElementById('stopSignal').innerHTML = 'no'


        const socket = new WebSocket(socketConfig.path);
        console.log(socket)
        document.getElementById('wssend').addEventListener('click', function() {
            socket.send(socketConfig.textAreaVal)
        })
        document.getElementById('wsClose').addEventListener('click', function(){
            socket.close()
        })
        socket.onopen = function (e) {
            console.log('connection established', e)
            document.getElementById('textareaResponse').value = 'connection established' + e
        };
        socket.onclose = function (e, code, reason, wasClean) {
            console.log('closed', e, code, reason, wasClean);
            document.getElementById('textareaResponse').value = 'closed' + e + code + reason + wasClean
        };
        socket.onerror = function (e) {
            console.log('error', e)
        };
        socket.onmessage = function (e) {
            // console.clear();
            console.log('RESONSE SOCKET Event', e)
            document.getElementById('textareaResponse').value = e.data
                        if (document.getElementById('stopSignal').innerHTML === 'yes') {
            socket.close()
            }

        };




    }

    function stopSocket () {
        document.getElementById('stopSignal').innerHTML = 'yes'
    }

    function textAreaLogic (e) {
        socketConfig.textAreaVal = e.target.value
        // socketConfig.textAreaLength = e.target.value.length
        document.getElementById('taSymbolsCount').innerHTML = e.target.value.length
    }





});

