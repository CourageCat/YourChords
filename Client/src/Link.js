import { BrowserRouter, Route } from "react-router-dom";
import ListBeat from "./Pages/ListBeat";
import React from "react";

function Link () {
    return ( 
        <div>
            <BrowserRouter>
            <ListBeat></ListBeat>
            <div>
              <Route path="/" exact>
                <ListBeat></ListBeat>
              </Route>
              <Route path="/" exact>
                <ViewChords></ViewChords>
              </Route>
            </div>
            </BrowserRouter>
          </div>
     );
}

export default Link ;