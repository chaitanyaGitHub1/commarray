// const agenda = require('./agenda');
// const { ProductService } = require('../api/services/product.service');
// const { logger } = require('../api/logger/logger.service');
//
// class CronJobs {
//   init() {
//     agenda.define('makeProductsExpired', async (job, done) => {
//       await ProductService.makeProductsExpired();
//       done();
//     });
//
//     agenda.define('deleteProducts', async (job, done) => {
//       await ProductService.deleteProducts();
//       done();
//     });
//
//     agenda.on('ready', () => {
//       (async () => {
//         await agenda.start();
//         logger.info('CronJobs::Agenda Started');
//         await agenda.every('every minute', 'makeProductsExpired');
//         await agenda.every('24 hours', 'deleteProducts');
//       })();
//     });
//   }
// }
//
// const graceful = () => {
//   agenda.stop(() => process.exit(0));
// };
//
// process.on('SIGTERM', graceful);
// process.on('SIGINT', graceful);
//
// module.exports.cronJobs = new CronJobs();
