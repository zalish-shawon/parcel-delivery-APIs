import app from './app';
import { connectDB } from './database';
import { config } from './config';

connectDB().then(() => {
  app.listen(config.port, () => {
    console.log(`Server running on port ${config.port}`);
  });
});