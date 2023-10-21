export function getDaySuffix (day) {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    switch (day % 10) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
}

export function getWeeksOfMonth (year, month) {
    const weeks = [];
    const date = new Date(year, month, 1);
    
    // Find the first Sunday of the month
    while (date.getDay() !== 0) {
        date.setDate(date.getDate() + 1);
    }

    // Iterate through the weeks of the month
    while (date.getMonth() === month) {
        const sunday = new Date(date);
        const saturday = new Date(date);
        saturday.setDate(date.getDate() + 6);
        weeks.push({
            sunday: `${(new Date(year,sunday.getMonth(),1)).toLocaleString('default', {month:'long'}).slice(0,3)},${sunday.getDate()}${getDaySuffix(sunday.getDate())}`,
            saturday: `${(new Date(year,saturday.getMonth(),1)).toLocaleString('default', {month:'long'}).slice(0,3)},${saturday.getDate()}${getDaySuffix(saturday.getDate())}`,
            epoch: sunday
        });
        date.setDate(date.getDate() + 7);
    }
    
    return weeks;
};

export function getDatesOfWeek(epoch){
    let dates = []
    let date = new Date(epoch)
    for(let i=0;i<7;i++){
        dates.push(`${date.getFullYear()}-${(new Date(date.getFullYear(),date.getMonth(),1)).toLocaleString('default', {month:'long'})}-${date.getDate()}`)
        date.setDate(date.getDate()+1)
    }
    return dates
}

export default function Calender({date}) {
    let [calender, setCalender] = date

    let firstDay = (new Date(calender[0], calender[1])).getDay();//index of first day of month, sunday at index 0
    let daysInMonth = 32 - new Date(calender[0],calender[1],32).getDate();//jan at index 0

    let selectDate = (e)=>{
        e.preventDefault()
        calender[2] = e.target.value;
        setCalender([calender[0],calender[1],calender[2]]);
    }
    let changeMonth = (e,operand)=>{
        e.preventDefault();
        calender[1]+=operand;
        if(calender[1]==-1){
            calender[0]-=1;
            calender[1]=11;
        }
        if(calender[1]==12){
            calender[0]+=1;
            calender[1]=0;
        }
        setCalender([calender[0],calender[1],calender[2]]);
    }

    return (
      <>
      <div class="flex items-center justify-center py-8 w-full lg:w-2/3 mx-auto">
        <div class="w-full shadow-lg">
            <div class="md:p-8 p-5 bg-gray-800 rounded-t">
                <div class="px-4 flex items-center justify-between">
                    <span  tabindex="0" class="focus:outline-none  text-base font-bold text-gray-100 ">{(new Date(calender[0],calender[1],1)).toLocaleString('default', {month:'long'})} {calender[0]}</span>
                    <div class="flex items-center">
                    <button onClick={e=>changeMonth(e,-1)} aria-label="calendar backward" class="focus:text-gray-400 hover:text-gray-400  text-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="15 6 9 12 15 18" />
                        </svg>
                    </button>
                    <button onClick={e=>changeMonth(e,1)} aria-label="calendar forward" class="focus:text-gray-400 hover:text-gray-400 ml-3  text-gray-100"> 
                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler  icon-tabler-chevron-right" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <polyline points="9 6 15 12 9 18" />
                        </svg>
                    </button>
  
                    </div>
                </div>
                <div class="flex items-center justify-between pt-12 overflow-x-auto">
                    <table class="w-full">
                        <thead>
                            <tr>
                                {
                                    ['Su','Mo','Tu','We','Th','Fr','Sa'].map((day,dayIndex)=>{
                                        return (
                                            <th>
                                                <div class="w-full flex justify-center">
                                                    <p class="text-base font-medium text-center text-gray-100">{day}</p>
                                                </div>
                                            </th>
                                        )
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                           {
                                 [...Array(Math.ceil((firstDay+daysInMonth)/7))].map((week,weekIndex)=>{
                                    return (
                                        <tr key={weekIndex}>
                                            {
                                                [...Array(7)].map((day,dayIndex)=>{
                                                    let dayNumber = (weekIndex*7)+dayIndex-firstDay+1;
                                                    return (
                                                        <td key={dayIndex}>
                                                            <div class="w-full flex justify-center">
                                                                <button onClick={e=>selectDate(e)} value={dayNumber} class={`focus:outline-none rounded-full w-8 h-8 flex items-center justify-center ${dayNumber==calender[2]?"bg-blue-800 text-white":"text-gray-100"}`}>
                                                                    {dayNumber>0&&dayNumber<=daysInMonth?dayNumber:""}
                                                                </button>
                                                            </div>
                                                        </td>
                                                    )
                                                })
                                            }
                                        </tr>
                                    )
                                })
                           }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
      </>
    )
}