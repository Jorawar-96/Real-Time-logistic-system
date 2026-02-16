const mapService = require('../services/maps.service');
const {validationResult} = require('express-validator')

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { address } = req.query;
    if (!address || typeof address !== 'string' || address.trim().length < 3) {
        return res.status(400).json({ message: 'Address is required and must be a valid string.' });
    }
    try {
        const coordinates = await mapService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        if (error.message.includes('No coordinates found')) {
            return res.status(404).json({ message: 'Coordinates not found for the given address.' });
        }
        if (error.message.includes('Address must be a non-empty string')) {
            return res.status(400).json({ message: 'Invalid address.' });
        }
        res.status(500).json({ message: error.message || 'Failed to fetch coordinates.' });
    }
};

module.exports.getDistanceTime = async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const {origin,destination} = req.query;

        const distanceTime = await mapService.getDistanceTime(origin,destination);

        res.status(200).json(distanceTime);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal server error'});
    }
};

module.exports.getAutoCompleteSuggestions = async(req,res,next)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }

        const {input} = req.query;

        const suggestions = await mapService.getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal server again'})
    }
}