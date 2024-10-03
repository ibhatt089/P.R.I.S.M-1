import app from './app';
import { connectDatabase } from './database';

const PORT = process.env.PORT || 3000;


connectDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Swagger docs are available at http://localhost:${PORT}/api-docs`);
  });
});
