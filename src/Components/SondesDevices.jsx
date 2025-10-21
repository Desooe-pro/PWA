import * as React from 'react';

export const SondesDevices = ({devices}) => {
    console.log(devices)
    return (
        <div>
            <h1>Devices</h1>
            {devices.map((device) => (
                <div style={{borderRadius: '30px', backgroundColor: '#213547'}}>
                    {device}
                </div>
            ))}
        </div>
    );
};