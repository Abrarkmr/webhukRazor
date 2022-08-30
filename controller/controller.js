const express = require('express');
const router = express.Router();

router.post('/paymentDetails', (req,res)=>{

    console.log(req.body)
    const secret = '112233';
    const crypto = require('crypto');

    const shasum = crypto.createHmac('sha256', secret)
	shasum.update(JSON.stringify(req.body))
	const digest = shasum.digest('hex')

	console.log("----> "+digest, req.headers['x-razorpay-signature'])

    if(digest === req.headers['x-razorpay-signature']){
        console.log('request is true');
        require('fs').writeFileSync('payment.json', JSON.stringify(req.body, null, 4))
        res.json({status: 'ok'})
    }
    else{
        console.log('request is fake')
        res.json({status: 'ok'})
    }
    

    
})