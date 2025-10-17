export function errorHandler(err,_req,res,_next){
  res.status(err.status || 400).json({
    error: err.message || "Error",
    details: err.details
  });
}
