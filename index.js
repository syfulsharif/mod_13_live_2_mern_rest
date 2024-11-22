const app = require('./app');

app.listen(5080, () => {
    console.log(`App listening on ${process.env.PORT || 5080}`);
});
