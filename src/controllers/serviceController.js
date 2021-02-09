
const insertService = (req, res) => {
   res.json({message: "A new service have been inserting"});    
}

const getServices = (req, res) => {
    res.json({message: "View all services"});    
 }

 const getServiceById = (req, res) => {
    res.json({message: "View new service by id"});    
 }

 const deleteServiceByID = (req, res) => {
    res.json({message: "delete a service by id"});    
 }

 const updateServiceById = (req, res) => {
    res.json({message: "update a service by id"});    
 }

module.exports = {insertService, getServices, getServiceById, deleteServiceByID, updateServiceById};