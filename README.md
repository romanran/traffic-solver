
# Traffic Solver
AI based 2D traffic solver
The goal is to move all entities from start to destination without collisions

## How to run
 ` npm start`
 nodemon watches the */server* and */solver* directories for changes and restarts the server


## Project structure
- front_src 
    html + js with socket and canvas drawing, is built to server/html by webpack
	send a **ready** event by socket to the server on *requestAnimationFrame*
	it only represents what is going on inside the solver
- server
  express server based on http server with socket, socket imports `/solver/main` and emits events back to canvas on the **ready**  event with data about what's going on inside the solver
- solver
    whole math takes place here, it can be separated from the project
    */scenarios* holds *.json*`s with starting conditions of a certain problem scenario
    *_example.json* hold all of the properties needed for a new scenario