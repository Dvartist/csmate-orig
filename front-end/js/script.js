window.onload = async () => {

    setupFirebase();

    const currentClassDetails = JSON.parse(await getClassDetails('/getLecture?time=now'));
    const nextClassDetails = JSON.parse(await getClassDetails('/getLecture?time=next'));


    if(currentClassDetails != 'null'){
        setCurrentClassData(currentClassDetails);
    }

    if(nextClassDetails != 'null'){
        setNextClassData(nextClassDetails);
    }   
};

async function getClassDetails(uri){

    let sendMessageRequest = new Request(uri, {
        method: 'POST',
        body: {
            date: new Date()
        }
    });
    
    let data = await fetch(sendMessageRequest)
        .then(
            (response) => {
                return response.json();
            }
        ).then(
            (jsonData) => {
                return jsonData;
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

    return data;
}

function setCurrentClassData(details){

    let {courseName} = details.course;
    let {courseCode} = details.course;
    let {lecturerName} = details.course;
    let {lectureRoom} = details;
    let {startTime} = details;
    let {endTime} = details;

    // eslint-disable-next-line no-undef
    $(document).ready(
        () => {
            $('input[name=\'courseName\']').val(courseName);
            $('input[name=\'courseCode\']').val(courseCode);
            $('input[name=\'lecturerName\']').val(lecturerName);
            $('input[name=\'lectureRoom\']').val(lectureRoom);
            $('input[name=\'startTime\']').val(startTime);
            $('input[name=\'endTime\']').val(endTime);
        }
    )

}

function setNextClassData(details){

    let {courseName} = details.course;
    let {courseCode} = details.course;
    let {lecturerName} = details.course;
    let {lectureRoom} = details;
    let {startTime} = details;
    let {endTime} = details;

    $(document).ready(
        () => {
            $('input[name=\'nextCourseName\']').val(courseName);
            $('input[name=\'nextCourseCode\']').val(courseCode);
            $('input[name=\'nextLecturerName\']').val(lecturerName);
            $('input[name=\'nextLectureRoom\']').val(lectureRoom);
            $('input[name=\'nextStartTime\']').val(startTime);
            $('input[name=\'nextEndTime\']').val(endTime);
        }
    )

}

async function setupFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyB2v8-eybZT8l8CK65Ki1YbGYFoNpR3YgM",
        authDomain: "notification-app-a3790.firebaseapp.com",
        projectId: "notification-app-a3790",
        storageBucket: "notification-app-a3790.appspot.com",
        messagingSenderId: "728129011067",
        appId: "1:728129011067:web:68a1f7df273167213751de",
        measurementId: "G-VV3QSXGJCZ"
    };

    await firebase.initializeApp(firebaseConfig);
    await firebase.analytics();

    setupFirebaseMessaging();
}

async function setupFirebaseMessaging(){

    const fbMessaging = firebase.messaging();
    await fbMessaging.requestPermission();

    // get token from messaging which you only get after getting permission.

    const swRegistration = await getSwRegistration();
    await fbMessaging.useServiceWorker(swRegistration);

    const userToken = await fbMessaging.getToken()
        .then(
            (token) => {
                return token;
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );

    saveUserTokenToDb(userToken);

    fbMessaging.onMessage(
        (payload) => {
            console.log("Payload recieved", payload);
        }
    )
}

async function getSwRegistration(){

    let swRegistration;
    let scope = '/js/';
    let swPath = '/js/sw.js';

    if('serviceWorker' in navigator){
        await navigator.serviceWorker.getRegistration(scope)
            .then(
                (registration) => {
                    if(registration){
                        swRegistration = registration;
                    }else{
                        swRegistration = setServiceWorker(swPath, scope);
                    }
                }
            ).catch(
                (err) => {
                    console.log(err);
                }
            );
    }
    return swRegistration;
}

async function setServiceWorker(swPath, scope){

    let swRegistration;

    let swConfig = {
        scope : scope
    };

    await navigator.serviceWorker.register(swPath, swConfig)
        .then(
            (registration) => {
                swRegistration = registration;
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    
    return swRegistration;
}

async function saveUserTokenToDb(token){

    let uri = '/saveUserToDb';

    let payload = {
        token: token
    };

    let request = new Request(uri, {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });

    await fetch(request);

}





/*
function notify_me(){ // eslint-disable-line
    if('Notification' in window){
        alert('Notification Supported');

        let permission = Notification.requestPermission();
        permission.then(
            (response) => {
                if(response == 'granted'){
                    console.log('Permission Granted');
                    registerServiceWorker('/front-end/js/sw.js').catch(err => console.log(err));
                }
            }
        ); 
    }else {
        alert('Notification Not Supported, Please Update Your Browser');
    }

    let registerServiceWorker = function
    (swPath) {
        if('serviceWorker' in navigator){
            alert('Service Workers Supported');
            return navigator.serviceWorker.register(swPath).then(
                console.log('Registered Service Worker')
            );
        }else {
            alert('Service Workers Not Supported, Please Update Your Browser');
        }
    };
}*/