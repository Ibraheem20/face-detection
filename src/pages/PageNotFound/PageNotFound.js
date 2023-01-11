import React from "react";
import { useRouteError } from "react-router-dom";

function PageNotFound(){
    const error=useRouteError();
    return(
        <div className="route-err">
            {/* {error.status === 404 ? */}
                        <span>
                            Sorry, 404 page not found ...
                        </span>

                        :
                        <span>
                            Sorry, Something went Wrong ...
                        </span>
                    {/* } */}
        </div>
    )
}
export default PageNotFound;