const axios = require('axios');
const { listIndexes } = require('../models/user.model');
const captainModel = require('../models/captain.model');


module.exports.getAddressCoordinate = async (address) => {
	if (!address || typeof address !== 'string') {
		throw new Error('Address must be a non-empty string');
	}
	const url = `https://nominatim.openstreetmap.org/search`;
	try {
		const response = await axios.get(url, {
			params: {
				q: address,
				format: 'json',
				limit: 1
			},
			headers: {
				'User-Agent': 'UberClone/1.0 (your@email.com)'
			}
		});
		const data = response.data;
		if (Array.isArray(data) && data.length > 0) {
			return {
				lat: parseFloat(data[0].lat),
				lng: parseFloat(data[0].lon)
			};
		} else {
			throw new Error('No coordinates found for the given address');
		}
	} catch (error) {
		throw new Error('Failed to fetch coordinates: ' + error.message);
	}
};

function haversine(lat1, lon1, lat2, lon2) {
	const R = 6371; // Earth radius in km
	const dLat = (lat2 - lat1) * Math.PI / 180;
	const dLon = (lon2 - lon1) * Math.PI / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
		Math.sin(dLon / 2) * Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c; // distance in km
}

module.exports.getDistanceTime = async (origin, destination) => {
	if (!origin || !destination) {
		throw new Error('Origin and destination are required');
	}

	// Geocode origin
	const originCoord = await module.exports.getAddressCoordinate(origin);
	// Geocode destination
	const destCoord = await module.exports.getAddressCoordinate(destination);

	if (!originCoord || !destCoord) {
		throw new Error('Could not geocode one or both addresses');
	}

	const { lat: lat1, lng: lon1 } = originCoord;
	const { lat: lat2, lng: lon2 } = destCoord;

	// Calculate distance
	const distance = haversine(lat1, lon1, lat2, lon2); // in km

	// Estimate time (assuming avg speed 40 km/h)
	const avgSpeed = 40; // km/h
	const timeHours = distance / avgSpeed;
	const timeMinutes = Math.round(timeHours * 60);

	return {
		distance: distance.toFixed(2) + ' km',
		duration: timeMinutes + ' mins',
		distanceValue: distance,
		durationValue: timeMinutes,
		origin: originCoord,
		destination: destCoord
	};
}

module.exports.getAutoCompleteSuggestions = async(input)=>{
	if(!input){
		throw new Error('Input is required');
	}

	const url = `https://nominatim.openstreetmap.org/search`;

	try{
		const response = await axios.get(url, {
			params: {
				format: 'json',
				q: input,
				addressdetails: 1,
				limit: 5
			},
			headers: {
				'User-Agent': 'UberClone/1.0 (your@email.com)'
			}
		});
		// Nominatim returns an array of results
		return response.data;
	}catch(err){
		console.error(err);
		throw err;
	}

}

module.exports.getCaptainInTheRadius = async(lat,lng,radiusInKm)=>{
	//radius in km
	const captain = await captainModel.find({
		location:{
			$geoWithin:{
				$centerSphere:[[lat,lng],radiusInKm/6371]
			}
		}
	})
	return captain;
}