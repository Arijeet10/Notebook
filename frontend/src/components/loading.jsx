import React from 'react';
import loading from "./loading.gif";

function Loading() {
    return (
        <div>
            <img
                src={loading}
                alt="loading"
                style={
                    {
                        width:'200px',
                        margin:'auto',
                        padding:"200px",
                        display:'block'
                    }
                }
            />
        </div>
    )
}

export default Loading;

