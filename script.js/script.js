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

   // adding white bg for all button
    allFilterBtn.classList.add('bg-white', 'text-slate-500')
    interviewFilterBtn.classList.add('bg-white', 'text-slate-500')
    rejectFilterBtn.classList.add('bg-white', 'text-slate-500')

    // if any button has blue then remove
    allFilterBtn.classList.remove('bg-blue-500', 'text-white')
    interviewFilterBtn.classList.remove('bg-blue-500', 'text-white')
    rejectFilterBtn.classList.remove('bg-blue-500', 'text-white')

    const selected = document.getElementById(id)
   // console.log(selected);
   
   //adding bg-blue-500 for current button
    selected.classList.remove('bg-white','text-slate-500')
    selected.classList.add('bg-blue-500','text-white')
    if (id == 'interview-filter-btn'){
        allCardSection.classList.add('hidden')
        filterSection.classList.remove('hidden')
    }else if(id == 'all-filter-btn'){
         allCardSection.classList.remove('hidden')
         filterSection.classList.add('hidden')
    }
       
    


}
