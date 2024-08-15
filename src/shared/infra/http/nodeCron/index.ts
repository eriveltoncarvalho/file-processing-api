import cron from 'node-cron';
import axios from 'axios';

cron.schedule('* * * * *', async() => {
  console.log('running a task every minute');
  console.log('running: http://localhost:3333/billing');
  await axios.post(`http://localhost:3333/billing`);
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

cron.schedule('* * * * *', async() => {
  console.log('running a task every minute');
  console.log('running: http://localhost:3333/billing/send/email');
  await axios.post(`http://localhost:3333/billing/send/email`);
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});

