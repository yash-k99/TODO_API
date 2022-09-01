const notFound = (req,res) => res.status(404).send("404 Error Not Found");
module.exports = notFound;