const mongoose = require('mongoose');

// Login Schema
const LoginSchema = new mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  username: String,
  email: String,
  password: String
});
const flowerSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  color: { type: String, required: true },
  season: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String }
});
const eventSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, default: new mongoose.Types.ObjectId() },
  name: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String },
  description: { type: String, required: true },
  location: { type: String, required: true },
  organizer: { type: String, required: true },
  participants: { type: Number, required: true },
  category: { type: String, required: true },
  budget: { type: Number, required: true },
  status: { type: String, enum: ['planned', 'ongoing', 'completed'], default: 'planned' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
const budgetSchema = new mongoose.Schema({
  eventName: {
    type: String,
    ref: 'Event',
    required: true
  },
  totalBudget: {
    type: Number,
    required: true
  },
  allocatedFunds: {
    flowers: { type: Number, default: 0 },
    venue: { type: Number, default: 0 },
    catering: { type: Number, default: 0 },
    entertainment: { type: Number, default: 0 },
    // Add more categories as needed
  },
  remainingBudget: {
    type: Number,
    default: function() {
      return this.totalBudget - this.totalExpenses();
    }
  },
  expenses: [{
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, default: Date.now }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

budgetSchema.methods.totalExpenses = function() {
  return this.expenses.reduce((total, expense) => total + expense.amount, 0);
};

const vendorSchema = new mongoose.Schema({
  
  image: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  services: [String],
  rating: { type: Number, min: 0, max: 5 },
  location: String,
  availability: [Date],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


const scheduleSchema = new mongoose.Schema({
  event: { type: String, required: true }, // Reference Event by name
  title: { type: String, required: true },
  description: String,
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Schedule = mongoose.model('Schedule', scheduleSchema);
const Budget = mongoose.model('Budget', budgetSchema);
const LoginTableModel = mongoose.model("logintables", LoginSchema);
const FlowerModel= mongoose.model("flowers", flowerSchema);
const Event = mongoose.model('Event', eventSchema);
const Vendor = mongoose.model('Vendor', vendorSchema);
module.exports = { LoginTableModel,FlowerModel,Event,Budget,Vendor,Schedule };
