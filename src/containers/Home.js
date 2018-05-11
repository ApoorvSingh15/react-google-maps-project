import React, { Component } from 'react';
import GoogleMapComponent from './GoogleMapComponent'; 
import Autocomplete from 'react-google-autocomplete';

export default class Home extends Component{
	constructor( props ){
		super( props );
		this.state = {
			markers : [{
				position : {
					lat : 12.2347983487,
					lng : 56.9842374232
				}
			}],
			placeA : {},
			placeB : {},
		}
	}
	render(){
		const { placeA , placeB } = this.state;
		console.log(placeA, placeB, "output");
		
		return(
			<div>
				<div style={{ display : 'flex', justifyContent : 'center', marginTop : '2%'}}>
					<Autocomplete
						style={{ width: '90%' }}
						onPlaceSelected={(placeA) => {
							this.setState({ placeA: { lat: placeA.geometry.location.lat(), lng: placeA.geometry.location.lng()} })
						}}
						types={['(regions)']}
						componentRestrictions={{ country: "usa" }}
					/>
					<Autocomplete
						style={{ width: '90%' }}
						onPlaceSelected={(placeB) => {
							this.setState({ placeB: { lat: placeB.geometry.location.lat(), lng: placeB.geometry.location.lng()}})
						}}
						types={['(regions)']}
						componentRestrictions={{ country: "usa" }}
					/>
				</div>
				<div style={{ marginTop : '2%'}}>
					<GoogleMapComponent
						markers={this.state.markers}
						googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBB6Aiqd4K6CHy9PfArmgi2jilvKwUtB1I&libraries=places"
						containerElement={<div style={{width : '100%' ,height : '100%'}} />}
						mapElement={<div style={{ height : '500px' }} />}
						markA = {placeA}
						markB = {placeB}
					/>
				</div>	
			</div>	
		);
	}

}




















