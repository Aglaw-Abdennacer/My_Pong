var i = 0;
const http = require('http').createServer(	(request, response) => new RequestController(request, response).handleRequest());
const io = require('socket.io')(http , {
	cors : {origin : "*"}
});

const connections = [null , null] ;

io.on('connection' , socket => {

	// find available player number
	let playerIndex = -1 ; 
	for (const i in connections){
		if (connections[i] == null){
			connections[i] = i ; 
			playerIndex = i;
			console.log(connections);
			break
		}
	}
	// tell the connecting player their number 
	socket.emit('player-number' , playerIndex);

	console.log("player " + playerIndex + " has connected")

	// ignore player 3 
	if (playerIndex == -1) return


	// check enemy is ready 
	//let c = [] ; 
	//if (connections[1] == null) {
	//	c = [] ; 
    //}
	console.log(connections)

	let c = false;
	socket.emit('check-player' , connections); 
	if(connections[1] !== null ){
		c = true ; }
	socket.emit('change' , c)
	console.log(c);
	

	
	
});

http.listen(3000 , () => console.log('listening on 3000'));
