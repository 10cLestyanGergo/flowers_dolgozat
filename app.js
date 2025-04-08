import express from "express";

const app = express();
app.use(express.json());

const flowers = [
    {name: "Hunyor", species: "Helleborus", price: 2890, isAvailable: true},
    {name: "Hóvirág", species: "Galanthus", price: 3990, isAvailable: false},
    {name: "Sáfrány", species: "Crocus", price: 2990, isAvailable: true}
];

app.get('/flowers', (req, res) => {
    res.status(200).json(flowers);
});

app.get('/flowers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= flowers.length) {
        return res.status(404).json({ message: 'Flower not found' });
    };
    res.status(200).json(flowers[id]);
});

app.post('/flowers', (req, res) => {
    const { name, species, price, isAvailable } = req.body;
    if (!name || !species || !price || isAvailable === null) {
        return res.status(400).json({ message: 'Missing some data!' });
    };
    const newFlower = { name, species, price, isAvailable };
    flowers.push(newFlower);
    res.status(201).json(newFlower);
});

app.put('/flowers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= flowers.length) {
        return res.status(404).json({ message: 'Flower not found!' });
    };
    const { name, species, price, isAvailable } = req.body;
    if (!name || !species || !price || isAvailable === null) {
        return res.status(400).json({ message: 'Missing some data!' });
    };
    flowers[id] = { name, species, price, isAvailable };
    res.status(200).json(flowers[id]);
});

app.delete('/flowers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (id < 0 || id >= flowers.length) {
        return res.status(404).json({ message: 'Flower not found!' });
    };
    flowers.splice(id, 1);
    res.status(200).json({ message: 'Delete successful!' });
});

app.listen(3030, () => {
    console.log('Server runs on port 3030');
});
