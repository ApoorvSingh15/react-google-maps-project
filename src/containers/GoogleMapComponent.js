import React from 'react';
import {
    withGoogleMap,
    GoogleMap,
    Marker,
    DirectionsRenderer
} from "react-google-maps";

class GoogleMapComponent extends React.Component{
    constructor( props ){
        super( props );
        this.state = {
            origin : '',
            destination : '',
            travelMode : '',
            directions : ''
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps.markA.lat, nextProps.markB|| {}, "qw3rrwwe")
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
            origin: new google.maps.LatLng(nextProps.markA.lat, nextProps.markA.lng),
            destination: new google.maps.LatLng(41.8525800, -87.6514100),
            travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                    directions: result,
                });
            } else {
                console.error(`error fetching directions ${result}`);
            }
        });
    }

    render(){
        console.log( this.state.directions, "googleMapComponent")
        return(
                <GoogleMap
                    /*  ref={props.onMapLoad} */
                    defaultZoom={3}
                    defaultCenter={{ lat : 41.8507300, lng : - 87.6512600}} 
              
                >
                    {/* { markers.map( (marker, index) =>(                    
                        <Marker {...marker} key={index} />
                            )
                        )
                    } */}

                {this.state.directions && <DirectionsRenderer directions={this.state.directions} />}
                </GoogleMap>
           
        );
    }
}

export default withGoogleMap(GoogleMapComponent);