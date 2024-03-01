
const quoteGenerator=document.getElementById('quote-generator');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');
let apiQuotes=[];

//Show loading
function loading(){
    loader.hidden=false;
    quoteGenerator.hidden=true;
}
//Hide Loading
function complete(){
    quoteGenerator.hidden=false;
    loader.hidden=true;
}

//Show new quote
function newQuote(){
    
    const quote=apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
    //to check if author field is blank and replace it with unknown
    if(!quote.author){
        authorText.textContent='Unknown';
    } else{
        authorText.textContent=quote.author;
    }

    //check code length to determine the styling
    if(quote.text.length>120){
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    
     quoteText.textContent=quote.text;
     
}
//Get Quotes from API
async function getQuotes(){
    const apiUrl= 'https://type.fit/api/quotes';
    try{
const response=await fetch(apiUrl);
apiQuotes=await response.json();
newQuote();
    }catch(error) {
        //Catch the error here
    }
}

//tweet quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();
