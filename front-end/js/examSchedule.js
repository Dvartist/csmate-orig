window.onload = () => {
    displayWeek1Details();
}

async function displayWeek1Details(){

    const weekDetails = await getWeekDetails(1);
    setWeekDetails(weekDetails);

}

async function displayWeek2Details(){

    const weekDetails = await getWeekDetails(2);
    setWeekDetails(weekDetails);

}

function setButtonClicked(buttonCode){

    $(document).ready(
        () => {
            if(buttonCode == 1){
                $('#wk1Btn').attr('class', 'btn mx-3  btn-primary');
                $('#wk2Btn').attr('class', 'btn mx-3');

            }else if(buttonCode == 2){
                $('#wk1Btn').attr('class', 'btn mx-3') ; 
                $('#wk2Btn').attr('class', 'btn mx-3  btn-primary');
            }
        }
    )
}

async function getWeekDetails(weekNumber){

    const uri = `/getExamDetails?week=${weekNumber}`;

    const weekRequest = new Request(uri, {
        method: 'GET' 
    });

    const weekDetails = await fetch(weekRequest)
        .then(
            (response) => {
                setButtonClicked(weekNumber);
                return response.json();
            }
        ).then(
            (data) => {
                return data;
            }
        ).catch(
            (err) => {
                console.log(err);
            }
        );
    
    return weekDetails;

}

function setWeekDetails(weekDetails){
    $(
        () => {

            let inputIndex = 0;

            for(i = 0; i < 4; i++){

                let day = weekDetails.days[i];
                let course = day.course.courseCode + " " + day.course.courseName;
                let venue = day.venue;
                let time = day.duration;

                $(`input:eq(${inputIndex})`).val(course);
                inputIndex++;
                
                $(`input:eq(${inputIndex})`).val(time);
                inputIndex++;

                $(`input:eq(${inputIndex})`).val(venue);
                inputIndex++;
            
            }
        
        }
    )

}
