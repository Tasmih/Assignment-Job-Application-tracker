let interviewList = [];
let rejectList = [];
let currentStatus = 'all'

let total = document.getElementById('total');
let interviewCount = document.getElementById("interview");
let rejectCount = document.getElementById("reject");



// get all button
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectFilterBtn = document.getElementById('reject-filter-btn');

const allCardSection = document.getElementById('allCards');
const mainContainer2 = document.getElementsByClassName('main-section')[0];
const filterSection = document.getElementById('filtered-section');


//  COUNT 
function calculateCount(){
   total.innerText = allCardSection.children.length
   interviewCount.innerText = interviewList.length
   rejectCount.innerText = rejectList.length
}

calculateCount()
// No job function
function checkNoJobs(tabList){
    const noJobsSection = document.getElementById('no-jobs');
    if(tabList.length === 0){
        noJobsSection.classList.remove('hidden'); // show
    } else {
        noJobsSection.classList.add('hidden'); // hide
    }
}


//  FILTER BUTTON STYLE 
function toggleStyle(id){

   // remove active style
   allFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white')
   interviewFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white')
   rejectFilterBtn.classList.remove('bg-[#3b82f6]', 'text-white')

   // add default style
   allFilterBtn.classList.add('bg-white', 'text-black')
   interviewFilterBtn.classList.add('bg-white', 'text-black')
   rejectFilterBtn.classList.add('bg-white', 'text-black')

   const selected = document.getElementById(id)
   currentStatus = id
   console.log(selected)


   selected.classList.remove('bg-white','text-black')
   selected.classList.add('bg-[#3b82f6]', 'text-white')

   if(id == 'all-filter-btn'){
      allCardSection.classList.remove('hidden')
      filterSection.classList.add('hidden')
   }

   else if(id == 'interview-filter-btn'){
      allCardSection.classList.add('hidden')
      filterSection.classList.remove('hidden')
      renderInterview()
   }

   else if(id == 'reject-filter-btn'){
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

      //if(currentStatus == "rejectFilterBtn"){
       //  renderReject()
     // }

      calculateCount()
      renderReject()
   }

})


//  RENDER INTERVIEW 
function renderInterview(){

   filterSection.innerHTML = ''
   
   checkNoJobs(interviewList);
   for(let interview of interviewList){
      

      let div = document.createElement('div');
      div.className = 'jobCard  bg-white p-6 md:flex rounded-md '

      div.innerHTML = `
         <div class="left space-y-2">

            <div>
               <p class="companyName text-blue-950 font-bold">
                  ${interview.companyName}
               </p>
               <p class="jobName text-slate-500">
                  ${interview.jobName}
               </p>
            </div>

            <div>
               <p class="jobCriteria text-slate-500">
                  ${interview.jobCriteria}
               </p>
            </div>

            <button class="statusBadge bg-blue-50 py-2 px-3 rounded-md">
               ${interview.statusBadge}
            </button>

            <p class="notes text-slate-700">
               ${interview.notes}
            </p>

            <div class="flex gap-2">
               <button class="interview bg-white py-3 px-6 text-green-500 rounded-md border border-green-600">
                  Interview
               </button>
               <button class="reject bg-white py-3 px-6 text-red-500 rounded-md border border-red-600">
                  Rejected
               </button>
            </div>

         </div>
      `

      filterSection.appendChild(div)
   }
}


//  RENDER REJECT 
function renderReject(){
   filterSection.innerHTML = ''
   checkNoJobs(rejectList);

   for(let reject of rejectList){
      let div = document.createElement('div');
      div.className = 'jobCard bg-white p-6 md:flex rounded-md ';

      div.innerHTML = `
         <div class="left space-y-2">

            <div>
               <p class="companyName text-blue-950 font-bold">${reject.companyName}</p>
               <p class="jobName text-slate-500">${reject.jobName}</p>
            </div>

            <div>
               <p class="jobCriteria text-slate-500">${reject.jobCriteria}</p>
            </div>

            <button class="statusBadge bg-white py-2 px-3 rounded-md">${reject.statusBadge}</button>

            <p class="notes text-slate-500">${reject.notes}</p>

            <div class="flex gap-2">
               <button class="interview bg-white py-3 px-6 text-green-500 rounded-md border border-green-600">Interview</button>
               <button class="reject bg-white py-3 px-6 text-red-500 rounded-md border border-red-600">Rejected</button>
            </div>

         </div>
      `;

      filterSection.appendChild(div);
   }
}

// delete button
document.addEventListener("click", function(event){

   console.log("Clicked:", event.target);

   const deleteBtn = event.target.closest(".delete-btn");

   if(deleteBtn){
      console.log("Delete button detected");

      const card = deleteBtn.closest(".jobCard");
    const companyName = card.querySelector(".companyName").textContent.trim();

    
    interviewList = interviewList.filter(j => j.companyName !== companyName);
    rejectList = rejectList.filter(j => j.companyName !== companyName);

    card.remove(); 
    calculateCount();
   

  
    if(currentStatus === 'interview-filter-btn') renderInterview();
    else if(currentStatus === 'reject-filter-btn') renderReject();
}

});