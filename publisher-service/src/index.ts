import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Receiver service listening on port ${PORT}`);
});
