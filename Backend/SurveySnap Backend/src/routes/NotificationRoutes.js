const routes = require('express').Router();
const notificationController = require('../controllers/NotificationController');

routes.post('/send', notificationController.sendNotification);
routes.get('/user/:userId', notificationController.getUserNotifications);

module.exports = routes;
