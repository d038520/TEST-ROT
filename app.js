const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Facebook Messenger API Webhook验证
app.get('/webhook', (req, res) => {
    if (req.query['hub.verify_token'] === 'EAACH2AKEh94BOxoCmNjOGUwBBo14dZBhmjJR72076H2y4dqfi5kuFhPuTvx9kZAfI7WpI5TZBo7Cyw6UPZCsEw86Y7mFvOEvvAZCqnHyoamrOhl8StkEZBGYsoZBe4rKtz7ZAEhMyC32z0T8uZB8MIJfskVzx9jVXbuhgsf5EFnrMLJRacXHUT0g11XpVSw355jLq') {
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.sendStatus(403);
    }
});

// 处理Facebook Messenger API的消息
app.post('/webhook', (req, res) => {
    const data = req.body;

    if (data.object === 'page') {
        data.entry.forEach(entry => {
            const webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

            const senderId = webhookEvent.sender.id;

            if (webhookEvent.message) {
                const text = webhookEvent.message.text;

                // 在這裡處理收到的訊息，可以回覆相應的內容
                sendTextMessage(senderId, text);
            }
        });

        res.sendStatus(200);
    }
});

// 向用戶發送文本消息
function sendTextMessage(senderId, text) {
    const messageData = {
        recipient: {
            id: senderId
        },
        message: {
            text: text
        }
    };

    request({
        uri: 'https://graph.facebook.com/v13.0/me/messages',
        qs: { access_token: 'EAACH2AKEh94BOxoCmNjOGUwBBo14dZBhmjJR72076H2y4dqfi5kuFhPuTvx9kZAfI7WpI5TZBo7Cyw6UPZCsEw86Y7mFvOEvvAZCqnHyoamrOhl8StkEZBGYsoZBe4rKtz7ZAEhMyC32z0T8uZB8MIJfskVzx9jVXbuhgsf5EFnrMLJRacXHUT0g11XpVSw355jLq' },
        method: 'POST',
        json: messageData
    }, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            console.log('Message sent successfully');
        } else {
            console.error('Unable to send message:', error);
        }
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
