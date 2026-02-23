let interviewList = [];
let rejectList = [];

let total = document.getElementById('total');
let interviewCount = document.getElementById("interviewCount");
let rejectCount = document.getElementById("rejectCount");

const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectFilterBtn = document.getElementById('reject-filter-btn')


const allCardSection = document.getElementById('allCards');
// interviewList.push() // interview or reject button a click korle dashboard a count barbe
const mainContainer = document.querySelector('main')
const filterSection = document.getElementById('filtered-section')



function calculateCount(){
    total.innerText = allCardSection.children.length // we will get 8 as we have 8 cards
    interviewCount.innerText = interviewList.length
    rejectCount.innerText = rejectList.length

}
calculateCount()


function toggleStyle(id){

    allFilterBtn.classList.add('bg-white', 'text-slate-500')
    interviewFilterBtn.classList.add('bg-white', 'text-slate-500')
    rejectFilterBtn.classList.add('bg-white', 'text-slate-500')

    allFilterBtn.classList.remove('bg-blue-500', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
    rejectFilterBtn.classList.remove('bg-blue-500', 'text-white')

    const selected = document.getElementById(id)

    selected.classList.remove('bg-white','text-slate-500')
    selected.classList.add('bg-blue-500','text-white')

    if (id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderInterview()
    }
    else if(id == 'reject-filter-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderReject()
    }
    else if(id == 'all-filter-btn'){
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')
    }
}

mainContainer.addEventListener('click',function(event){

 if(event.target.classList.contains('interview')){
 const parenNode = event.target.parentNode.parentNode;
  console.log(parenNode);
  const companyName = parenNode.querySelector('.companyName').innerText;
  const jobName = parenNode.querySelector('.jobName').innerText;
  const jobCriteria = parenNode.querySelector('.jobCriteria').innerText;
  const statusBadge = parenNode.querySelector('.statusBadge').innerText;
  const notes = parenNode.querySelector('.notes').innerText;
   parenNode.querySelector('.statusBadge').innerText = 'Interview'


  const cardInfo ={
    companyName,
    jobName,
    jobCriteria,
    statusBadge:'Interview',
    notes ,
  }
  
  const companyNameExist =interviewList.find(item=> item.companyName == cardInfo.companyName)

 
  if (!companyNameExist){
  interviewList.push(cardInfo)
  }

  rejectList = rejectList.filter(item => item.companyName != cardInfo.companyName)
  calculateCount()

  renderInterview ()   
    } else if(event.target.classList.contains('reject')){
  const parenNode = event.target.parentNode.parentNode;

  const companyName = parenNode.querySelector('.companyName').innerText;
  const jobName = parenNode.querySelector('.jobName').innerText;
  const jobCriteria = parenNode.querySelector('.jobCriteria').innerText;
  const statusBadge = parenNode.querySelector('.statusBadge').innerText;
  const notes = parenNode.querySelector('.notes').innerText;

  parenNode.querySelector('.statusBadge').innerText = 'Rejected'

  const cardInfo ={
    companyName,
    jobName,
    jobCriteria,
    statusBadge:'Rejected',
    notes ,
  }

  const companyNameExist = rejectList.find(item => item.companyName == cardInfo.companyName )

  if (!companyNameExist){
    rejectList.push(cardInfo)
  }
interviewList = interviewList.filter(item => item.companyName != cardInfo.companyName)



  calculateCount()
  renderReject()   
 }

})




function renderInterview (){
    filterSection.innerHTML = ''


    for(let interview of interviewList){
        console.log(interview);
    
        let div = document.createElement('div')
        div.className = 'jobCard bg-white p-6 flex justify-between items-start rounded-xl shadow border border-gray-200' 
        div.innerHTML = `
         <div class="flex-1 space-y-3">
            <div>
              <p class="companyName text-blue-950 font-bold">${interview.companyName}</p>
              <p class="jobName text-slate-500">${interview.jobName}</p>
            </div>

        <p class="jobCriteria text-slate-500">${interview.jobCriteria}</p>

        <button class="statusBadge bg-blue-50 py-3 px-4 text-blue-950 rounded-md inline-block">
            ${interview.statusBadge}
        </button>

        <p class="notes text-slate-500">
        ${interview.notes}

        </p>

        <div class="flex gap-3 mt-4">
            <button class="interview bg-white py-3 px-6 text-emerald-500 rounded-md border border-green-600">
                Interview
            </button>

            <button class="reject bg-white py-3 px-6 text-red-500 rounded-md border border-red-600">
                Rejected
            </button>
            </div>
        `
        filterSection.appendChild(div)
    }
}
function renderReject (){
    filterSection.innerHTML = ''


    for(let reject of rejectList){
        console.log(reject);
    
        let div = document.createElement('div')
        div.className = 'jobCard bg-white p-6 flex justify-between items-start rounded-xl shadow border border-gray-200' 
        div.innerHTML = `
         <div class="flex-1 space-y-3">
            <div>
              <p class="companyName text-blue-950 font-bold">${reject.companyName}</p>
              <p class="jobName text-slate-500">${reject.jobName}</p>
            </div>

        <p class="jobCriteria text-slate-500">${reject.jobCriteria}</p>

        <button class="statusBadge bg-blue-50 py-3 px-4 text-blue-950 rounded-md inline-block">
            ${reject.statusBadge}
        </button>

        <p class="notes text-slate-500">
        ${reject.notes}

        </p>

        <div class="flex gap-3 mt-4">
            <button class="interview bg-white py-3 px-6 text-emerald-500 rounded-md border border-green-600">
                Interview
            </button>

            <button class="reject bg-white py-3 px-6 text-red-500 rounded-md border border-red-600">
                Rejected
            </button>
            </div>
        `
        filterSection.appendChild(div)
    }
}