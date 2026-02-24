let interviewList = [];
let rejectList = [];
let currentStatus = 'all'


let total = document.getElementById('total');
let interviewCount = document.getElementById("interviewCount");
let rejectCount = document.getElementById("rejectCount");

//get all button
const allFilterBtn = document.getElementById('all-filter-btn')
const interviewFilterBtn = document.getElementById('interview-filter-btn')
const rejectFilterBtn = document.getElementById('reject-filter-btn')


const allCardSection = document.getElementById('allCards');
const mainContainer2 = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');



function calculateCount() {
    total.innerText = allCardSection.children.length
    interviewCount.innerText = interviewList.length
    rejectCount.innerText = rejectList.length

}
calculateCount()


function toggleStyle(id) {

    allFilterBtn.classList.remove('bg-blue-500', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
    rejectFilterBtn.classList.remove('bg-blue-500', 'text-white')

    allFilterBtn.classList.add('bg-white', 'text-slate-500')
    interviewFilterBtn.classList.add('bg-white', 'text-slate-500')
    rejectFilterBtn.classList.add('bg-white', 'text-slate-500')



    const selected = document.getElementById(id)
    currentStatus = id
    console.log(selected)

    selected.classList.remove('bg-white', 'text-slate-500')
    selected.classList.add('bg-blue-500', 'text-white')

    if (id == 'all-filter-btn') {
        allCardSection.classList.remove('hidden')
        filterSection.classList.add('hidden')

    }
    else if (id == 'interview-filter-btn') {
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderInterview()
    }
    else if (id == 'reject-filter-btn') {
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
        renderReject()
    
    }
}


//  CLICK EVENT 
mainContainer2.addEventListener('click', function(event){

   if(event.target.classList.contains('interview')){

      const parenNode = event.target.parentNode.parentNode

      const companyName = parenNode.querySelector('.companyName').textContent
      const jobName = parenNode.querySelector('.jobName').textContent
      const jobCriteria = parenNode.querySelector('.jobCriteria').textContent
      const notes = parenNode.querySelector('.notes').textContent

      parenNode.querySelector('.statusBadge').innerText = 'Interview'

      const cardInfo = {
         companyName,
         jobName,
         jobCriteria,
         statusBadge: 'Interview',
         notes
      }
     const remainingCards = rejectList.filter(item =>item.companyName != companyName.trim())
     rejectList = remainingCards
      const companyExist = interviewList.find(items =>
         items.companyName == cardInfo.companyName
      )

      if(!companyExist){
         interviewList.push(cardInfo)
      }

      calculateCount()
      renderInterview()
   }


   else if(event.target.classList.contains('reject')){

      const parenNode = event.target.parentNode.parentNode

      const companyName = parenNode.querySelector('.companyName').textContent
      const jobName = parenNode.querySelector('.jobName').textContent
      const jobCriteria = parenNode.querySelector('.jobCriteria').textContent
      const notes = parenNode.querySelector('.notes').textContent

      parenNode.querySelector('.statusBadge').innerText = 'Rejected'

      const cardInfo = {
         companyName,
         jobName,
         jobCriteria,
         statusBadge: 'Rejected',
         notes
      }
     // console.log(interviewList, cardInfo.companyName.trim())
      const remainingCards = interviewList.filter(item =>item.companyName != companyName.trim())
      console.log(remainingCards)
     interviewList = remainingCards
      const companyExist = rejectList.find(items =>
         items.companyName == cardInfo.companyName
      )

      if(!companyExist){
         rejectList.push(cardInfo)
      }

      if(currentStatus == "rejectFilterBtn"){
         renderReject()
      }

      calculateCount()
      renderReject()
    
   }

})

function renderInterview() {
    filterSection.innerHTML = ''

    // if interview is empty , then show no job message
    if (interviewList.length === 0) {
        document.getElementById('no-jobs').classList.remove('hidden');
        return;
    } else {
        document.getElementById('no-jobs').classList.add('hidden');
    }

    for (let interview of interviewList) {
        //console.log(interview);

        let div = document.createElement('div')
        div.className = 'jobCard bg-white p-6 md:flex justify-between items-start rounded-xl shadow border border-gray-200'
        div.innerHTML = `
         <div class="left flex-1 space-y-3">
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
function renderReject() {
    filterSection.innerHTML = ''
    // if reject is empty  then show no job message
    if (rejectList.length === 0) {
        document.getElementById('no-jobs').classList.remove('hidden');
        return;
    } else {
        document.getElementById('no-jobs').classList.add('hidden');
    }


    for (let reject of rejectList) {
       // console.log(reject);

        let div = document.createElement('div')
        div.className = 'jobCard bg-white p-6 md:flex justify-between items-start rounded-md shadow border border-gray-200'
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

