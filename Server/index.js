const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const { LoginTableModel,FlowerModel,Event,Budget,Vendor,Schedule } = require('./Models/Schema');
const sendgrid = require('@sendgrid/mail');
sendgrid.setApiKey('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');

const app = express();
app.use(express.json());
app.use(cors());

async function connectdb() {
  try {
    await mongoose.connect("mongodb+srv://SwethaAmaravathi:Swetha9865@blossom.ho7wing.mongodb.net/Blossom?retryWrites=true&w=majority&appName=Blossom");
    console.log("db connection success");

    const x = 4000;
    app.listen(x, function () {
      console.log(`starting port ${x}...`);
    });
  } catch (err) {
    console.log("db not connected: " + err);
  }
}
connectdb();

// Add user
app.post('/adduser', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const login = new LoginTableModel({
      username,
      email,
      password
    });
    await login.save();
    res.status(201).json({ message: "user added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/addevent', async (req, res) => {
  try {
    const { name, date, time, description, location, organizer, participants, category, budget, status } = req.body;

    // Parse the date string into a valid Date object
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error('Invalid date format');
    }

    const event = new Event({
      name,
      date: parsedDate,
      time,
      description,
      location,
      organizer,
      participants,
      category,
      budget,
      status
    });

    await event.save();

    res.status(201).json({ message: "Event added successfully", event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: error.message });
  }
});
app.post('/addflower', async (req, res) => {
  try {
    const { name, color, season, price, image, description } = req.body;

    // Create a new flower instance
    const newFlower = new FlowerModel({
      name,
      color,
      season,
      price,
      image,
      description
    });

    // Save the flower to the database
    await newFlower.save();
    res.status(201).json({ message: "Flower added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all users
app.get('/getallflowers', async (req, res) => {
  try {
    const flowers = await FlowerModel.find();
    res.json(flowers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/getallevents', async (req, res) => {
  try {
    const Events = await Event.find();
    res.json(Events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete('/name/:name', async (req, res) => {
  try {
    const eventName = req.params.name;
    const deletedEvent = await Event.findOneAndDelete({ name: eventName });
    if (deletedEvent) {
      res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});
app.put('/events/:name', async (req, res) => {
  const { name } = req.params;
  const updates = req.body;

  try {
    const event = await Event.findOneAndUpdate({ name }, updates, { new: true });
    if (!event) {
      return res.status(404).send('Event not found');
    }
    res.send(event);
  } catch (error) {
    res.status(500).send('Error updating event');
  }
});
app.post('/budgets', async (req, res) => {
  try {
    const { eventName, totalBudget, allocatedFunds, expenses } = req.body;

    // Check if the provided eventName is valid
    const event = await Event.findOne({ name: eventName });
    if (!event) {
      return res.status(404).json({ error: 'Event not found', eventName });
    }

    // Create a new budget document
    const budget = new Budget({
      eventName: event.name, // Assign the name of the Event
      totalBudget,
      allocatedFunds,
      expenses,
      remainingBudget: totalBudget - expenses.reduce((total, expense) => total + expense.amount, 0)
    });

    // Save the budget document
    await budget.save();

    res.status(201).json(budget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.get('/download-csv', (req, res) => {
  const fields = ['eventName', 'totalBudget', 'allocatedFunds', 'expenses'];
  const json2csvParser = new Parser({ fields });
  const csv = json2csvParser.parse(budgets);

  const filePath = path.join(__dirname, 'budgets.csv');
  fs.writeFileSync(filePath, csv);

  res.download(filePath, 'budgets.csv', (err) => {
    if (err) {
      console.error('Error downloading the file:', err);
      res.status(500).send({ error: 'Failed to download CSV file' });
    }
  });
});

app.get('/getallBudgets', async (req, res) => {
  try {
    const Budgets = await Budget.find();
    res.json(Budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.post('/addvendor', async (req, res) => {
  try {
    const { image,name, contact, services, rating, location, availability } = req.body;

    const vendor = new Vendor({
      image,
      name,
      contact,
      services,
      rating,
      location,
      availability,
    });

    await vendor.save();

    res.status(201).json({ message: "Vendor added successfully", vendor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/getallvendors', async (req, res) => {
  try {
    const Vendors = await Vendor.find();
    res.json(Vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.put('/updatevendorbyname/:name', async (req, res) => {
  const { image, name, contact, services, rating, location, availability } = req.body;
  const { name: vendorName } = req.params;

  try {
    const updatedVendor = await Vendor.findOneAndUpdate(
      { name: vendorName },
      {
        image,
        name,
        contact,
        services,
        rating,
        location,
        availability,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ message: 'Vendor updated successfully', vendor: updatedVendor });
  } catch (error) {
    console.error('Error updating vendor:', error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/getvendorbyname/:name', async (req, res) => {
  try {
    const name = req.params.name;
    const vendor = await Vendor.findOne({ name: name });
    
    if (!vendor) {
      return res.status(404).send('Vendor not found');
    }

    res.json(vendor);
  } catch (error) {
    res.status(500).send('Server error');
  }
});
app.delete('/deletevendorbyname/:name', async (req, res) => {
  const { name } = req.params;

  try {
    const deletedVendor = await Vendor.findOneAndDelete({ name });

    if (!deletedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ message: 'Vendor deleted successfully', vendor: deletedVendor });
  } catch (error) {
    console.error('Error deleting vendor:', error);
    res.status(500).json({ message: error.message });
  }
});
app.post('/schedules', async (req, res) => {
  const { event: eventName, title, description, startDate, endDate } = req.body;

  try {
    // Find the Event by its name
    const event = await Event.findOne({ name: eventName });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const newSchedule = new Schedule({
      event: event.name,
      title,
      description,
      startDate,
      endDate
    });

    await newSchedule.save();

    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.get('/getallschedules', async (req, res) => {
  try {
    const Schedules = await Schedule.find();
    res.json(Schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.delete('/api/schedule/:name', async (req, res) => {
  const scheduleName = req.params.name;

  try {
    const deletedSchedule = await Schedule.findOneAndDelete({ title: scheduleName });

    if (!deletedSchedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json({ message: 'Schedule deleted successfully' });
  } catch (error) {
    console.error('Error deleting schedule:', error);
    res.status(500).json({ message: 'Error deleting schedule' });
  }
});
app.put('/api/schedule/:name', async (req, res) => {
  const scheduleName = req.params.name;
  const { title, description, startDate, endDate } = req.body;

  try {
    let schedule = await Schedule.findOne({ title: scheduleName });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    // Update schedule fields
    schedule.title = title;
    schedule.description = description;
    schedule.startDate = startDate;
    schedule.endDate = endDate;
    schedule.updatedAt = Date.now();

    // Save updated schedule
    await schedule.save();

    res.status(200).json({ message: 'Schedule updated successfully', schedule });
  } catch (error) {
    console.error('Error updating schedule:', error);
    res.status(500).json({ message: 'Error updating schedule' });
  }
});
app.post('/send-email', async (req, res) => {
  const { email, cartItems, totalPrice } = req.body;

  const emailContent = `
    <h3>Thank you for your order!</h3>
    <div>
      ${cartItems.map(item => `
        <div>
          <img src="${item.image}" alt="${item.name}" />
          <div>
            <h3>${item.name}</h3>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: $${item.price}</p>
          </div>
        </div>
      `).join('')}
    </div>
    <h3>Total Price: $${totalPrice}</h3>
  `;

  const msg = {
    to: email,
    from: 'blossombash9524@gmail.com',
    subject: 'Order Confirmation',
    html: emailContent,
  };

  try {
    await sendgrid.send(msg);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    res.status(500).send('Error sending email');
  }
});
