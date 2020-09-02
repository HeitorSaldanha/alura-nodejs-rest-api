const customExpress = require('./config/custom-express');
const app = customExpress();
app.listen(3000, () => console.log('Hello World 3000'));