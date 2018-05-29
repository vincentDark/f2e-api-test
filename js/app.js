console.log('this = ' + this);

const API = 'https://www.thef2e.com/api/'

let getMemberInfo = (email) => {
    fetch(API + 'isSignUp', {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
        // credentials: 'include',
    }).then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
    }).then((item) => {
        console.log('item :');
        console.log(item);
        if (item.success) {
            let date = new Date(item.timeStamp)
            let year = date.getFullYear()
            document.querySelector('main .result').innerHTML = 
            `
                ${item.nickName} ${item.skill} 報名成功 
                <br>
                報名時間：
                ${date.getFullYear()} 年
                ${date.getMonth()} 月
                ${date.getDay()} 日
                <br>
                ${date.toTimeString()}

            `
        }else{
            document.querySelector('main .result').innerHTML = item.message
            msgAlert(item.message)
        }
    }).catch((error) => {
        console.log('error :');
        console.log(error);
    })
}

window.onload = () => {
    // 初始抓資料
    fetch(API + 'signUpTotal', {
        method: 'get',
        // credentials: 'include',
    }).then((response) => {
        if (!response.ok) throw new Error(response.statusText)
        return response.json()
    }).then((item) => {
        if (item.success) {
            document.querySelector('main h1').innerHTML = `目前已經報名人數：${item.total}人`
        }

    }).catch((error) => {
        console.log('error :');
        console.log(error);
    })

    document.querySelector('main button').onclick = function () {
        let email = document.querySelector('main input').value;
        if (email.trim()) {
            getMemberInfo(email.trim())
        }else{
            msgAlert('請填寫email')
        }
    }

}

let checktimeout;
function msgAlert(alertValue,confirmBtn = '確認',cb = ()=>{}) {
    let closedDoing = () => {
        closeAlert();
        cb();
    }
    
    msgFrame = document.createElement('div')
    msgFrame.id = 'module-massage';
    msgFrame.onclick = function(e) {
        if (e.target === msgFrame) {
            closedDoing();
        }
    }

    let contain = document.createElement('div')
    contain.className = 'msg-contain'

    let massage = document.createElement('p')
    massage.innerHTML = alertValue

    let confirm = document.createElement('span')
    confirm.innerHTML = confirmBtn
    confirm.className = 'confirm'
    confirm.onclick = function() {
        closedDoing();
    }

    contain.appendChild(massage)
    contain.appendChild(confirm)

    msgFrame.appendChild(contain)
    document.body.appendChild(msgFrame)
}

function closeAlert() {
    let msgFrame = document.getElementById('module-massage')
    if (msgFrame) {
        document.body.removeChild(msgFrame)
    }
}