const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 8090;

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Sample data
let initialRecipe = [
    {
        name: 'Spaghetti Carbonara',
        description: 'A classic Italian pasta dish.',
        preparationTime: '15 minutes',
        cookingTime: '15 minutes',
        imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/carbonara-index-6476367f40c39.jpg?crop=0.888888888888889xw:1xh;center,top&resize=1200:*',
        country: 'Italy',
        veg: false,
        id: 1
    }
];

// Middleware to check for missing fields
const checkFields = (req, res, next) => {
    const { name, description, preparationTime, cookingTime, imageUrl, country, veg } = req.body;
    if (!name || !description || !preparationTime || !cookingTime || !imageUrl || !country || veg === undefined) {
        return res.status(400).send('All fields are required.'); // Send as plain string
    }
    next();
};

// Routes
app.get('/', (req, res) => {
    res.send('welcome to the recipe api.'); // Ensure correct response
});

app.get('/recipe/all', (req, res) => {
    res.json(initialRecipe);
});

app.get('/index', (req, res) => {
    res.render('index', { recipes: initialRecipe });
});

app.get('/add', (req, res) => {
    res.render('recipe');
});

app.post('/recipe/add', checkFields, (req, res) => {
    const newRecipe = { ...req.body, id:Date.now() };
    initialRecipe.push(newRecipe);
    res.json(initialRecipe); // Return updated list of recipes
});

app.patch('/recipe/update/:id', (req, res) => {
    const recipeIndex = initialRecipe.findIndex(recipe => recipe.id === parseInt(req.params.id));
    if (recipeIndex !== -1) {
        initialRecipe[recipeIndex] = { ...initialRecipe[recipeIndex], ...req.body };
        return res.json(initialRecipe);
    }
    res.status(404).json({ message: 'Recipe not found' });
});

app.delete('/recipe/delete/:id', (req, res) => {
    const { id } = req.params;
    initialRecipe = initialRecipe.filter(recipe => recipe.id !== parseInt(id));
    res.json(initialRecipe);
});

// Filter and sort routes
app.get('/recipe/filter', (req, res) => {
    const { veg, sort, country } = req.query;
    let filteredRecipes = [...initialRecipe];

    if (veg !== undefined) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.veg === (veg === 'true'));
    }

    if (country) {
        filteredRecipes = filteredRecipes.filter(recipe => recipe.country.toLowerCase() === country.toLowerCase());
    }

    if (sort === 'lth') {
        filteredRecipes.sort((a, b) => a.cookingTime.localeCompare(b.cookingTime));
    } else if (sort === 'htl') {
        filteredRecipes.sort((a, b) => b.cookingTime.localeCompare(a.cookingTime));
    }

    res.json(filteredRecipes);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});