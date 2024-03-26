const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));

// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/notes.html'))
// });

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

app.listen (PORT, function(){
    console.log(`Listening on port ${PORT}`);
});