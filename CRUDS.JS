

let title = document.getElementById('title');
let price = document.getElementById('price');
let Taxs = document.getElementById('Taxs');
let Ads = document.getElementById('Ads');
let disscount = document.getElementById('disscount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let search = document.getElementById('search');
let mood='create';
let tmp;

//console.log(title,price,Taxs,Ads,disscount,total,count,category,submit,search);

//GET TOTAL
function getTotal(){
    
    
    
    if(price.value!='')
    {
        let sumtotal=(+price.value + +Taxs.value+ +Ads.value)- +disscount.value;
        total.innerHTML=sumtotal;
        total.style.background='green';
        console.log(sumtotal);
    }else
    { 
        total.innerHTML='';
        total.style.background='red';
    }

}
//CREATE PRODUCT

let productData;
if(localStorage.product!=null){
    productData=JSON.parse(localStorage.product);
}else
{
productData=[];
}


submit.onclick =function(){
    
    let newPro={
        title:title.value.toLowerCase(),
        price:price.value,
        Taxs:Taxs.value,
        Ads:Ads.value,
        disscount:disscount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
       }
   if(title.value!=''&&price.value!=''&&category.value!='')
     {
       if(mood==='create'){
            if(count.value>1){

            for(let j=1;j<=count.value;j++){
                productData.push(newPro);
                
                }
            }else{
                productData.push(newPro);
            }
        }else{
           
             productData[tmp]=newPro;
             mood='create';
             count.style.display='block'
             submit.innerHTML='Create';
             
        }

        clearData();
     }
   
       localStorage.setItem('product', JSON.stringify(productData));
       showData();
       getTotal();  
   
}

//CLEAR INPUTS AFTER CREATE
function clearData(){
    title.value='';
    price.value='';
    Taxs.value='';
    Ads.value='';
    disscount.value='';
    total.innerHTML='';
    category.value='';
    count.value='';

    }
//READ

function showData(){
    let table='';
    for(i=0;i< productData.length;i++)
    {
    table +=`
    <tr>
    <td>${i+1}</td>
    <td>${productData[i].title}</td>
    <td>${productData[i].price}</td>
    <td>${productData[i].Taxs}</td>
    <td>${productData[i].Ads}</td>
    <td>${productData[i].disscount}</td>
    <td>${productData[i].total}</td>
    <td>${productData[i].category}</td>
    <td><button onclick="showdataforupdate(${i})"id="update">update</button></td>
    <td><button onclick="deleteData(${i})"id="delete">delete</button></td>
    </tr>`
    
    }   
    /**/
    document.getElementById('tbody').innerHTML = table;
   let btndeleteALL=document.getElementById('deleteEVERYTHING');
    if(productData.length>0)
    {
        btndeleteALL.innerHTML=`<button onclick="deleteALL()">Delete ALL (${productData.length})</button>`
    }else {
        btndeleteALL.innerHTML=``
    }
}


//delete
function deleteData(i){
    productData.splice(i, 1);
    //console.log(i);
    localStorage.product= JSON.stringify(productData);
    showData();
}
showData();

//deleteALL

   


function deleteALL(){
    localStorage.clear();
    productData.splice(0);//لمسح كل العناصر في المصفوفه بدايه من اندكس 0 
    showData();
}

//UPDATE
function showdataforupdate(i){
    title.value=productData[i].title;
    price.value=productData[i].price;
    Taxs.value=productData[i].Taxs;
    Ads.value=productData[i].Ads;
    disscount.value=productData[i].disscount;
    getTotal();
    category.value=productData[i].category;
    count.style.display='none'
    submit.innerHTML='Update';
    mood='update'
    tmp=i;
    window.scroll({
        top: 0,
        behavior: 'smooth'
      });
   
}
//search

let searchMOOD='title';
function getSearchMood(id)
{
    if(id==='searchTitle')
    {   
        search.placeholder='Search By Title';
        searchMOOD='title';
    }else {
        search.placeholder='Search By Category';
        searchMOOD='category'
    }
search.focus();
search.value='';
showData();
}

function searchData(value)
{
    let table='';
    if(searchMOOD=='title')
    {
       
        for(let i=0;i<productData.length;i++){
           if(productData[i].title.toLowerCase().includes(value)) 
           {
            table +=`
            <tr>
            <td>${i}</td>
            <td>${productData[i].title}</td>
            <td>${productData[i].price}</td>
            <td>${productData[i].Taxs}</td>
            <td>${productData[i].Ads}</td>
            <td>${productData[i].disscount}</td>
            <td>${productData[i].total}</td>
            <td>${productData[i].category}</td>
            <td><button onclick="showdataforupdate(${i})"id="update">update</button></td>
            <td><button onclick="deleteData(${i})"id="delete">delete</button></td>
            </tr>`
           }
          
        }


    }else {
        for(let i=0;i<productData.length;i++){
            if(productData[i].category.toLowerCase().includes(value)) 
            {
             table +=`
             <tr>
             <td>${i}</td>
             <td>${productData[i].title}</td>
             <td>${productData[i].price}</td>
             <td>${productData[i].Taxs}</td>
             <td>${productData[i].Ads}</td>
             <td>${productData[i].disscount}</td>
             <td>${productData[i].total}</td>
             <td>${productData[i].category}</td>
             <td><button onclick="showdataforupdate(${i})"id="update">update</button></td>
             <td><button onclick="deleteData(${i})"id="delete">delete</button></td>
             </tr>`
            }
       
    }
    
}
document.getElementById('tbody').innerHTML = table;
}
//SAVE LOCALSTORAGE


//count


//clean data

