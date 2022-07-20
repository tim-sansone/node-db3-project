const Scheme = require('./scheme-model')

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async (req, res, next) => {
  const { scheme_id } = req.params;
  const scheme = await Scheme.findById(scheme_id)
  if(!scheme){
    next({status: 404, message: `scheme with scheme_id ${scheme_id} not found`})
    return;
  }
  next();
}

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  
  if(typeof scheme_name !== 'string' || scheme_name.trim() === '' || !scheme_name){
    next({status: 400, message: 'invalid scheme_name'}) 
    return
  }
  next()
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {
  const { instructions, step_number } = req.body
  if(typeof instructions !== 'string' || instructions.trim() === '' || !instructions){
    next({status: 400, message: 'invalid step'})
    return
  }
  if(typeof step_number !== 'number' || step_number < 1 || !step_number){
    next({status: 400, message: 'invalid step'})
    return
  }
  next()
}

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
}
