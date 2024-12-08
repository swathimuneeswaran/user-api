import express from "express"
const app = express();
const port = 3000;


app.use(express.json()); 

let users = [];


app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  const { name, gender, dob, city, state, pincode } = req.body;

  if (!name || !gender || !dob || !city || !state || !pincode) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const newUser = {
    id: users.length + 1,
    name,
    createdOn: new Date().toISOString().split('T')[0],
    gender,
    dob,
    city,
    state,
    pincode,
    modifiedOn: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  res.status(201).json(newUser);
});


app.put('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, gender, dob, city, state, pincode } = req.body;

  if (name) user.name = name;
  if (gender) user.gender = gender;
  if (dob) user.dob = dob;
  if (city) user.city = city;
  if (state) user.state = state;
  if (pincode) user.pincode = pincode;

  user.modifiedOn = new Date().toISOString().split('T')[0];
  res.json(user);
});

app.delete('/users/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userIndex = users.findIndex(u => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`User API Server is running on http://localhost:${port}`);
});
