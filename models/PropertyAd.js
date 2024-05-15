const propertyArray = [
  { id: 1, name: 'Property 1', description: '1 kanal corner plot', price: 2, address: '121 P block Model Town, Lahore', formedBy: 'ram123@gmail.com' },
  { id: 2, name: 'Property 2', description: '2 kanal farmhouse', price: 5, address: 'Main Boulevard, DHA, Karachi', formedBy: 'ram123@gmail.com' },
  { id: 3, name: 'Property 3', description: 'Apartment with a view', price: 8, address: '13-C Gulberg, Islamabad', formedBy: 'abd123@gmail.com' },
  { id: 4, name: 'Property 4', description: 'Luxury villa with pool', price: 3, address: 'Phase 6, Bahria Town, Rawalpindi', formedBy: 'abd123@gmail.com' }
];

const mongoose = require('mongoose');

// Define the property schema
const propertySchema = new mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  price: Number,
  address: String,
  formedBy: String
});

// Create the Property model
const Property = mongoose.model('Property', propertySchema);

export default  {
  propertyArray: propertyArray,
  getProperties: () => propertyArray,
  getPropertyById: (id) => propertyArray.find(property => property.id === id),
  getPropertiesByEmail: (email) => propertyArray.filter(property => property.formedBy !== email),
  addProperty: (newProperty) => {
    propertyArray.push(newProperty);
  },
  Property
};

