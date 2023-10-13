
import axios from "axios"
const TIMEOUT = 1000 * 60 * 60

async function callApi() {
    try {
        const exChangeRateAPI = 'https://openexchangerates.org/api/latest.json'//change
        const appId = '3c40e2668a0b4f9fbedc1a2760768938';
        var query_vars = {
            app_id: appId,
        }

        const exChangeRate = await axios.get(exChangeRateAPI, {
            params: query_vars
        })
        const apiUrl = "https://u9fe8uyzkk.execute-api.us-east-1.amazonaws.com/simple/lastest"
        const param = {
            "id": "lastest",
            "rates": {
                ...exChangeRate.data.rates,
                'timeUpDate': Date.now()
            }
        }
        await axios.post(apiUrl, param)
    } catch (error) {
        console.error('API Call Failed:', error);
    }
}

function scheduleApiCall() {
    // Gọi API ngay lúc bắt đầu
    callApi();
    // Lập lịch gọi lại mỗi 1 phút
    setInterval(() => {
        callApi();
    }, TIMEOUT);  // 1 phút = 60,000 milliseconds
}

scheduleApiCall();